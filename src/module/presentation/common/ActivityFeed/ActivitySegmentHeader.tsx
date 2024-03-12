import React from "react";
import { Grid, Chip, Divider } from "@material-ui/core";

interface ActivitySegmentHeaderProps {
  label: string;
}

export const ActivitySegmentHeader: React.FC<ActivitySegmentHeaderProps> = ({
  label,
}) => (
  <Grid item sm={12}>
    <div
      style={{
        position: "relative",
        top: "-5px",
        textAlign: "center",
        fontSize: "1.1em",
        fontWeight: "bold",
      }}
    >
      <Chip label={label} />
      <Divider
        style={{
          position: "relative",
          top: "-16px",
          zIndex: -999,
        }}
      />
    </div>
  </Grid>
);
