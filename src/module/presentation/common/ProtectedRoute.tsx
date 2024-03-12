import React from "react";
import { Redirect, Route, RouteProps, useRouteMatch } from "react-router-dom";
import { UserType } from "../../redux/types";
import { UserRole } from "../../services/domain/userRole";
import { useAuth } from "../../useAuth";

export const ProtectedRoute: React.FC<
  RouteProps & {
    userTypes?: UserType[];
    roles?: UserRole[];
    redirectPath?: string;
  }
> = ({
  userTypes: userTypesToCheck,
  roles: rolesToCheck,
  redirectPath,
  ...props
}) => {
  const { userType, isInRole } = useAuth();
  const { path } = useRouteMatch();

  if (
    userTypesToCheck?.length &&
    !userTypesToCheck.includes(userType) // :( - need to talk this through re core module
  ) {
    if (redirectPath) {
      return <Redirect to={redirectPath} />;
    } else {
      return <Redirect to={path} />;
    }
  }
  if (rolesToCheck?.length && !isInRole(...rolesToCheck)) {
    if (redirectPath) {
      return <Redirect to={redirectPath} />;
    } else {
      return <Redirect to={path} />;
    }
  }
  return <Route {...props} />;
};
