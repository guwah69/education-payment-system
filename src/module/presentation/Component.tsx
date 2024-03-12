import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { UserType } from "../redux/types";
import { useAuth } from "../useAuth";
import { ProtectedRoute } from "./common/ProtectedRoute";
import { Organisations } from "./OrganisationList/Organisations";
import { OrganisationView } from "./OrganisationView/OrganisationView";

export const Component: React.FC = () => {
  const { path } = useRouteMatch();
  const { orgId } = useAuth();

  return (
    <Switch>
      <ProtectedRoute
        userTypes={[UserType.Ofqual, UserType.CCEA]}
        path={path}
        exact
        redirectPath={orgId ? `/organisations/${orgId}` : "/organisations"}
      >
        <Organisations />
      </ProtectedRoute>
      <Route path={`${path}/:itemId`}>
        <OrganisationView />
      </Route>
    </Switch>
  );
};
