import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  makeStyles,
  Avatar,
  Chip,
  ListItemSecondaryAction,
} from "@material-ui/core";
import { Error, Business } from "@material-ui/icons";
import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { OrganisationListState } from "../../redux/state";
import { Organisation } from "../../services/domain/Organisation";
import { OrganisationChange, OrganisationChangeStatus } from "../../services/domain/OrganisationChange";

const useStyles = makeStyles((theme) => ({
  submissionRowDetails: {
    paddingRight: "20px",
  },
  submissionRow: {
    ...theme.list.itemPrimary,
  },
  submissionRowDisabled: {
    ...theme.list.itemDisabled,
  },
}));

const ORGANISATION_LIST_SEARCH_STATE_KEY = "organisationsListSearch";

export const OrganisationList: React.FC<{
  orgListState: OrganisationListState;
}> = ({ orgListState }) => {
  const classes = useStyles();

  const { response } = orgListState;

  const history = useHistory();
  const { pathname, search } = useLocation();
  const navigate = (id: any) =>
    history.push(`${pathname}/${id}`, {
      [ORGANISATION_LIST_SEARCH_STATE_KEY]: search,
    });

  const hasActiveChanges = (changeList: OrganisationChange[]) => {
    console.log(changeList)
    return changeList && changeList.filter(change => change.status === OrganisationChangeStatus.Active).length > 0
  }

  return (
    <Paper>
      <List disablePadding>
        {response.data.map((item: Organisation) => (
          <React.Fragment key={item.id}>
            <ListItem
              button
              alignItems="flex-start"
              onClick={() => navigate(item.itemId ?? null)}
              divider
              data-test="org-row"
              className={classes.submissionRow}
            >
              <ListItemAvatar>
                <Avatar>
                  <Business />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography component="span" variant="h6" color="textPrimary">
                    {item.legalName}
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography
                      className={classes.submissionRowDetails}
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      <strong>Acronym:</strong> {item.acronym}
                    </Typography>
                    <Typography
                      className={classes.submissionRowDetails}
                      component="span"
                      variant="body2"
                      color="textPrimary"
                    >
                      <strong>Legal Name:</strong> {item.legalName}
                    </Typography>
                  </React.Fragment>
                }
              />
              <ListItemSecondaryAction>
                {hasActiveChanges(item.organisationChanges) && <Chip
                  size="small"
                  label="Pending Changes"
                  icon={<Error />}
                  color="primary"
                />}
              </ListItemSecondaryAction>
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};
