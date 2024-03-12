import { PagedResponse, ValidationError } from "@ofqual/portal-core/core/types";
import { Organisation } from "../../services/domain/Organisation";
import {
  clearErrorOrganisation,
  clearErrorOrganisationList,
  editOrganisation,
  editOrganisationError,
  editOrganisationSuccess,
  loadedOrganisation,
  loadedOrganisationList,
  loadingOrganisation,
  loadingOrganisationError,
  loadingOrganisationList,
  loadingOrganisationListError,
} from "../actions";
import {
  organisationListInitialState,
  organisationList,
  organisationInitialState,
  organisation,
} from "../reducers";
import {
  OrganisationListState,
  OrganisationListStatus,
  OrganisationState,
  OrganisationStatus,
} from "../state";
import { failedCrudResult, noCrudResult, successCrudResult } from "../types";

const testOrg1: Organisation = {
  id: "id",
  accreditation: false,
  createdByUpn: "toby.ward@ofqual.gov.uk",
  createdByDisplayName: "Toby Ward",
  modifiedByUpn: "toby.ward@ofqual.gov.uk",
  modifiedByDisplayName: "Toby Ward",
  assignedToUpn: "toby.ward@ofqual.gov.uk",
  assignedToDisplayName: "Toby Ward",
  email: "toby.ward@ofqual.gov.uk",
  listOfStandardFeesUrl: "https://www.google.com",
  companyNumber: "012345678",
  website: "https://www.google.com",
  createdDate: new Date(),
  modifiedDate: new Date(),
  ofqualRecognisedOnDate: new Date(),
  cceaRecognisedOnDate: new Date(),
  acronym: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  itemId: 132,
  name: "Association of British Dispensing Opticians",
  legalName: "The Association of British Dispensing Opticians",
  recognitionNumber: "RN000001",
  line1: "line1",
  line2: "line2",
  line3: "line3",
  line4: "line4",
  postCode: "postCode",
  country: "country",
  phoneNumber: "0123456",
  hasCharityNumber: false,
  hasCompanyNumber: true,
  isOtherUkLegalEntity: false,
  isIndividualOrPartnership: false,
  isRegisteredInOtherCountry: false,
  organisationChanges: [],
};

describe("Reducers", () => {
  describe("Organisation List Reducer", () => {
    const initialState: OrganisationListState = organisationListInitialState;

    it("returns the initial state", () => {
      const expectedResult: OrganisationListState = initialState;
      expect(organisationList(initialState, { type: null })).toEqual(
        expectedResult
      );
    });

    it("sets status to loading on LOADING_ORGANISATION_LIST ", () => {
      const expectedResult: OrganisationListState = {
        ...initialState,
        status: OrganisationListStatus.loading,
      };
      expect(
        organisationList(initialState, loadingOrganisationList({}))
      ).toEqual(expectedResult);
    });

    it("sets status to loaded, hasData to true and gives payload on LOADED_ORGANISATION_LIST ", () => {
      const response: PagedResponse<Organisation> = {
        data: [testOrg1],
        count: 1,
        page: 0,
        pageSize: 25,
      };

      const expectedResult: OrganisationListState = {
        ...initialState,
        status: OrganisationListStatus.loaded,
        hasData: true,
        response: response,
      };

      const action = loadedOrganisationList(response);
      expect(organisationList(initialState, action)).toEqual(expectedResult);
    });

    it("sets hasErr to true, and sets errMsg LOADING_ORGANISATION_LIST_ERROR ", () => {
      const expectedResult: OrganisationListState = {
        ...initialState,
        hasErr: true,
        err: new Error("test"),
      };

      const action = loadingOrganisationListError(new Error("test"));
      expect(organisationList(initialState, action)).toEqual(expectedResult);
    });

    it("sets hasErr to false, hasData to true and sets errMsg LOADING_ORGANISATION_LIST_ERROR ", () => {
      const errState: OrganisationListState = {
        ...initialState,
        hasErr: true,
        err: new Error("test"),
      };
      const action = clearErrorOrganisationList();
      expect(organisationList(errState, action)).toEqual(initialState);
    });
  });

  describe("Organisation Reducer", () => {
    const initialState: OrganisationState = organisationInitialState;

    it("returns the initial state", () => {
      const expectedResult: OrganisationState = initialState;
      expect(organisation(initialState, { type: null })).toEqual(
        expectedResult
      );
    });

    it("sets status to loading on LOADING_ORGANISATION", () => {
      const expectedResult: OrganisationState = {
        ...initialState,
        status: OrganisationStatus.loading,
        lastCrudResult: noCrudResult(),
      };
      expect(organisation(initialState, loadingOrganisation("132"))).toEqual(
        expectedResult
      );
    });

    it("sets status to loaded, hasData to true and gives payload on LOADED_ORGANISATION", () => {
      const response: Organisation = testOrg1;

      const expectedResult: OrganisationState = {
        ...initialState,
        status: OrganisationStatus.loaded,
        lastCrudResult: noCrudResult(),
        org: response,
      };

      const action = loadedOrganisation(response);
      expect(organisation(initialState, action)).toEqual(expectedResult);
    });

    it("sets hasErr to true, and sets errMsg LOADING_ORGANISATION_ERROR ", () => {
      const action = loadingOrganisationError(new Error("test"));

      const expectedResult: OrganisationState = {
        ...initialState,
        status: OrganisationStatus.loaded,
        hasErr: true,
        lastCrudResult: failedCrudResult(action.payload as ValidationError),
        err: new Error("test"),
      };

      expect(organisation(initialState, action)).toEqual(expectedResult);
    });

    it("sets status to updating on EDIT_ORGANISATION", () => {
      const expectedResult: OrganisationState = {
        ...initialState,
        status: OrganisationStatus.updating,
        lastCrudResult: noCrudResult(),
      };
      expect(organisation(initialState, editOrganisation(132, []))).toEqual(
        expectedResult
      );
    });

    it("sets status to loaded, hasData to true and gives payload on EDIT_ORGANISATION_SUCCESS", () => {
      const response: Organisation = testOrg1;

      const expectedResult: OrganisationState = {
        ...initialState,
        status: OrganisationStatus.loaded,
        lastCrudResult: successCrudResult(),
        org: response,
      };

      const action = editOrganisationSuccess(response);
      expect(organisation(initialState, action)).toEqual(expectedResult);
    });

    it("sets hasErr to true, and sets errMsg EDIT_ORGANISATION_ERROR ", () => {
      const action = editOrganisationError(new Error("test"));

      const expectedResult: OrganisationState = {
        ...initialState,
        hasErr: true,
        lastCrudResult: failedCrudResult(action.payload as ValidationError),
        err: new Error("test"),
      };

      expect(organisation(initialState, action)).toEqual(expectedResult);
    });

    it("clears errors on CLEAR_ERROR_ORGANISATION", () => {
      const errState: OrganisationState = {
        ...initialState,
        hasErr: true,
        err: new Error("test"),
      };
      const action = clearErrorOrganisation();
      expect(organisation(errState, action)).toEqual(initialState);
    });
  });
});
