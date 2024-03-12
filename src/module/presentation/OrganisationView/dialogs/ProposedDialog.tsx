import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Link,
  makeStyles,
} from "@material-ui/core";
import { TextField } from "@ofqual/portal-components/components/TextField";
import { ActivityBody } from "../OrganisationsActivityFeed";
import { fieldLabels } from "../fieldLabels";
import { ActivityDialogProps } from "./DialogProps";
const useStyles = makeStyles((theme) => ({
  changeDetails: {
    padding: 15,
  },
  actions: {
    padding: 15,
  },
}));

export const ProposedDialog: React.FC<ActivityDialogProps> = ({
  activity,
  onClose,
}) => {
  const classes = useStyles();

  const body: ActivityBody = JSON.parse(activity.activityMetaData);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      data-test="proposed-dialog"
    >
      <DialogTitle data-test="activity-title">
        {activity.activityTitle}
        <Divider />
      </DialogTitle>

      <DialogContent>
        {body.changes.map((change) => (
          <div key={change.field}>
            <h4 data-test="activity-field-title">
              {fieldLabels[change.field]}
            </h4>
            <div className={classes.changeDetails}>
              <Grid container spacing={3}>
                <Grid item md={12}>
                  <TextField
                    value={change.oldValue}
                    data-test="change-old-value"
                    label="Old Value"
                    fullWidth
                    variant="outlined"
                    disabled
                  />
                </Grid>
                <Grid item md={12}>
                  <TextField
                    value={change.newValue}
                    data-test="change-new-value"
                    label="New Value"
                    fullWidth
                    variant="outlined"
                    disabled
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        ))}
      </DialogContent>
      <DialogActions className={classes.actions}>
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
