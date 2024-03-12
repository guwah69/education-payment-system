import {
  Checkbox,
  FormControlLabel,
  makeStyles,
  MenuItem,
} from "@material-ui/core";
import React from "react";

type FilterCheckboxProps = {
  isChecked: boolean;
  text: string;
  name: string;
  onChange: () => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginRight: 0,
  },
}));

export const FilterCheckbox = React.forwardRef<unknown, FilterCheckboxProps>((
  props,
  ref /* ref prop required by Material Ui*/
) => {
  const { isChecked, text, onChange, name } = props;
  const classes = useStyles();
  return (
    <MenuItem>
      <FormControlLabel
        className={classes.root}
        control={
          <Checkbox
            checked={isChecked}
            name={name}
            value={name}
            onChange={onChange}
          />
        }
        label={text}
      />
    </MenuItem>
  );
});
