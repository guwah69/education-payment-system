import {
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link,
  makeStyles,
} from "@material-ui/core";
import { fieldLabels } from "../fieldLabels";
import { SaveDialogProps } from "./DialogProps";

const useStyles = makeStyles((theme) => ({
  nameList: {
    marginTop: 15,
    marginBottom: 15,
  },
  actions: {
    padding: 15,
  },
  chip: {
    margin: 3,
  },
}));

export const SaveDialog: React.FC<SaveDialogProps> = ({ onClose, fields }) => {
  const classes = useStyles();
  return (
    <Dialog open={true} onClose={onClose} data-test="save-dialog">
      <DialogTitle data-test="save-title">
        Some Changes Require Approval
      </DialogTitle>
      <DialogContent>
        Some of the fields you have changed require approval from Ofqual, a
        notification has been sent to the team responsible and the change will
        be reviewed within the next X days.
        <div className={classes.nameList}>
          {fields.map((field) => (
            <Chip
              data-test={`change-${field}`}
              key={field}
              label={fieldLabels[field]}
              className={classes.chip}
            />
          ))}
        </div>
      </DialogContent>
      <DialogActions className={classes.actions}>
        <Link
          component="button"
          onClick={onClose}
          data-test="close-save-button"
        >
          Close
        </Link>
      </DialogActions>
    </Dialog>
  );
};
