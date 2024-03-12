import { Badge, Button, makeStyles, Menu } from "@material-ui/core";
import { FiberManualRecord, SvgIconComponent } from "@material-ui/icons";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.secondary.contrastText,
  },
  badge: {
    padding: 3,
    textTransform: "none",

    "& .MuiBadge-badge": {
      height: 17,
      minWidth: 17,
      top: 5,

      "& .MuiSvgIcon-root": {
        fontSize: 5,
      },
    },
  },
}));

export type FilterProps = {
  title: string;
  Icon: SvgIconComponent;
  badge?: boolean | number | undefined;
  dataTest?: string;
};

export const Filter: React.FC<FilterProps> = ({
  title,
  Icon,
  children,
  badge,
  dataTest,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const classes = useStyles();

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const badgeContent = !badge ? undefined : typeof badge === "number" ? ( // badge is undefined, false or zero
    badge
  ) : (
    <FiberManualRecord fontSize="small" />
  );

  return (
    <>
      <Button
        startIcon={<Icon />}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        className={classes.root}
        data-test={dataTest}
      >
        <Badge badgeContent={badgeContent} className={classes.badge}>
          {title}
        </Badge>
      </Button>

      <Menu
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleMenuClose}
        className="UserMenu"
        data-test={`menu-${dataTest}`}
      >
        {children}
      </Menu>
    </>
  );
};
