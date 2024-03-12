import { combineReducers, AnyAction, CombinedState, Reducer } from "redux";
import {
  PagedResponseEmpty,
  ValidationError,
} from "@ofqual/portal-core/core/types";
import {
  LOADING_ORGANISATION_LIST,
  LOADED_ORGANISATION_LIST,
  LOADING_ORGANISATION_LIST_ERROR,
  CLEAR_ERROR_ORGANISATION_LIST,
  LOADING_ORGANISATION,
  LOADED_ORGANISATION,
  CLEAR_ERROR_ORGANISATION,
  LOADING_ORGANISATION_ERROR,
  EDIT_ORGANISATION,
  EDIT_ORGANISATION_ERROR,
  EDIT_ORGANISATION_SUCCESS,
} from "./constants";
import {
  OrganisationListState,
  OrganisationListStatus,
  OrganisationState,
  OrganisationStatus,
  ActivityFeedState,
} from "./state";
import { failedCrudResult, noCrudResult, successCrudResult } from "./types";
import { LOADED_ACTIVITIES, LOADING_ACTIVITIES } from "./constants";
import { ActivityFeedStateDictionary } from "./state";

export const organisationListInitialState: OrganisationListState = {
  status: OrganisationListStatus.notLoaded,
  response: PagedResponseEmpty,
  hasData: false,
  hasErr: false,
  err: null,
};

export const organisationInitialState: OrganisationState = {
  status: OrganisationStatus.notLoaded,
  org: null,
  lastCrudResult: noCrudResult(),
  hasErr: false,
  err: null,
};

export const defaultActivityFeedState: ActivityFeedState = {
  params: {},
  status: "NOT_LOADED",
  response: PagedResponseEmpty,
  hasData: false,
};

export const defaultActivityFeedStateDictionary = {};

export const organisationList = (
  state: OrganisationListState = organisationListInitialState,
  action: AnyAction
): OrganisationListState => {
  const { type, payload } = action;
  switch (type) {
    case LOADING_ORGANISATION_LIST:
      return {
        ...state,
        status: OrganisationListStatus.loading,
      };
    case LOADED_ORGANISATION_LIST:
      return {
        ...state,
        status: OrganisationListStatus.loaded,
        response: payload,
        hasData: true,
      };
    case LOADING_ORGANISATION_LIST_ERROR:
      return {
        ...state,
        status: OrganisationListStatus.notLoaded,
        hasErr: true,
        err: payload,
      };
    case CLEAR_ERROR_ORGANISATION_LIST:
      return {
        ...state,
        hasErr: false,
        err: null,
      };
  }
  return state;
};

export const organisation = (
  state: OrganisationState = organisationInitialState,
  action: AnyAction
): OrganisationState => {
  const { type, payload } = action;
  switch (type) {
    case LOADING_ORGANISATION:
      return {
        ...state,
        status: OrganisationStatus.loading,
        lastCrudResult: noCrudResult(),
        org: null,
        hasErr: false,
        err: null,
      };
    case EDIT_ORGANISATION:
      return {
        ...state,
        status: OrganisationStatus.updating,
        lastCrudResult: noCrudResult(),
      };
    case LOADING_ORGANISATION_ERROR:
      return {
        ...state,
        status: OrganisationStatus.loaded,
        hasErr: true,
        err: payload,
        lastCrudResult: failedCrudResult(payload as ValidationError),
      };
    case LOADED_ORGANISATION:
      return {
        ...state,
        status: OrganisationStatus.loaded,
        org: payload,
        //lastCrudResult: successCrudResult()
      };
    case EDIT_ORGANISATION_SUCCESS:
      return {
        ...state,
        status: OrganisationStatus.loaded,
        org: payload,
        lastCrudResult: successCrudResult(),
      };
    case EDIT_ORGANISATION_ERROR:
      return {
        ...state,
        status: OrganisationStatus.notLoaded,
        hasErr: true,
        err: payload,
        lastCrudResult: failedCrudResult(payload as ValidationError),
      };
    case CLEAR_ERROR_ORGANISATION:
      return {
        ...state,
        hasErr: false,
        err: null,
      };
  }
  return state;
};

const activityFeeds = (
  state: ActivityFeedStateDictionary = defaultActivityFeedStateDictionary,
  action: AnyAction
): ActivityFeedStateDictionary => {
  const { type } = action;

  if (type === LOADING_ACTIVITIES || type === LOADED_ACTIVITIES) {
    const resourceId: string = action.payload.resourceId;
    const thisResourceState = state[resourceId] || {
      ...defaultActivityFeedState,
    };

    switch (type) {
      case LOADING_ACTIVITIES:
        return {
          ...state,
          [resourceId]: {
            ...thisResourceState,
            status: "LOADING",
          },
        };
      case LOADED_ACTIVITIES:
        return {
          ...state,
          [resourceId]: {
            ...thisResourceState,
            status: "LOADED",
            response: action.payload.response,
            hasData: true,
          },
        };
      default:
        return state;
    }
  }
  return state;
};

type InternalOrganisationState = {
  organisationList: OrganisationListState;
  organisation: OrganisationState;
  activityFeeds: ActivityFeedStateDictionary;
};

type OrganisationReducerState = CombinedState<InternalOrganisationState>;

export const rootReducer: Reducer<
  CombinedState<OrganisationReducerState>,
  AnyAction
> = combineReducers({
  organisationList,
  organisation,
  activityFeeds,
  // other reducers...
});
