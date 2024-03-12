import { Activity } from "../../../services/domain/Activity";
import { Organisation } from "../../../services/domain/Organisation";
import { fieldLabels } from "../fieldLabels";

export type ActivityDialogProps = {
  activity: Activity;
  onClose: () => void;
};

export type OrganisationDialogProps = {
  organisation: Organisation;
  onClose: () => void;
  isAdmin: boolean;
};

export type SaveDialogProps = {
  onClose: () => void;
  fields: (keyof typeof fieldLabels)[];
}; 