import React from "react";
import { useLocation } from "react-router-dom";
import { MODULE_NAME, MODULE_UI_NAME } from "../moduleName";
import {
  AppBar,
  AppBarProps,
} from "@ofqual/portal-components/components/SecondaryAppBar";

const ORGANISATION_SEARCH_STATE_KEY = "OrganisationSearch";

type OrganisationAppBarProps = Omit<AppBarProps, "moduleName">;

export const OrganisationAppBar: React.FC<OrganisationAppBarProps> = ({
  children,
  breadcrumbs = [],
}) => {
  // for the Organisation module, we want the root breadcrumb to link to retain the users search params.
  //  We maintain the organisation list search/filter/page params in rootSearchStateKey
  const { state } = useLocation<{ [ORGANISATION_SEARCH_STATE_KEY]?: string }>();

  const rootBreadcrumb = {
    label: MODULE_UI_NAME,
    to: `${state?.[ORGANISATION_SEARCH_STATE_KEY] || ""}`,
  };

  return (
    <AppBar
      moduleName={MODULE_NAME}
      breadcrumbs={[rootBreadcrumb, ...breadcrumbs]}
    >
      {children}
    </AppBar>
  );
};
