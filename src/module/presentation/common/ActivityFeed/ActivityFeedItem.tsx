import { Avatar, Divider, Link, makeStyles, Paper } from "@material-ui/core";
import {
  formatUtcDate,
  standardDateFormats,
} from "@ofqual/portal-core/core/utils/dateUtils";
import React from "react";
import { Activity } from "../../../services/domain/Activity";

const PADDING = 15;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  activity: {
    flexGrow: 1,
    padding: PADDING,
    boxShadow: "0 0 19px -2px hsla(0,0%,63.9%,.3)",
    border: "1px solid #ddd",
    backgroundColor: "#fff",
    borderRadius: "3px",
  },
  avatar: {
    marginLeft: "auto",
    paddingLeft: 15,
    paddingRight: 5,
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: "center",
    lineHeight: "2.5em",
  },
  title: {
    paddingBottom: PADDING,
  },
  body: {
    minHeight: 70,
    paddingTop: PADDING,
    paddingBottom: PADDING,
  },
  options: {
    textAlign: "right",
    paddingTop: PADDING,
  },
  option: {
    fontWeight: "bold",
  },
}));

export type ActivityFeedItemDefinition<T> = {
  activityType: number;
  renderBody?: (body: T) => React.ReactNode;
  options?: { label: string; onClick: (activity: Activity) => void }[];
};

export type ActivityFeedItemProps<T> = {
  activity: Activity;
  definition: ActivityFeedItemDefinition<T> | undefined;
};

export const ActivityFeedItem: React.FC<ActivityFeedItemProps<any>> = ({
  activity,
  definition,
}) => {
  const classes = useStyles();

  if (!definition) {
    console.warn(
      `An activity with type ${activity.activityType} could not be fully rendered as no definition has been found`
    );
  }

  const body = definition?.renderBody
    ? definition.renderBody(JSON.parse(activity.activityMetaData))
    : null;
  const options = definition?.options || [];

  return (
    <div className={classes.root}>
      <Paper square className={classes.activity} data-test="activity">
        <div className={classes.title} data-test="activity-title">
          {activity.activityTitle}
        </div>
        {body ? (
          <>
            <Divider />
            <div className={classes.body} data-test="activity-body">
              {body}
            </div>
          </>
        ) : null}

        {options.length ? (
          <>
            <Divider />
            <div className={classes.options}>
              {options.map((option, index) => (
                <Link
                  data-test={`activity-action-${index}`}
                  component="button"
                  className={classes.option}
                  key={index}
                  onClick={() => option.onClick(activity)}
                >
                  {option.label}
                </Link>
              ))}
            </div>
          </>
        ) : null}
      </Paper>
      <div className={classes.avatar}>
        <Avatar />
        {formatUtcDate(activity.createdDate, standardDateFormats.TIME)}
      </div>
    </div>
  );
};
