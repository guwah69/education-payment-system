import { Button, MenuItem } from "@material-ui/core";
import React from "react";

type FilterClearButtonProps = {
  onClick: () => void;
};

export const FilterClearButton = React.forwardRef<
  unknown,
  FilterClearButtonProps
>((props, ref /* ref prop required by Material Ui*/) => (
  <MenuItem>
    <Button variant="text" onClick={props.onClick} fullWidth>
      Clear
    </Button>
  </MenuItem>
));
