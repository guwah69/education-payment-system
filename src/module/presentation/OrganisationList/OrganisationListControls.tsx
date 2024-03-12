import { FilterList } from "@material-ui/icons";
import React from "react";
import { useSearch } from "@ofqual/portal-core/core/hooks";
import { Filter, FilterRadioButton } from "../common/responseFilter";
import { Checkbox, makeStyles, MenuItem, Theme } from "@material-ui/core";
import {
  FilterMenu,
  FilterSearch,
} from "@ofqual/portal-components/components/ResponseFilter";

export const OrganisationListControls: React.FC = () => {
  const {
    searchParams,
    navigateToNextSearch,
    searchParamsFiltersOnly,
  } = useSearch();

  const useStyles = makeStyles((theme: Theme) => {
    return {
      root: {
        "& fieldset": {
          borderColor: theme.palette.primary.main,
        },
      },
      menuItem: {
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
      filterLabel: {
        display: "inline-block",
        textAlign: "left",
      },
      separator: {
        color: "#858585",
      },
    };
  });
  const classes = useStyles();

  return (
    <>
      <FilterSearch
        title="Search..."
        value={searchParams.search}
        onChange={(value) =>
          navigateToNextSearch({
            search: value,
          })
        }
        dataTest="org-list-search"
      />
      &nbsp;&nbsp;
      <Filter
        Icon={FilterList}
        title="Order By"
        badge={!!searchParams.order}
        dataTest="org-list-order-filter"
      >
        <FilterRadioButton
          isChecked={typeof searchParams.order !== "string"}
          value={undefined}
          text={"Acronym"}
          onChange={() =>
            navigateToNextSearch({
              order: undefined,
            })
          }
        />
        <FilterRadioButton
          isChecked={searchParams.order === "legalName"}
          value={"legalName"}
          text={"Legal Name"}
          onChange={() =>
            navigateToNextSearch({
              order: "legalName",
            })
          }
        />
      </Filter>
      <span className={classes.separator}> | </span>
      <FilterMenu
        Icon={FilterList}
        title="Filters"
        dataTest="users-filter"
        state={{ searchParamsFiltersOnly, navigateToNextSearch }}
      >
        {(workingParams, dirtyParams, addParam) => (
          <form>
            <MenuItem className={classes.menuItem}>
              <div>
                <Checkbox
                  checked={
                    workingParams.showOnlyWithActivePendingChanges === "true"
                  }
                  onChange={(e) => {
                    addParam(
                      "showOnlyWithActivePendingChanges",
                      e.target.checked ? "true" : undefined
                    );
                  }}
                  name="showPendingCheckbox"
                  data-test="organisations-pending-filter"
                />
                <span className={classes.filterLabel}>
                  {" "}
                  Show only pending approvals
                </span>
              </div>
            </MenuItem>
          </form>
        )}
      </FilterMenu>
    </>
  );
};
