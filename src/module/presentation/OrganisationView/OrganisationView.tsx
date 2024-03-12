import { Grid, makeStyles } from "@material-ui/core";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadingActivities, loadingOrganisation } from "../../redux/actions";
import { activityFeedSelector, orgSelector } from "../../redux/selectors";
import { OrganisationHeader } from "./OrganisationHeader";
import { OrganisationViewDetails } from "./OrganisationViewDetails";
import { Skeleton } from "@material-ui/lab";
import { OrganisationAppBar } from "../OrganisationAppBar";
import { Tabs } from "@ofqual/portal-components/components/Tabs";
import { OrganisationsActivityFeed } from "./OrganisationsActivityFeed";
import { useAuth } from "../../useAuth";
import { UserRole } from "../../services/domain/userRole";

const useStyles = makeStyles((theme) => ({
  rightPanelOuter: {
    position: "relative",
    padding: "0px!important",
  },
  rightPanelInner: {
    right: "12px",
    // border: "1px solid blue",
    height: "calc(100vh - 230px)",
    position: "fixed",
    width: "calc((100vw - 265px) * 0.33)",
  },

  root: {
    marginTop: theme.contentOffsets.AFTER_RECORD_HEADER,
  },
}));

export const OrganisationView: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { itemId } = useParams<{ itemId: string }>();

  useEffect(() => {
    dispatch(loadingOrganisation(itemId));
  }, [dispatch, itemId]);

  const orgState = useSelector(orgSelector);

  const { isInRole } = useAuth();

  const isAoAdminUser = isInRole(
    UserRole.ITAdmin,
    UserRole.AOAdmin,
    UserRole.CCEAQualAdmin,
    UserRole.CCEAAccreditationAdmin
  );

  useEffect(() => {
    if (orgState.org?.id) {
      dispatch(loadingActivities(orgState.org.id));
    }
  }, [dispatch, orgState.org?.id]);

  const activitiesState = useSelector(activityFeedSelector);

  const activities =
    activitiesState && orgState.org && activitiesState[orgState.org.id];

  return (
    <div className={classes.root}>
      <OrganisationAppBar breadcrumbs={[{ label: "" }]} />
      <OrganisationHeader
        organisationState={orgState}
        isAdmin={isAoAdminUser}
      />

      <Grid container spacing={3}>
        <Grid item md={8}>
          {orgState.org && String(orgState.org.itemId) === itemId ? (
            <OrganisationViewDetails orgState={orgState} />
          ) : (
            <>
              <Skeleton variant="text" height={60} />
              <Skeleton variant="text" height={60} />
              <Skeleton variant="text" height={60} />
              <br />
              <Skeleton variant="rect" height={118} />
            </>
          )}
        </Grid>

        <Grid item md={4} xs={12} className={classes.rightPanelOuter}>
          <div className={classes.rightPanelInner}>
            <Tabs
              dataTest="activity-tabs"
              currentTabId=""
              onTabChange={(newTabId) => console.log(newTabId)}
              tabs={[
                { id: "", label: "Activity" },
                { id: "linked", label: "Linked Records" },
              ]}
            />
            <OrganisationsActivityFeed
              activities={activities}
              organisation={orgState.org}
              isAdmin={isAoAdminUser}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};
