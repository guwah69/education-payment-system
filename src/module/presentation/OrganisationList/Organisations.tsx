import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orgListSelector } from "../../redux/selectors";
import { Pager } from "@ofqual/portal-components/components/Pager";
import { OrganisationAppBar } from "../OrganisationAppBar";
import { OrganisationList } from "./OrganisationList";
import { loadingOrganisationList } from "../../redux/actions";
import { useSearch } from "@ofqual/portal-core/core/hooks";
import { OrganisationListControls } from "./OrganisationListControls";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      marginTop: theme.contentOffsets.AFTER_SECONDARY_APPBAR,
    },
  };
});

export const Organisations: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { searchParams, navigateToNextPage } = useSearch();

  useEffect(() => {
    dispatch(loadingOrganisationList(searchParams));
  }, [dispatch, searchParams]);

  const orgListState = useSelector(orgListSelector);

  return (
    <div className={classes.root}>
      <OrganisationAppBar>
        <OrganisationListControls />
      </OrganisationAppBar>

      <Pager state={orgListState} navigateToNextPage={navigateToNextPage} />

      <div>
        {orgListState.hasData && (
          <OrganisationList orgListState={orgListState} />
        )}
      </div>
    </div>
  );
};
