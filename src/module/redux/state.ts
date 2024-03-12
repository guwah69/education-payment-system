import { MODULE_NAME } from "../moduleName";
import { PagedResponse, QueryParams } from "@ofqual/portal-core/core/types";
import { Organisation } from "../services/domain/Organisation";
import { CrudResult } from "./types";
import { Activity } from "../services/domain/Activity";

export enum OrganisationListStatus {
  notLoaded = "NOT_LOADED",
  loading = "LOADING",
  loaded = "LOADED",
}

export enum OrganisationStatus {
  notLoaded = "NOT_LOADED",
  loading = "LOADING",
  loaded = "LOADED",
  updating = "UPDATING",
}

export type OrganisationListState = {
  response: PagedResponse<Organisation>;
  status: OrganisationListStatus;
  hasData: boolean;
  hasErr: boolean;
  err: Error | null;
};

export type OrganisationState = {
  org: Organisation | null;
  status: OrganisationStatus;
  lastCrudResult: CrudResult;
  hasErr: boolean;
  err: Error | null;
};

export interface ActivityFeedState {
  params: QueryParams;
  response: PagedResponse<Activity>;
  status: "NOT_LOADED" | "LOADING" | "LOADED";
  hasData: boolean;
}

export interface ActivityFeedStateDictionary {
  [key: string]: ActivityFeedState;
}
interface ModuleState {
  organisationList: OrganisationListState;
  organisation: OrganisationState;
  activityFeeds: ActivityFeedStateDictionary;
  // other state areas for this module....
}

export enum UserType {
  Unknown = 0,
  Ofqual = 1,
  CCEA = 2,
  AO = 3,
}

// if there is any state from other modules that we use in this module
//  we have an opportunity to at least type it for ourselves.
// If nothing else, store.auth will be needed to get to get the api token
interface RemoteState {
  auth: {
    user: {
      upn: string;
      displayName: string;
      token: string;
      roles: number[];
      userType: UserType;
      org: {
        id: number;
        name: string;
      };
    };
  };
}

export interface GlobalState extends RemoteState {
  [MODULE_NAME]: ModuleState;
}
