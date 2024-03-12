import { Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import React from "react";
import { RecordHeader } from "@ofqual/portal-components/components/RecordHeader";
import { OrganisationState } from "../../redux/state";
import { CompareArrows } from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) => {
  return {
    link: {
      color: "#C2C2FF",
    },
    gridItem: {
      borderRight: "1px solid rgba(255,255,255,0.2)",
      padding: "0 15px",
      "& div": {
        padding: "5px",
      },
    },
    gridItemRight: {
      padding: "0 15px",
    },
    pendingChangeDiv: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      marginTop: "10px",
    },
    pendingChangeIcon: {
      margin: "auto",
      fontSize: "60px",
      textAlign: "center",
      paddingRight: "5px",
    },
    pendingChangesText: {
      textTransform: "uppercase",
      width: "200px",
    },
  };
});

type OrganisationHeaderProps = {
  organisationState: OrganisationState;
  isAdmin: boolean;
};

export const OrganisationHeader: React.FC<OrganisationHeaderProps> = ({
  organisationState: state,
  isAdmin,
}) => {
  const classes = useStyles();
  return (
    <RecordHeader>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        spacing={2}
        style={{ height: "100%" }}
      >
        <Grid className={classes.gridItem}>
          <div>
            <label>
              <strong>Acronym:</strong>
            </label>{" "}
            <span data-test="metadata-acronym">{state.org?.acronym}</span>
          </div>
          <div>
            <label>
              <strong>Organisation Number:</strong>
            </label>{" "}
            <span data-test="metadata-companyRegNumber">
              {state.org?.companyNumber}
            </span>
          </div>
          <div>
            <label>
              <strong>Recognition Number:</strong>
            </label>{" "}
            <span data-test="metadata-recognitionNumber">
              {state.org?.recognitionNumber}
            </span>
          </div>
        </Grid>
        <Grid
          className={classes.gridItem}
          style={
            isAdmin && state.org?.organisationChanges.length
              ? { flex: 1 }
              : undefined
          }
        >
          <div>
            <label>
              <strong>Email:</strong>
            </label>{" "}
            <span>
              <a
                data-test="metadata-email"
                href={`mailto:${state.org?.email}`}
                className={classes.link}
              >
                {state.org?.email}
              </a>
            </span>
          </div>
          <div>
            <label>
              <strong>Website:</strong>
            </label>{" "}
            <span data-test="metadata-website">
              <a
                target="_blank"
                rel="noreferrer"
                data-test="metadata-website"
                href={state.org?.website}
                className={classes.link}
              >
                {state.org?.website}
              </a>
            </span>
          </div>
          <div>
            <label>
              <strong>List of Standard Fees:</strong>
            </label>{" "}
            <span>
              <a
                target="_blank"
                rel="noreferrer"
                data-test="metadata-listOfStandardFees"
                href={state.org?.listOfStandardFeesUrl}
                className={classes.link}
              >
                {state.org?.listOfStandardFeesUrl}
              </a>
            </span>
          </div>
        </Grid>
        {isAdmin && state.org?.organisationChanges.length ? (
          <Grid className={classes.gridItemRight} data-test="pending-changes">
            <div className={classes.pendingChangeDiv}>
              <CompareArrows className={classes.pendingChangeIcon} />
              <Typography
                variant="subtitle2"
                className={classes.pendingChangesText}
              >
                {state.org.organisationChanges.length} pending{" "}
                {state.org.organisationChanges.length > 1
                  ? "changes require "
                  : "change requires "}
                approval
              </Typography>
            </div>
          </Grid>
        ) : null}
      </Grid>
    </RecordHeader>
  );
};
