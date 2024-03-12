import { AnyAction } from "redux";
import {
  JSONPatchDocument,
  PagedResponse,
  QueryParams,
  ValidationError,
} from "@ofqual/portal-core/core/types";
import { Organisation } from "../services/domain/Organisation";
import {
  CLEAR_ERROR_ORGANISATION_LIST,
  LOADED_ORGANISATION_LIST,
  LOADING_ORGANISATION_LIST,
  LOADING_ORGANISATION_LIST_ERROR,
  CLEAR_ERROR_ORGANISATION,
  LOADED_ORGANISATION,
  LOADING_ORGANISATION,
  LOADING_ORGANISATION_ERROR,
  EDIT_ORGANISATION,
  EDIT_ORGANISATION_SUCCESS,
  EDIT_ORGANISATION_ERROR,
  LOADED_ACTIVITIES,
  LOADING_ACTIVITIES,
  APPROVING_CHANGE,
} from "./constants";
import { Activity } from "../services/domain/Activity";

export interface ActionPayload<T> extends AnyAction {
  type: string;
  payload: T;
}

export const clearErrorOrganisationList = () => ({
  type: CLEAR_ERROR_ORGANISATION_LIST,
});

export const loadedOrganisationList = (
  payload: PagedResponse<Organisation>
) => ({
  type: LOADED_ORGANISATION_LIST,
  payload,
});

export const loadingOrganisationList = (payload: QueryParams) => ({
  type: LOADING_ORGANISATION_LIST,
  payload,
});

export const loadingOrganisationListError = (payload: Error) => ({
  type: LOADING_ORGANISATION_LIST_ERROR,
  payload,
});

export const clearErrorOrganisation = () => ({
  type: CLEAR_ERROR_ORGANISATION,
});

export const loadedOrganisation = (payload: Organisation) => ({
  type: LOADED_ORGANISATION,
  payload,
});

export const loadingOrganisation = (payload: string) => ({
  type: LOADING_ORGANISATION,
  payload,
});

export const loadingOrganisationError = (payload: Error | ValidationError) => ({
  type: LOADING_ORGANISATION_ERROR,
  payload,
});

export const editOrganisation = (
  itemId: number,
  patchDoc: JSONPatchDocument
) => ({
  type: EDIT_ORGANISATION,
  payload: { itemId, patchDoc },
});

export const editOrganisationSuccess = (payload: Organisation) => ({
  type: EDIT_ORGANISATION_SUCCESS,
  payload,
});

export const editOrganisationError = (payload: ValidationError | Error) => ({
  type: EDIT_ORGANISATION_ERROR,
  payload,
});

export const loadedActivities = (
  resourceId: string,
  response: PagedResponse<Activity>
) => ({
  type: LOADED_ACTIVITIES,
  payload: { resourceId, response },
});

export const loadingActivities = (
  resourceId: string,
  params: QueryParams = {}
) => ({
  type: LOADING_ACTIVITIES,
  payload: { resourceId, params },
});
export const approveRejectChange = (id: string, changeId: string, isApprove: boolean) => ({
  type: APPROVING_CHANGE,
  payload: { id, changeId, isApprove },
});
