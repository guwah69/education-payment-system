import { MODULE_NAME } from "../moduleName";
import { GlobalState } from "./state";

// a reducer from another module
export const authSelector = (state: GlobalState) => state.auth.user;

// a reducer from this module
export const orgListSelector = (state: GlobalState) =>
  state[MODULE_NAME].organisationList;
export const orgSelector = (state: GlobalState) =>
  state[MODULE_NAME].organisation;

export const activityFeedSelector = (state: GlobalState) =>
  state[MODULE_NAME].activityFeeds;
// other selectors....
