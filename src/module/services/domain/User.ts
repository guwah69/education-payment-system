import { Model } from  "@ofqual/portal-core/core/types";
import { Team } from "./Team";
import { AllRoles } from "./userRole";

export enum UserType {
  Ofqual = 1,
  CCEA = 2,
  AO = 3,
}

export type User = {
  id: string;
  upn: string;
  loginEmail: string;
  modifiedDate: string;
  userRoles: string[];
  awardingOrgId: number | null;
  awardingOrgName: string | null;
  awardingOrg: { id: number; name: string } | null;
  userType: UserType;
  createdDate: string;
  alternateEmail: string | null;
  telephoneNumber: string | null;
  title: string | null;
  firstName: string | null;
  surname: string | null;
  fullName: string | null;
  acceptedCookies: boolean;
  acceptedTerms: boolean;
  subscribeToEmails: boolean;
  lastActivatedDate: string | null;
  deactivatedDate: string | null;
  active: boolean;
  team: Team | null;
  // legacyId?: string;
};

export const toUser = (model: Model): User => {
  return {
    id: model.id,
    upn: model.upn,
    loginEmail: model.loginEmail,
    modifiedDate: model.modifiedDate,
    userRoles: (model.userRoles as string[])
      // sort the roles in to the order they appear in the Roles definition arrays
      //  (which are themselves ordered in to a prioritised order)
      .sort(
        (a, b) =>
          AllRoles.indexOf(parseInt(a, 10)) - AllRoles.indexOf(parseInt(b, 10))
      )
      .map((role) => role.toString()),
    awardingOrgId: model.awardingOrgId,
    awardingOrgName: model.awardingOrg?.name,
    awardingOrg: model.awardingOrg,
    userType: model.userType as UserType,
    createdDate: model.createdDate,
    alternateEmail: model.alternateEmail,
    telephoneNumber: model.telephoneNumber,
    title: model.title,
    firstName: model.firstName,
    surname: model.surname,
    fullName: model.fullName,
    acceptedCookies: model.acceptedCookies,
    acceptedTerms: model.accepetedTerms,
    subscribeToEmails: model.subscribeToEmails,
    lastActivatedDate: model.lastActivatedDate,
    deactivatedDate: model.deactivatedDate,
    active: model.active,
    team: model.team,
  };
};
