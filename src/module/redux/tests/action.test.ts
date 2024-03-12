import { PagedResponse } from "@ofqual/portal-core/core/types";
import { Organisation } from "../../services/domain/Organisation";
import { clearErrorOrganisationList, loadedOrganisationList, loadingOrganisationList, loadingOrganisationListError, clearErrorOrganisation, loadedOrganisation, loadingOrganisation, loadingOrganisationError, editOrganisation, editOrganisationSuccess, editOrganisationError } from "../actions";
import { CLEAR_ERROR_ORGANISATION_LIST, LOADED_ORGANISATION_LIST, LOADING_ORGANISATION_LIST, LOADING_ORGANISATION_LIST_ERROR, CLEAR_ERROR_ORGANISATION, LOADED_ORGANISATION, LOADING_ORGANISATION, LOADING_ORGANISATION_ERROR, EDIT_ORGANISATION, EDIT_ORGANISATION_SUCCESS, EDIT_ORGANISATION_ERROR } from "../constants";

export const OrganisationEmpty: Organisation = {
    id: "",
    itemId: -1,
    accreditation: false,
    acronym: "",
    createdByDisplayName: "",
    createdByUpn: "",
    modifiedByDisplayName: "",
    modifiedByUpn: "",
    assignedToDisplayName: "",
    assignedToUpn: "",
    email: "",
    legalName: "",
    listOfStandardFeesUrl: "",
    companyNumber: "",
    name: "",
    recognitionNumber: "",
    website: "",
    line1: "",
    line2: "",
    line3: "",
    line4: "",
    postCode: "",
    country: "",
    phoneNumber: "",
    hasCharityNumber: false,
    hasCompanyNumber: true,
    isOtherUkLegalEntity: false,
    isIndividualOrPartnership: false,    
    isRegisteredInOtherCountry: false,
    createdDate: new Date(),
    modifiedDate: new Date(),
    organisationChanges: []
}

describe('Actions', () => {
    describe('OrganisationsList Actions', () => {
        describe('Clearing errors', () => {
            it('has a type of CLEAR_ERROR_ORGANISATION_LIST', () => {
                const expected = {
                    type: CLEAR_ERROR_ORGANISATION_LIST
                }
                expect(clearErrorOrganisationList().type).toEqual(expected.type)
            })
        })
        describe('Loading org list', () => {
            it('has a type of LOADING_ORGANISATION_LIST', () => {
                const expected = {
                    type: LOADING_ORGANISATION_LIST,
                };
                expect(loadingOrganisationList({}).type).toEqual(expected.type);
            });

            it('dispatches a QueryParams object in the payload', () => {
                const expectedPayload = { testKey: "testValue" };
                expect(loadingOrganisationList({ testKey: "testValue" }).payload).toEqual(expectedPayload);
            });
        });

        
        describe('Loaded org list', () => {
            let testValue: PagedResponse<Organisation> = {
                data: [],
                count: 0,
                page: 0,
                pageSize: 0
            }

            it('has a type of LOADED_ORGANISATION_LIST', () => {
                const expected = {
                    type: LOADED_ORGANISATION_LIST,
                };
                expect(loadedOrganisationList(testValue).type).toEqual(expected.type);
            });
            
            it('dispatches a PagedResponse<Organisation> object in the payload', () => {
                const expectedPayload = {
                    data: [],
                    count: 0,
                    page: 0,
                    pageSize: 0
                };
                expect(loadedOrganisationList(testValue).payload).toEqual(expectedPayload);
            });
        });

        describe('Loaded org list error', () => {
            let testValue: Error = new Error("test")

            it('has a type of LOADING_ORGANISATION_LIST_ERROR', () => {
                const expected = {
                    type: LOADING_ORGANISATION_LIST_ERROR,
                };
                expect(loadingOrganisationListError(testValue).type).toEqual(expected.type);
            });
            
            it('dispatches an Error object in the payload', () => {
                const expectedPayload = new Error("test")
                expect(loadingOrganisationListError(testValue).payload).toEqual(expectedPayload);
            });
        });
    })

    describe('Organisation Actions', () => {
        describe('Clearing errors', () => {
            it('has a type of CLEAR_ERROR_ORGANISATION', () => {
                const expected = {
                    type: CLEAR_ERROR_ORGANISATION
                }
                expect(clearErrorOrganisation().type).toEqual(expected.type)
            })
        })
        describe('Loading org', () => {
            it('has a type of LOADING_ORGANISATION', () => {
                const expected = {
                    type: LOADING_ORGANISATION,
                };
                expect(loadingOrganisation("1").type).toEqual(expected.type);
            });

            it('dispatches a number object in the payload', () => {
                const expectedPayload = "1"
                expect(loadingOrganisation("1").payload).toEqual(expectedPayload);
            });
        });

        
        describe('Loaded org', () => {
            const testValue: Organisation = OrganisationEmpty

            it('has a type of LOADED_ORGANISATION', () => {
                const expected = {
                    type: LOADED_ORGANISATION,
                };
                expect(loadedOrganisation(testValue).type).toEqual(expected.type);
            });
            
            it('dispatches a Organisation object in the payload', () => {
                const expectedPayload = testValue
                expect(loadedOrganisation(testValue).payload).toEqual(expectedPayload);
            });
        });

        describe('Loaded org error', () => {
            let testValue: Error = new Error("test")

            it('has a type of LOADING_ORGANISATION', () => {
                const expected = {
                    type: LOADING_ORGANISATION_ERROR,
                };
                expect(loadingOrganisationError(testValue).type).toEqual(expected.type);
            });
            
            it('dispatches an Error object in the payload', () => {
                const expectedPayload = new Error("test")
                expect(loadingOrganisationError(testValue).payload).toEqual(expectedPayload);
            });
        });

        describe('Edit org', () => {
            const currentDate = new Date()
            it('has a type of EDIT_ORGANISATION', () => {
                const expected = {
                    type: EDIT_ORGANISATION,
                };
                expect(editOrganisation(1, []).type).toEqual(expected.type);
            });

            it('dispatches the correct payload', () => {
                const expectedPayload = {
                    itemId: 1,
                    patchDoc: [],
                }
                expect(editOrganisation(1, []).payload).toEqual(expectedPayload);
            });
        });

        
        describe('Edit org success', () => {
            const testValue: Organisation = OrganisationEmpty

            it('has a type of LOADED_ORGANISATION', () => {
                const expected = {
                    type: EDIT_ORGANISATION_SUCCESS,
                };
                expect(editOrganisationSuccess(testValue).type).toEqual(expected.type);
            });
            
            it('dispatches a Organisation object in the payload', () => {
                const expectedPayload = testValue
                expect(editOrganisationSuccess(testValue).payload).toEqual(expectedPayload);
            });
        });

        describe('Edit org error', () => {
            let testValue: Error = new Error("test")

            it('has a type of EDIT_ORGANISATION_ERROR', () => {
                const expected = {
                    type: EDIT_ORGANISATION_ERROR,
                };
                expect(editOrganisationError(testValue).type).toEqual(expected.type);
            });
            
            it('dispatches an Error object in the payload', () => {
                const expectedPayload = new Error("test")
                expect(editOrganisationError(testValue).payload).toEqual(expectedPayload);
            });
        });
    })
})