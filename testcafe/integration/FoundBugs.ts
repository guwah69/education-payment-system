import { BASE_URL } from "../config";
import { getLocation, userSelector } from "../helpers";
import OrganisationPageModel from "../page-models/OrganisationViewDetails";
import OrganisationListPageModel from "../page-models/OrganisationList";
import { waitForReact } from "testcafe-react-selectors";


fixture.skip`test of found bugs (listed by VSTS item code)`
  .page`${BASE_URL}`.beforeEach(async (t) => {
  await waitForReact();
  await t.navigateTo("/organisations");
  await userSelector("complaints.admin@ofqual.gov.uk");
});

test("can search for ao by full search term including spaces", async (t) => {
    // Skipped due to BUG #40140 being on hold. This test should be unskipped when resolving this bug - may be fixed?
    const textInput = "0 Media";
    await OrganisationListPageModel.search(textInput);
    await t
      .wait(1500)
      .expect(getLocation())
      .contains(`/organisations?search=${textInput}`)
      .expect(OrganisationListPageModel.orgRow.exists)
      .ok()
      .expect(OrganisationListPageModel.orgRow.count)
      .eql(1);
  });

  test("I can amend email field", async (t) => { // bug 40707
    await t.navigateTo("/organisations/75402");
  
    await t.expect(getLocation()).contains("/organisations/75402");
  
    await OrganisationPageModel.typeOrganisationsEmailField("exampleinbox@exampledomain.com")
    await OrganisationPageModel.clickSaveButton();
  
    await t.expect(OrganisationPageModel.organisationsEmailField.find('input').value).eql("exampleinbox@exampledomain.com");
  });

  test("fields require values as mandatory requirement for value following save", async t =>  { //Bug 40728 (only testing amendable fields currently 09.12.20)
    const testDateTime = new Date();
    const DateTimeTag = `${testDateTime.getTime()}`;
    
    await t.navigateTo("/organisations/75402");
  
    await t.expect(getLocation()).contains("/organisations/75402");

    await OrganisationPageModel.typeOrganisationsWebsiteField("");
    await OrganisationPageModel.typeOrganisationsEmailField("");
    await OrganisationPageModel.typeListOfStandardFeesField("");
    await OrganisationPageModel.typeAddressLine1("");
    await OrganisationPageModel.typeAddressLine4("");
    await OrganisationPageModel.typeAddressPostcode("");
    await OrganisationPageModel.typeAddressCountry("");
    await OrganisationPageModel.typeAddressPhoneNumber("");
    await OrganisationPageModel.clickSaveButton;

    await t.expect(OrganisationPageModel.organisationsWebsiteField.find('input').value).eql("https://www.gov.uk/government/organisations/ofqual");
    await t.expect(OrganisationPageModel.organisationsEmailField.find('input').value).eql("exampleinbox@exampledomain.com");
    await t.expect(OrganisationPageModel.listOfStandardFeesField.find('input').value).eql("https://www.gov.uk/guidance/awarding-organisations-understanding-our-regulatory-requirements");
    await t.expect(OrganisationPageModel.addressLine1.find('input').value).eql("Line 1 -" + DateTimeTag);
    await t.expect(OrganisationPageModel.addressLine4.find('input').value).eql("Line 4 -" + DateTimeTag);
    await t.expect(OrganisationPageModel.addressPostcode.find('input').value).eql("T3 5TS");
    await t.expect(OrganisationPageModel.addressCountry.find('input').value).eql("Country");
    await t.expect(OrganisationPageModel.addressPhoneNumber.find('input').value).eql("0123456789"); 

  });