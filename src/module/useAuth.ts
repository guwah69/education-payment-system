import { useSelector } from "react-redux";
import { authSelector } from "./redux/selectors";
import { UserRole } from "./services/domain/userRole";

export const useAuth = () => {
  const {
    upn,
    displayName,
    userType,
    roles,
    org: { id: orgId, name: orgName },
  } = useSelector(authSelector);
  return {
    upn,
    displayName,
    userType,
    orgId,
    orgName,
    isInRole: (...rolesToCheckFor: UserRole[]) =>
      roles.some((role) => rolesToCheckFor.includes(role)),
  };
};
