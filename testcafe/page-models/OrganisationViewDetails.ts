import { Selector, t} from "testcafe";

class OrganisationPageModel {
    title = Selector("[data-test=secondary-app-bar-title]");

    mainDetailsSection = Selector("[data-test=organisation-details-main-section]");
    ofqualDatesSection = Selector("[data-test=organisation-details-ofqual-section]");
    cceaDatesSection = Selector("[data-test=organisation-details-ccea-section]");
    addressSection = Selector("[data-test=organisation-details-address-section]")

    mainDetailsHeader = Selector("[data-test=organisation-details-main-header]");
    ofqualDatesHeader = Selector("[data-test=organisation-details-ofqual-header]");
    cceaDatesHeader = Selector("[data-test=organisation-details-ccea-header]");
    addressHeader = Selector("[data-test=organisation-details-address-header]")

    organisationsBreadcrumbLink = Selector("[data-test=secondary-app-bar-title]").find("a").withText("Organisations");
    organisationsLegalNameField = Selector("[data-test=organisation-details-main-legalName]");
    organisationsEmailField = Selector("[data-test=organisation-details-main-email]");
    organisationsWebsiteField = Selector("[data-test=organisation-details-main-website]");
    listOfStandardFeesField = Selector("[data-test=organisation-details-main-listOfStandardFeesUrl]");
    recognitionNumberField = Selector("[data-test=organisation-details-main-recognitionNumber]");
    companyNumberField = Selector("[data-test=organisation-details-main-companyNumber]");
    metadataEmailLink = Selector("[data-test=metadata-email");
    metadataWebsiteLink = Selector("[data-test=metadata-website");
    metadataListOfStandardFeesLink = Selector("[data-test=metadata-listOfStandardFees");
    saveButton = Selector("[data-test=save-button]");
    saveDialogClose = Selector("[data-test=close-save-button]")

    ofqualRecognisedOnDateField = Selector("[data-test=organisation-details-ofqual-ofqualRecognisedOnDate]");
    ofqualSurrenderedOnDateField = Selector("[data-test=organisation-details-ofqual-ofqualSurrenderedOnDate]");
    ofqualWithdrawnOnDateField = Selector("[data-test=organisation-details-ofqual-ofqualWithdrawnOnDate]");
    
    cceaRecognisedOnDateField = Selector("[data-test=organisation-details-ccea-cceaRecognisedOnDate]");
    cceaSurrenderedOnDateField = Selector("[data-test=organisation-details-ccea-cceaSurrenderedOnDate]");
    cceaWithdrawnOnDateField = Selector("[data-test=organisation-details-ccea-cceaWithdrawnOnDate]");

    addressLine1 = Selector("[data-test=organisation-details-address-line1]")
    addressLine2 = Selector("[data-test=organisation-details-address-line2]")
    addressLine3 = Selector("[data-test=organisation-details-address-line3]")
    addressLine4 = Selector("[data-test=organisation-details-address-line4]")
    addressPostcode = Selector("[data-test=organisation-details-address-postcode]")
    addressCountry = Selector("[data-test=organisation-details-address-country]")
    addressPhoneNumber = Selector("[data-test=organisation-details-address-phoneNumber]")

    async clickOrganisationsBreadcrumbLink() {
        await t.click(this.organisationsBreadcrumbLink);
    }
    async typeOrganisationsWebsiteField(description: string) {
        await t.typeText(this.organisationsWebsiteField, description, {replace:true});
    }
    async typeOrganisationsEmailField(description: string) {
        await t.typeText(this.organisationsEmailField, description, {replace:true});
    }
    async typeListOfStandardFeesField(description: string) {
        await t.typeText(this.listOfStandardFeesField, description, {replace:true});
    }
    async typeAddressLine1(description: string) {
        await t.typeText(this.addressLine1, description, {replace:true});
    }
    async typeAddressLine2(description: string) {
        await t.typeText(this.addressLine2, description, {replace:true});
    }
    async typeAddressLine3(description: string) {
        await t.typeText(this.addressLine3, description, {replace:true});
    }
    async typeAddressLine4(description: string) {
        await t.typeText(this.addressLine4, description, {replace:true});
    }
    async typeAddressPostcode(description: string) {
        await t.typeText(this.addressPostcode, description, {replace:true});
    }
    async typeAddressCountry(description: string) {
        await t.typeText(this.addressCountry, description, {replace:true});
    }
    async typeAddressPhoneNumber(description: string) {
        await t.typeText(this.addressPhoneNumber, description, {replace:true});
    }
    async clickSaveButton() {
        await t.click(this.saveButton);
    }
    async closeSaveDialog() {
      await t.click(this.saveDialogClose);
    }
    async clickMetadataEmailLink() {
        await t.click(this.metadataEmailLink);
    }
    async clickMetadataWebsiteLink() {
        await t.click(this.metadataWebsiteLink);
    }
    async clickMetadataListOfStandardFeesLink() {
        await t.click(this.metadataListOfStandardFeesLink);
    }
}

export default new OrganisationPageModel();