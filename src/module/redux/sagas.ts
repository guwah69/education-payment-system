import {
  all,
  call,
  delay,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";
import { orgsService } from "..";
import {
  PagedResponse,
  QueryParams,
  ValidatedResponse,
} from "@ofqual/portal-core/core/types";
import { Organisation } from "../services/domain/Organisation";
import {
  ActionPayload,
  editOrganisationError,
  editOrganisationSuccess,
  loadedOrganisation,
  loadedOrganisationList,
  loadingOrganisationError,
  loadingOrganisationListError,
  loadedActivities,
} from "./actions";
import {
  APPROVING_CHANGE,
  EDIT_ORGANISATION,
  LOADING_ACTIVITIES,
  LOADING_ORGANISATION,
  LOADING_ORGANISATION_LIST,
} from "./constants";
import { authSelector, orgSelector } from "./selectors";
import { Activity } from "../services/domain/Activity";
import { activitiesService } from "../services";

// allow some time for the css fade out of a read notification to complete
const FADE_OUT_MS = 250;

function* watchGetAllSaga() {
  yield takeLatest(LOADING_ORGANISATION_LIST, getAllSaga);
}

function* watchGetOrganisationSaga() {
  yield takeLatest(LOADING_ORGANISATION, getOrganisationSaga);
}

function* watchPatchOrganisationSaga() {
  yield takeLatest(EDIT_ORGANISATION, patchOrganisationSaga);
}

function* watchActivitiesSaga() {
  yield takeLatest(LOADING_ACTIVITIES, activitesSaga);
}

function* watchApproveChangeSaga() {
  yield takeEvery(APPROVING_CHANGE, approveChangeSaga);
}

export function* getAllSaga({ payload }: ActionPayload<any>) {
  try {
    const auth = yield select(authSelector);

    const response = yield call([orgsService, orgsService.search], payload, {
      token: auth.token,
    });

    yield put(loadedOrganisationList(response));
  } catch (err) {
    yield put(loadingOrganisationListError(err));
  }
}

export function* getOrganisationSaga({ payload }: ActionPayload<any>) {
  try {
    const auth = yield select(authSelector);

    const response = yield call(
      [orgsService, orgsService.getOrganisationByItemId],
      payload,
      {
        token: auth.token,
      }
    );

    yield put(loadedOrganisation(response));
  } catch (err) {
    yield put(loadingOrganisationError(err));
  }
}

export function* patchOrganisationSaga({ payload }: ActionPayload<any>): any {
  try {
    const auth = yield select(authSelector);
    // Start off with the original org in case we don't have to make any API calls

    if (payload.patchDoc.length !== 0) {
      const response: ValidatedResponse<Organisation> = yield call(
        [orgsService, orgsService.patchOrganisationByItemId],
        payload.itemId,
        payload.patchDoc,
        {
          token: auth.token,
        }
      );
      if (response.isValid) {
        return yield put(editOrganisationSuccess(response.data));
      } else {
        return yield put(editOrganisationError(response.error));
      }
    } else {
      yield delay(100);
      let resultOrg = (yield select(orgSelector)).org;
      return yield put(editOrganisationSuccess(resultOrg));
    }
  } catch (err) {
    return yield put(editOrganisationError(err));
  }
}

function* activitesSaga({
  payload,
}: ActionPayload<{
  resourceId: string;
  params: QueryParams;
}>) {
  const { resourceId, params } = payload;
  const auth = yield select(authSelector);

  const activities: PagedResponse<Activity> = yield call(
    [activitiesService, activitiesService.search],
    resourceId,
    { ...params },
    { token: auth.token }
  );
  yield put(loadedActivities(resourceId, activities));
}

function* approveChangeSaga({
  payload,
}: ActionPayload<{ id: string; changeId: string; isApprove: boolean }>) {
  const auth = yield select(authSelector);
  const { id, changeId, isApprove } = payload;
  // We do an 'all' with a delay to make sure that the reading of a notifaction
  //  takes *at least* NOTIFICATION_FADE_OUT_MS.  We may as well have the api call going in
  //  parrallel with the delay.  If the delay finishes first, we have a long running api call
  //  so it was a good thing we weren't doing it sequentially after the delay had finished.
  //  If the api call finishes first, it was super quick and so we still need to wait for the
  //  delay to finish to give the UI time to fade out.
  const { organisation } = yield all({
    artificialDelay: delay(FADE_OUT_MS), //todo: could the delay length be passed in the payload from the UI?
    organisation: call(
      [
        orgsService,
        isApprove ? orgsService.approveChange : orgsService.rejectChange,
      ],
      id,
      changeId,
      {
        token: auth.token,
      }
    ),
  });

  yield put(loadedOrganisation(organisation));
}

export function* rootSaga() {
  yield all([
    watchGetAllSaga(),
    watchGetOrganisationSaga(),
    watchPatchOrganisationSaga(),
    watchActivitiesSaga(),
    watchApproveChangeSaga(),
    // further sagas...
  ]);
}
