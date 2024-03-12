import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loadingOrganisation } from "../../redux/actions";
import { ActivityFeedState } from "../../redux/state";
import { Activity } from "../../services/domain/Activity";
import { Organisation } from "../../services/domain/Organisation";
import { ActivityFeed } from "../common/ActivityFeed/ActivityFeed";
import { ActivityFeedItemDefinition } from "../common/ActivityFeed/ActivityFeedItem";
import { AcceptedDialog } from "./dialogs/AcceptedDialog";
import { ApprovalDialog } from "./dialogs/ApprovalDialog";
import { ProposedDialog } from "./dialogs/ProposedDialog";
import { RejectedDialog } from "./dialogs/RejectedDialog";
import { UpdatedDialog } from "./dialogs/UpdatedDialog";
import { fieldLabels } from "./fieldLabels";

type OrganisationsActivityFeedProps = {
  activities: ActivityFeedState | null | undefined;
  organisation: Organisation | null;
  isAdmin: boolean;
};

export type FieldChange = {
  field: keyof typeof fieldLabels;
  oldValue: string | null;
  newValue: string | null;
};

export type ActivityBody = {
  changes: FieldChange[];
};

export const OrganisationsActivityFeed: React.FC<OrganisationsActivityFeedProps> = ({
  activities,
  organisation,
  isAdmin,
}) => {
  const dispatch = useDispatch();

  const [focussedEntity, setFocussedEntity] = useState<
    Activity | Organisation | null
  >(null);

  const orgUpdate: ActivityFeedItemDefinition<ActivityBody> = {
    activityType: 2,
    renderBody: (body) => (
      <>
        <b>Updated:</b>{" "}
        {body.changes.map((item) => `"${fieldLabels[item.field]}"`).join(",")}
      </>
    ),
    options: [
      {
        label: "Show Changes",
        onClick: (activity) => setFocussedEntity(activity),
      },
    ],
  };

  const orgPendingUpdate: ActivityFeedItemDefinition<ActivityBody> = {
    activityType: 3,
    renderBody: (body) => (
      <>
        <b>Proposed Changes:</b>{" "}
        {body.changes.map((item) => `"${fieldLabels[item.field]}"`).join(",")}
      </>
    ),
    options: [
      {
        label: "Show Changes",
        onClick: (activity) => setFocussedEntity(activity),
      },
    ],
  };

  const orgUpdateApproval: ActivityFeedItemDefinition<ActivityBody> = {
    activityType: 4,
    renderBody: (body) => (
      <>
        <b>Approved Changes:</b>{" "}
        {body.changes.map((item) => `"${fieldLabels[item.field]}"`).join(",")}
      </>
    ),
    options: [
      {
        label: "Show Changes",
        onClick: (activity) => setFocussedEntity(activity),
      },
    ],
  };

  const orgUpdateRejection: ActivityFeedItemDefinition<ActivityBody> = {
    activityType: 5,
    renderBody: (body) => (
      <>
        <b>Rejected Changes:</b>{" "}
        {body.changes.map((item) => `"${fieldLabels[item.field]}"`).join(",")}
      </>
    ),
    options: [
      {
        label: "Show Changes",
        onClick: (activity) => setFocussedEntity(activity),
      },
    ],
  };

  const renderDialog = () => {
    if (!focussedEntity) {
      return;
    }

    const focussedOrganisation = focussedEntity as Organisation;
    const activity = focussedEntity as Activity;
    const isOrganisation =
      focussedOrganisation && focussedOrganisation.itemId !== undefined;

    if (isOrganisation) {
      return (
        <ApprovalDialog
          organisation={organisation!}
          onClose={() => {
            dispatch(loadingOrganisation(organisation!.itemId.toString()));
            setFocussedEntity(null);
          }}
          isAdmin={isAdmin}
        />
      );
    } else {
      switch (activity.activityType) {
        case 2:
          return (
            <UpdatedDialog
              activity={activity}
              onClose={() => setFocussedEntity(null)}
            />
          );
        case 3:
          return (
            <ProposedDialog
              activity={activity}
              onClose={() => setFocussedEntity(null)}
            />
          );
        case 4:
          return (
            <AcceptedDialog
              activity={activity}
              onClose={() => setFocussedEntity(null)}
            />
          );
        case 5:
          return (
            <RejectedDialog
              activity={activity}
              onClose={() => setFocussedEntity(null)}
            />
          );
        default:
          return null;
      }
    }
  };

  return (
    <>
      <ActivityFeed
        activities={activities}
        definitions={[
          orgUpdate,
          orgPendingUpdate,
          orgUpdateApproval,
          orgUpdateRejection,
        ]}
        actions={[
          {
            label: isAdmin
              ? "Review pending changes"
              : "Show changes pending approval",
            disabled: !organisation?.organisationChanges.length,
            dataTest: "review-changes-button",
            action: () => setFocussedEntity(organisation),
          },
        ]}
      />
      {renderDialog()}
    </>
  );
};
