import { waitForReact } from "testcafe-react-selectors";
import { BASE_URL } from "../config";
import { getLocation, userSelector } from "../helpers";
import OrganisationPageModel from "../page-models/OrganisationViewDetails";

fixture`Ofqual amend and update details for Orgs`
  .page`${BASE_URL}`.beforeEach(async (t) => {
  await waitForReact();
  await t.navigateTo("/organisations");
  await userSelector("complaints.admin@ofqual.gov.uk");
});

test.skip("can access the organisations details page with details", async (t) => {
    // Arrange/Act
    await t.navigateTo("/organisations/75402");
    await t.expect(getLocation()).contains("/organisations/75402");


    // Sections
    await t.expect(OrganisationPageModel.mainDetailsSection.exists)
    .ok()
    .expect(OrganisationPageModel.ofqualDatesSection.exists)
    .ok()
    .expect(OrganisationPageModel.cceaDatesSection.exists)
    .ok()

    // Headers
    await t.expect(OrganisationPageModel.mainDetailsHeader.exists)
    .ok()
    .expect(OrganisationPageModel.ofqualDatesHeader.exists)
    .ok()
    .expect(OrganisationPageModel.cceaDatesHeader.exists)
    .ok()

    // Main Details
    await t.expect(OrganisationPageModel.organisationsLegalNameField.exists)
    .ok()
    .expect(OrganisationPageModel.organisationsEmailField.exists)
    .ok()
    .expect(OrganisationPageModel.organisationsWebsiteField.exists)
    .ok()
    .expect(OrganisationPageModel.listOfStandardFeesField.exists)
    .ok()
    .expect(OrganisationPageModel.recognitionNumberField.exists)
    .ok()
    .expect(OrganisationPageModel.companyNumberField.exists)
    .ok()

    // Ofqual Dates
    await t.expect(OrganisationPageModel.ofqualRecognisedOnDateField.exists)
    .ok()
    .expect(OrganisationPageModel.ofqualSurrenderedOnDateField.exists)
    .ok()
    .expect(OrganisationPageModel.ofqualWithdrawnOnDateField.exists)
    .ok()

    // CCEA Dates
    await t.expect(OrganisationPageModel.cceaRecognisedOnDateField.exists)
    .ok()
    .expect(OrganisationPageModel.cceaSurrenderedOnDateField.exists)
    .ok()
    .expect(OrganisationPageModel.cceaWithdrawnOnDateField.exists)
    .ok()

    // TODO: Address section
  });

test("can navigate to organisations using breadcrumb link", async (t) => { // breadcrumb borked?
  // Arrange
  await t.navigateTo("/organisations/75402");
  await t.expect(getLocation()).contains("/organisations/75402");

  // Act
  await OrganisationPageModel.clickOrganisationsBreadcrumbLink()

  // Assert
  await t.expect(getLocation()).contains("/organisations");

  
});

test("I can amend website field", async (t) => {
  await t.navigateTo("/organisations/75402");
  
  await t.expect(getLocation()).contains("/organisations/75402");

  await OrganisationPageModel.typeOrganisationsWebsiteField("https://www.gov.uk/government/organisations/ofqual")
  await OrganisationPageModel.clickSaveButton();

  await t.expect(OrganisationPageModel.organisationsWebsiteField.find('input').value).eql("https://www.gov.uk/government/organisations/ofqual");
});

test.skip("I can amend email field", async (t) => { // bug 40707
  await t.navigateTo("/organisations/75402");

  await t.expect(getLocation()).contains("/organisations/75402");

  await OrganisationPageModel.typeOrganisationsEmailField("exampleinbox@exampledomain.com")
  await OrganisationPageModel.clickSaveButton();

  await t.expect(OrganisationPageModel.organisationsEmailField.find('input').value).eql("exampleinbox@exampledomain.com");
});

test("I can amend List of Standard Fees field", async (t) => {
  await t.navigateTo("/organisations/75402");

  await t.expect(getLocation()).contains("/organisations/75402");

  await OrganisationPageModel.typeListOfStandardFeesField("https://www.gov.uk/guidance/awarding-organisations-understanding-our-regulatory-requirements")
  await OrganisationPageModel.clickSaveButton();

  await t.expect(OrganisationPageModel.listOfStandardFeesField.find('input').value).eql("https://www.gov.uk/guidance/awarding-organisations-understanding-our-regulatory-requirements");
});

test("I can amend address for organisation - field 1", async (t) => {
  const testDateTime = new Date();
    const DateTimeTag = `${testDateTime.getTime()}`;

  await t.navigateTo("/organisations/75402");

  await t.expect(getLocation()).contains("/organisations/75402");

  await OrganisationPageModel.typeAddressLine1("Line 1 -" + DateTimeTag);
  await OrganisationPageModel.clickSaveButton();

  await t.expect(OrganisationPageModel.addressLine1.find('input').value).eql("Line 1 -" + DateTimeTag);
  
});

test("I can amend address for organisation - field 2", async (t) => {
  const testDateTime = new Date();
  const DateTimeTag = `${testDateTime.getTime()}`;

  await t.navigateTo("/organisations/75402");

  await t.expect(getLocation()).contains("/organisations/75402");

  await OrganisationPageModel.typeAddressLine2("Line 2 -" + DateTimeTag);
  await OrganisationPageModel.clickSaveButton();

  await t.expect(OrganisationPageModel.addressLine2.find('input').value).eql("Line 2 -" + DateTimeTag); 
});

test("I can amend address for organisation - field 3", async (t) => {
  const testDateTime = new Date();
  const DateTimeTag = `${testDateTime.getTime()}`;

  await t.navigateTo("/organisations/75402");
  
  await t.expect(getLocation()).contains("/organisations/75402");
  
  await OrganisationPageModel.typeAddressLine3("Line 3 -" + DateTimeTag);
  await OrganisationPageModel.clickSaveButton();
  
  await t.expect(OrganisationPageModel.addressLine3.find('input').value).eql("Line 3 -" + DateTimeTag);
});

test("I can amend address for organisation - field 4", async (t) => {
  const testDateTime = new Date();
  const DateTimeTag = `${testDateTime.getTime()}`;

  await t.navigateTo("/organisations/75402");
  
  await t.expect(getLocation()).contains("/organisations/75402");
  
  await OrganisationPageModel.typeAddressLine4("Line 4 -" + DateTimeTag);
  await OrganisationPageModel.clickSaveButton();

  await t.expect(OrganisationPageModel.addressLine4.find('input').value).eql("Line 4 -" + DateTimeTag);
});

test("I can amend address for organisation - post code", async (t) => {
  const testDateTime = new Date();
  const DateTimeTag = `${testDateTime.getTime()}`;
  
  await t.navigateTo("/organisations/75402");

  await t.expect(getLocation()).contains("/organisations/75402");

  
  await OrganisationPageModel.typeAddressPostcode("ED1 7ED");
  await OrganisationPageModel.clickSaveButton();
  await OrganisationPageModel.closeSaveDialog();
  await t.expect(OrganisationPageModel.addressPostcode.find('input').value).eql("ED1 7ED");
  
  // Return to default data
  await OrganisationPageModel.typeAddressPostcode("T3 5TS");
  await OrganisationPageModel.clickSaveButton();
  await OrganisationPageModel.closeSaveDialog();
  await t.expect(OrganisationPageModel.addressPostcode.find('input').value).eql("T3 5TS");
});

test("I can amend address for organisation - country", async (t) => {
  await t.navigateTo("/organisations/75402");

  await t.expect(getLocation()).contains("/organisations/75402");
  await t.expect(OrganisationPageModel.addressCountry.find('input').value).eql("Country");
  
  await OrganisationPageModel.typeAddressCountry("Country - Edited");
  await OrganisationPageModel.clickSaveButton();
  await OrganisationPageModel.closeSaveDialog();

  await t.expect(OrganisationPageModel.addressCountry.find('input').value).eql("Country - Edited");
  
  // Return to default data
  await OrganisationPageModel.typeAddressCountry("Country");
  await OrganisationPageModel.clickSaveButton();
  await OrganisationPageModel.closeSaveDialog();

  await t.expect(OrganisationPageModel.addressCountry.find('input').value).eql("Country");
});

test("I can amend address for organisation - phone number", async (t) => {
  await t.navigateTo("/organisations/75402"); // should have validation to ensure numerals only?
  
  await t.expect(getLocation()).contains("/organisations/75402");
  await t.expect(OrganisationPageModel.addressPhoneNumber.find('input').value).eql("0123456789");
  
  await OrganisationPageModel.typeAddressPhoneNumber("07898 123456");
  await OrganisationPageModel.clickSaveButton();
  await OrganisationPageModel.closeSaveDialog();

  
  await t.expect(OrganisationPageModel.addressPhoneNumber.find('input').value).eql("07898 123456");
  
  // Return to default data
  await OrganisationPageModel.typeAddressPhoneNumber("0123456789");
  await OrganisationPageModel.clickSaveButton();
  await t.expect(OrganisationPageModel.addressPhoneNumber.find('input').value).eql("0123456789");
});

test("I can amend address for organisation - all fields", async (t) => {
  const testDateTime = new Date();
  const DateTimeTag = `${testDateTime.getTime()}`;

  await t.navigateTo("/organisations/75402");

  await t.expect(getLocation()).contains("/organisations/75402");

  await OrganisationPageModel.typeAddressLine1("Line 1 -" + DateTimeTag);
  await OrganisationPageModel.typeAddressLine2("Line 2 -" + DateTimeTag);
  await OrganisationPageModel.typeAddressLine3("Line 3 -" + DateTimeTag);
  await OrganisationPageModel.typeAddressLine4("Line 4 -" + DateTimeTag);
  await OrganisationPageModel.typeAddressPostcode("ED1 7ED");
  await OrganisationPageModel.typeAddressCountry("Country - Edited");
  await OrganisationPageModel.typeAddressPhoneNumber("07898 123456");
  await OrganisationPageModel.clickSaveButton();
  await OrganisationPageModel.closeSaveDialog();


  await t.expect(OrganisationPageModel.addressLine1.find('input').value).eql("Line 1 -" + DateTimeTag);
  await t.expect(OrganisationPageModel.addressLine2.find('input').value).eql("Line 2 -" + DateTimeTag);
  await t.expect(OrganisationPageModel.addressLine3.find('input').value).eql("Line 3 -" + DateTimeTag);
  await t.expect(OrganisationPageModel.addressLine4.find('input').value).eql("Line 4 -" + DateTimeTag);
  await t.expect(OrganisationPageModel.addressPostcode.find('input').value).eql("ED1 7ED");
  await t.expect(OrganisationPageModel.addressCountry.find('input').value).eql("Country - Edited");
  await t.expect(OrganisationPageModel.addressPhoneNumber.find('input').value).eql("07898 123456");
  
  // Return to default data

  await OrganisationPageModel.typeAddressPostcode("T3 5TS");
  await OrganisationPageModel.typeAddressCountry("Country");
  await OrganisationPageModel.typeAddressPhoneNumber("0123456789");
  await OrganisationPageModel.clickSaveButton();
  await OrganisationPageModel.closeSaveDialog();


  await t.expect(OrganisationPageModel.addressPostcode.find('input').value).eql("T3 5TS");
  await t.expect(OrganisationPageModel.addressCountry.find('input').value).eql("Country");
  await t.expect(OrganisationPageModel.addressPhoneNumber.find('input').value).eql("0123456789"); 
});

test("I can navigate to link within url - Website", async (t) => {
  await t.navigateTo("/organisations/75402");

  await t.expect(getLocation()).contains("/organisations/75402");

  await OrganisationPageModel.clickMetadataWebsiteLink();

  await t.expect(getLocation()).contains("https://www.gov.uk/government/organisations/ofqual");
});

test("I can navigate to link within url - list of standard fees", async (t) => {
  await t.navigateTo("/organisations/75402");

  await t.expect(getLocation()).contains("/organisations/75402");

  await OrganisationPageModel.clickMetadataListOfStandardFeesLink();

  await t.expect(getLocation()).contains("https://www.gov.uk/guidance/awarding-organisations-understanding-our-regulatory-requirements");
});