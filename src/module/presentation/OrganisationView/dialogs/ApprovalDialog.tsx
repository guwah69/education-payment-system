import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Link,
  makeStyles,
} from "@material-ui/core";

import { OrganisationDialogProps } from "./DialogProps";
import { OrganisationChange } from "../../../services/domain/OrganisationChange";
import { ApprovalDialogItem } from "./ApprovalDialogItem";

const useStyles = makeStyles((theme) => ({
  dialogActions: {
    padding: 15,
  },
  body: {
    marginTop: 5,
    marginBottom: 5,
  },
}));

export const ApprovalDialog: React.FC<OrganisationDialogProps> = ({
  organisation,
  onClose,
  isAdmin,
}) => {
  const classes = useStyles();

  const orgChanges: OrganisationChange[] =
    organisation && organisation.organisationChanges;

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      data-test="approval-dialog"
    >
      <DialogTitle data-test="activity-title">
        Review pending changes
        <Divider />
      </DialogTitle>

      <DialogContent>
        Please accept or decline the following changes, the AO will be notified
        of your decision.
        <div className={classes.body}>
          {orgChanges.map((change) => (
            <ApprovalDialogItem
              change={change}
              key={change.id}
              isAdmin={isAdmin}
            />
          ))}
          {orgChanges.length ? null : (
            <strong>There are no changes left to approve</strong>
          )}
        </div>
      </DialogContent>
      <DialogActions className={classes.dialogActions}>
        <Link
          component="button"
          onClick={onClose}
          data-test="close-change-button"
        >
          Close
        </Link>
      </DialogActions>
    </Dialog>
  );
};
