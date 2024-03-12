import {
  FormControlLabel,
  makeStyles,
  MenuItem,
  Radio,
} from "@material-ui/core";
import React from "react";
type FilterRadioButtonProps = {
  isChecked: boolean;
  value: any;
  text: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginRight: 0,
  },
}));

export const FilterRadioButton = React.forwardRef<
  unknown,
  FilterRadioButtonProps
>((props, ref /* ref prop required by Material Ui*/) => {
  const { isChecked, value, text, onChange } = props;
  const classes = useStyles();
  return (
    <MenuItem>
      <FormControlLabel
        className={classes.root}
        value={value}
        control={<Radio checked={isChecked} onChange={onChange} />}
        label={text}
      />
    </MenuItem>
  );
});
