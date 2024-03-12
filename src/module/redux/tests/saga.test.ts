import { runSaga } from "redux-saga";
import sinon from "sinon";
import { OrgsService } from "../../services/business/OrgsService";
import { PagedResponse, ValidatedResponse, JSONPatchDocument } from "@ofqual/portal-core/core/types";
import { Organisation } from "../../services/domain/Organisation";
import { loadedOrganisationList as loadedOrganisationListAction,
         loadingOrganisationList as loadingOrganisationListAction,
         loadingOrganisationListError as loadingOrganisationListErrorAction,
         loadingOrganisation as loadingOrganisationAction,
         loadedOrganisation as loadedOrganisationAction,
         loadingOrganisationError as loadingOrganisationErrorAction,
         editOrganisation as editOrganisationAction,
         editOrganisationSuccess as editOrganisationSuccessAction,
         editOrganisationError as editOrganisationErrorAction } from "../actions";
import { getAllSaga, getOrganisationSaga, patchOrganisationSaga } from "../sagas";
import { authSelector } from "../selectors";
import { UserType } from "../types";

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
}

const testOrg2: Organisation = { ...testOrg1, email: "thomas.jefferson@ofqual.gov.uk" }

const dummyApi = {
  search: async () => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const response: PagedResponse<Organisation> = {
      data: [testOrg1],
      count: 1,
      page: 0,
      pageSize: 25
    }

    return response;
  },

  getOrganisationByItemId: async (itemId: number) => {
    if(itemId === 132){
      return testOrg1
    } else {
      return null
    }
  },

  patchOrganisationByItemId: async (itemId: number, patchDoc: JSONPatchDocument): Promise<ValidatedResponse<Organisation>> => {
    if(itemId === 132 && patchDoc.length > 0){
      return { data: testOrg2, isValid: true }
    } else {
      throw Error("Server Error!")
    }
  }
};

describe("Organisations Saga", () => {
    beforeEach(() => {
      sinon.restore();
    });

    describe("Search", () => {
        it("loads the request on success",  async () => {
            const response: PagedResponse<Organisation> = {
                data: [testOrg1],
                count: 1,
                page: 0,
                pageSize: 25
            }

            const stub = sinon.stub(
              OrgsService.prototype,
              "search"
            );

            stub.callsFake(async () => await dummyApi.search());

            const inputState = {
              auth: {
                user: {
                  upn: "string",
                  displayName: "string",
                  token: "string",
                  roles: [],
                  userType: UserType.Ofqual,
                  org: {
                    id: 1,
                    name: "string"
                  }
                }
              }
            }

            const inputAction = loadingOrganisationListAction({});

            const dispatched: any[] = []

            const expectedAction = loadedOrganisationListAction(response)

            await runSaga(
                {
                  dispatch: (action) => dispatched.push(action),
                  getState: () => inputState,
                },
                getAllSaga,
                inputAction
              ).toPromise();

            expect(dispatched.length).toBe(1);
            expect(dispatched[0]).toEqual(expectedAction);
        })

        it("reports an error when the API fails", async () => {
            const inputState = {
              auth: {
                user: {
                  upn: "string",
                  displayName: "string",
                  token: "string",
                  roles: [],
                  userType: UserType.Ofqual,
                  org: {
                    id: 1,
                    name: "string"
                  }
                }
              }
            }

            const inputAction = loadingOrganisationListAction({});

            const dispatched: any[] = []

            const testErr = new Error("TEST")

            const expectedAction = loadingOrganisationListErrorAction(testErr)

            const stub = sinon.stub(
              OrgsService.prototype,
              "search"
            );

            stub.callsFake(() => {
                return Promise.reject(new Error("TEST"));
            });

            await runSaga(
                {
                  dispatch: (action) => dispatched.push(action),
                  getState: () => inputState,
                },
                getAllSaga,
                inputAction
              ).toPromise();

            expect(dispatched.length).toBe(1);
            expect(dispatched[0]).toEqual(expectedAction);
        })
    })

    describe("Get Org", () => {
      it("loads the request on success",  async () => {
          const response: Organisation = testOrg1

          const stub = sinon.stub(
            OrgsService.prototype,
            "getOrganisationByItemId"
          );

          stub.callsFake(async () => await dummyApi.getOrganisationByItemId(132));

          const inputState = {
            auth: {
              user: {
                upn: "string",
                displayName: "string",
                token: "string",
                roles: [],
                userType: UserType.Ofqual,
                org: {
                  id: 1,
                  name: "string"
                }
              }
            }
          }

          const inputAction = loadingOrganisationAction("1");

          const dispatched: any[] = []

          const expectedAction = loadedOrganisationAction(response)

          await runSaga(
              {
                dispatch: (action) => dispatched.push(action),
                getState: () => inputState,
              },
              getOrganisationSaga,
              inputAction
            ).toPromise();

          expect(dispatched.length).toBe(1);
          expect(dispatched[0]).toEqual(expectedAction);
      })

      it("reports an error when the API fails", async () => {
          const inputState = {
            auth: {
              user: {
                upn: "string",
                displayName: "string",
                token: "string",
                roles: [],
                userType: UserType.Ofqual,
                org: {
                  id: 1,
                  name: "string"
                }
              }
            }
          }

          const inputAction = loadingOrganisationAction("132");

          const dispatched: any[] = []

          const testErr = new Error("TEST")

          const expectedAction = loadingOrganisationErrorAction(testErr)

          const stub = sinon.stub(
            OrgsService.prototype,
            "getOrganisationByItemId"
          );

          stub.callsFake(() => {
              return Promise.reject(new Error("TEST"));
          });

          await runSaga(
              {
                dispatch: (action) => dispatched.push(action),
                getState: () => inputState,
              },
              getOrganisationSaga,
              inputAction
            ).toPromise();

          expect(dispatched.length).toBe(1);
          expect(dispatched[0]).toEqual(expectedAction);
      })

      describe("Patch Org", () => {
        it("loads the new request on success if patchDoc provided",  async () => {
          const response: Organisation = testOrg2
          const patchDoc: JSONPatchDocument = [
            {
              "op": "replace",
              "path": "/email",
              "value": "thomas.jefferson@ofqual.gov.uk"
            }
          ]

          const stub = sinon.stub(
            OrgsService.prototype,
            "patchOrganisationByItemId"
          );

          stub.callsFake(async () => await dummyApi.patchOrganisationByItemId(132, patchDoc));

            const inputState = {
              auth: {
                user: {
                  upn: "string",
                  displayName: "string",
                  token: "string",
                  roles: [],
                  userType: UserType.Ofqual,
                  org: testOrg1
                }
              },
              organisation: {
                org: testOrg1
              }
            }

            const inputAction = editOrganisationAction(132, patchDoc);

            const dispatched: any[] = []

            const expectedAction = editOrganisationSuccessAction(response)

            await runSaga(
                {
                  dispatch: (action) => dispatched.push(action),
                  getState: () => inputState,
                },
                patchOrganisationSaga,
                inputAction
              ).toPromise();

            expect(dispatched.length).toBe(1);
            expect(dispatched[0]).toEqual(expectedAction);
        })

        it("loads the current org if patchDoc is empty",  async () => {
          const response: Organisation = testOrg1;
          const patchDoc: JSONPatchDocument = []

          const stub = sinon.stub(
            OrgsService.prototype,
            "patchOrganisationByItemId"
          );

          stub.callsFake(async () => await dummyApi.patchOrganisationByItemId(132, patchDoc));

            const inputState = {
              auth: {
                user: {
                  upn: "string",
                  displayName: "string",
                  token: "string",
                  roles: [],
                  userType: UserType.Ofqual,
                  org: testOrg1
                }
              },
              organisations: {
                organisation: {
                  org: testOrg1
                }
              }
            }

            const inputAction = editOrganisationAction(132, patchDoc);

            const dispatched: any[] = []

            const expectedAction = editOrganisationSuccessAction(response)

            await runSaga(
                {
                  dispatch: (action) => dispatched.push(action),
                  getState: () => inputState,
                },
                patchOrganisationSaga,
                inputAction
              ).toPromise();

            expect(dispatched.length).toBe(1);
            expect(dispatched[0]).toEqual(expectedAction);
        })

        it("reports an error when the API fails", async () => {
            const patchDoc: JSONPatchDocument = [
              {
                "op": "replace",
                "path": "/email",
                "value": "thomas.jefferson@ofqual.gov.uk"
              }
            ]
            const inputState = {
              auth: {
                user: {
                  upn: "string",
                  displayName: "string",
                  token: "string",
                  roles: [],
                  userType: UserType.Ofqual,
                  org: testOrg1
                }
              },
              organisation: {
                org: testOrg1
              }
            }

            const inputAction = editOrganisationAction(132, patchDoc);

            const dispatched: any[] = []

            const testErr = new Error("TEST")

            const expectedAction = editOrganisationErrorAction(testErr)

            const stub = sinon.stub(
              OrgsService.prototype,
              "patchOrganisationByItemId"
            );

            stub.callsFake(() => {
                return Promise.reject(new Error("TEST"));
            });

            await runSaga(
                {
                  dispatch: (action) => dispatched.push(action),
                  getState: () => inputState,
                },
                patchOrganisationSaga,
                inputAction
              ).toPromise();

            expect(dispatched.length).toBe(1);
            expect(dispatched[0]).toEqual(expectedAction);
        })
      })
      // Q: Do we need a test for 404s?
    })
});