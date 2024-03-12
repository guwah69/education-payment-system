import React, { useState } from "react";
import { Grid, Link, makeStyles } from "@material-ui/core";
import { TextField } from "@ofqual/portal-components/components/TextField";

import { fieldLabels } from "../fieldLabels";
import { OrganisationChange } from "../../../services/domain/OrganisationChange";
import { approveRejectChange } from "../../../redux/actions";
import { useDispatch } from "react-redux";

const useStyles = makeStyles((theme) => ({
  changeDetails: {
    padding: 15,
  },
  actions: {
    textAlign: "right",
  },
  action: {
    display: "inline-block",
    marginLeft: 15,
    marginRight: 15,
    fontSize: "1em",
  },
  actionDivider: {
    display: "inline-block",
    color: theme.palette.primary.main,
  },
  done: {
    visibility: "hidden",
    opacity: 0,
    transition: "visibility 0s 0.3s, opacity 0.3s linear",
  },
}));

type ApprovalDialogItemProps = {
  change: OrganisationChange;
  isAdmin: boolean;
};

export const ApprovalDialogItem: React.FC<ApprovalDialogItemProps> = ({
  change,
  isAdmin,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isDone, setIsDone] = useState(false);

  const handleApproveReject = (changeId: string, isApprove: boolean) => {
    dispatch(approveRejectChange(change.orgId, changeId, isApprove));
    setIsDone(true);
  };

  return (
    <div className={isDone ? classes.done : undefined}>
      <h4 data-test="activity-field-title">
        {fieldLabels[change.field as keyof typeof fieldLabels]}
      </h4>
      <div className={classes.changeDetails}>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <TextField
              data-test="change-old-value"
              value={change.oldValue}
              label="Old Value"
              fullWidth
              variant="outlined"
              disabled
            />
          </Grid>
          <Grid item md={12}>
            <TextField
              data-test="change-new-value"
              value={change.newValue}
              label="New Value"
              fullWidth
              variant="outlined"
              disabled
            />
          </Grid>
          {isAdmin ? (
            <Grid item md={12} className={classes.actions}>
              <Link
                data-test="accept-change"
                component="button"
                className={classes.action}
                onClick={() => handleApproveReject(change.id, true)}
              >
                Accept
              </Link>
              <span className={classes.actionDivider}>|</span>
              <Link
                data-test="reject-change"
                component="button"
                className={classes.action}
                onClick={() => handleApproveReject(change.id, false)}
              >
                Reject
              </Link>
            </Grid>
          ) : null}
        </Grid>
      </div>
    </div>
  );
};
