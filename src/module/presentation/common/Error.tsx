import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    color: theme.palette.error.main,
  },
}));

export const Error: React.FC = ({ children }) => {
  const classes = useStyles();

  return <span className={classes.root}>{children}</span>;
};
