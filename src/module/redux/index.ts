import { rootReducer } from "./reducers";
import { rootSaga } from "./sagas";
import { MODULE_NAME } from "../moduleName";

export const redux = {
  name: MODULE_NAME,
  reducer: rootReducer,
  saga: rootSaga,
};
