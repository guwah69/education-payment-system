import React from "react";
import { ActivityFeedState } from "../../../redux/state";
import { Skeleton } from "@material-ui/lab";
import { Link, makeStyles } from "@material-ui/core";
import { segmentList } from "@ofqual/portal-core/core/utils/listHelpers";
import { formatAsTodayYesterdayOrDate } from "@ofqual/portal-core/core/utils/dateUtils";
import { ActivitySegmentHeader } from "./ActivitySegmentHeader";
import {
  ActivityFeedItem,
  ActivityFeedItemDefinition,
} from "./ActivityFeedItem";

const useStyles = makeStyles((theme) => ({
  activityList: {
    padding: "15px",
    backgroundColor: "#f4f4f4",
    boxShadow: "0 0 19px -2px hsla(0,0%,63.9%,.3)",
    // border: "1px solid #ddd",
    borderRadius: "3px",
    top: "-1px",
    position: "relative",
    height: "calc(100% - 65px)",
    overflow: "scroll",
    "&::-webkit-scrollbar": {
      width: "0px",
      background: "transparent",
    },
  },
  activityActionBar: {
    height: "40px",
    backgroundColor: "#293445",
    position: "fixed",
    bottom: "5px",
    width: "calc((100vw - 271px) * 0.33)",
    right: "13px",
    borderBottomLeftRadius: "3px",
    borderBottomRightRadius: "3px",
    color: "#fff",
    "& button": {
      // lineHeight: "35px",
      padding: "10px",
      float: "right",
    },
  },
}));

export type ActivityFeedProps = {
  activities: ActivityFeedState | null | undefined;
  definitions: ActivityFeedItemDefinition<any>[];
  actions: {
    label: string;
    disabled?: boolean;
    action: () => void;
    dataTest?: string;
  }[];
};

export const ActivityFeed: React.FC<ActivityFeedProps> = ({
  activities,
  definitions,
  actions,
}) => {
  const classes = useStyles();

  if (!activities?.hasData) {
    return (
      <>
        <Skeleton variant="text" height={60} />
        <Skeleton variant="text" height={60} />
        <Skeleton variant="text" height={60} />
        <br />
        <Skeleton variant="rect" height={118} />
      </>
    );
  }

  const segmentedActivities = segmentList(
    activities.response.data,
    (item) => formatAsTodayYesterdayOrDate(item.createdDate) || ""
  );

  return (
    <div className={classes.activityList}>
      {segmentedActivities.map((segment) => (
        <div key={segment.label}>
          <ActivitySegmentHeader label={segment.label} />
          {segment.data.map((item) => (
            <ActivityFeedItem
              key={item.id}
              activity={item}
              definition={definitions.find(
                (definition) => definition.activityType === item.activityType
              )}
            />
          ))}
        </div>
      ))}
      <div className={classes.activityActionBar}>
        {actions.map((action) => (
          <React.Fragment key={action.label}>
            <Link
              data-test={action.dataTest}
              color="inherit"
              style={{ textTransform: "uppercase" }}
              component="button"
              onClick={() => action.action()}
              disabled={action.disabled}
            >
              {action.label}
            </Link>{" "}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
