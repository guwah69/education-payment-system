import { BASE_URL } from "../config";
import { userSelector, getLocation } from "../helpers";
import OrganisationListPageModel from "../page-models/OrganisationList";
import { waitForReact } from "testcafe-react-selectors";

fixture`Ofqual standard org search and filter for organisations`
  .page`${BASE_URL}`.beforeEach(async (t) => {
  await waitForReact();
  await t.navigateTo("/organisations");
  await userSelector("complaints.admin@ofqual.gov.uk");
});

test("can access the organisations page", async (t) => {
  await t.expect(getLocation()).contains("/organisations");
});

test("can view list of orgs with default 25 page size", async (t) => {
  await t
    .expect(OrganisationListPageModel.pageSizeFilter.withText("25").exists)
    .ok()
    .expect(OrganisationListPageModel.orgRow.exists)
    .ok()
    .expect(OrganisationListPageModel.orgRow.count)
    .eql(25);
});

test("can change page size", async (t) => {
  await OrganisationListPageModel.selectPageSize("50");
  await t
    .wait(1500)
    .expect(getLocation())
    .contains("/organisations?pageSize=50")
    .expect(OrganisationListPageModel.pageSizeFilter.withText("50").exists)
    .ok()
    .expect(OrganisationListPageModel.orgRow.exists)
    .ok();
});

test("can navigate to next page", async (t) => {
  await OrganisationListPageModel.clickNextPage();
  await t
    .expect(getLocation())
    .contains("/organisations?page=1")
    .expect(OrganisationListPageModel.pagePageNumber.withText("2").exists)
    .ok()
    .expect(OrganisationListPageModel.orgRow.exists)
    .ok();
});

test("can navigate to first page", async (t) => {
  await OrganisationListPageModel.clickNextPage();
  await t
    .expect(getLocation())
    .contains("/organisations?page=1")
    .expect(OrganisationListPageModel.pagePageNumber.withText("2").exists)
    .ok()
  await OrganisationListPageModel.clickFirstPage();
  await t
    .expect((await getLocation()).endsWith("/organisations"))
    .ok()
    .expect(OrganisationListPageModel.pagePageNumber.withText("1").exists)
    .ok()
    .expect(OrganisationListPageModel.orgRow.exists)
    .ok();
});

test("can navigate to last page", async (t) => {
  await OrganisationListPageModel.clickLastPage();
  await t
    .expect(OrganisationListPageModel.pageRight.withAttribute("disabled").exists)
    .ok()
    .expect(OrganisationListPageModel.orgRow.exists)
    .ok();
});

test("can navigate to previous page", async (t) => {
  await t.navigateTo("/organisations?page=2");
  await OrganisationListPageModel.clickPreviousPage();
  await t
    .expect(getLocation())
    .contains("/organisations?page=1")
    .expect(OrganisationListPageModel.pagePageNumber.withText("2").exists)
    .ok()
    .expect(OrganisationListPageModel.orgRow.exists)
    .ok();
});

test("can page records with no filters applied", async (t) => {
  await t.expect(getLocation()).contains("/organisations");
  await OrganisationListPageModel.clickNextPage();
  await t
    .wait(1500)
    .expect(getLocation())
    .contains("/organisations?page=1");
  await OrganisationListPageModel.clickPreviousPage();
  await t
    .wait(1500)
    .expect(getLocation())
    .contains("/organisations");
});

test("can change order", async (t) => {
  await OrganisationListPageModel.filter("org-list-order-filter", "Legal Name");
  await t
    .wait(1500)
    .expect(getLocation())
    .contains("/organisations?order=legalName");
  await OrganisationListPageModel.filter("org-list-order-filter", undefined);
  await t
    .wait(1500)
    .expect(getLocation())
    .contains("/organisations");
});

test("can search for ao by full search term", async (t) => {
  const textInput = "0123AO";
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

test("can search for user by partial term", async (t) => {
  const textInput = "0123";
  await OrganisationListPageModel.search(textInput);
  await t
    .wait(1500)
    .expect(getLocation())
    .contains(`/organisations?search=${textInput}`)
    .expect(OrganisationListPageModel.orgRow.exists)
    .ok();
});

test.skip("can search for ao by full search term including spaces", async (t) => {
  // Skipped due to BUG #40140 being on hold. This test should be unskipped when resolving this bug - may be fixed?
  const textInput = "0 Media";
  await OrganisationListPageModel.search(textInput);
  await t
    .wait(1500)
    .expect(getLocation())
    .contains(`/organisations?search=${encodeURIComponent(textInput)}`)
    .expect(OrganisationListPageModel.orgRow.exists)
    .ok()
    .expect(OrganisationListPageModel.orgRow.count)
    .eql(1);
});
