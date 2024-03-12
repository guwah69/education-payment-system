import { Selector, t } from "testcafe";
import { muiMenuItemSelect, muiMenuItemSelectMultiple } from "../helpers";

class OrganisationListPageModel {
  pageFirst = Selector("[data-test=pager-first]");
  pageLast = Selector("[data-test=pager-last]");  
  pageRight = Selector("[data-test=pager-next]");
  pageLeft = Selector("[data-test=pager-prev]");
  pagePageNumber = Selector("[data-test=current-page]");
  orgRow = Selector("[data-test=org-row]");
  pageSizeFilter = Selector("[data-test=page-size-filter]");
  pageSizeMenuItem = Selector("[data-test=menu-item-page-size]");
  orderFilter = Selector("[data-test=org-list-order-filter]");
  orgSearchFilter= Selector("[data-test=org-list-search]").find("input");


  async clickNextPage() {
    await t.click(this.pageRight);
  }
  async clickPreviousPage() {
    await t.click(this.pageLeft);
  }
  async clickFirstPage() {
    await t.click(this.pageFirst);
  }
  async clickLastPage() {
    await t.click(this.pageLast);
  }
  async search(text: string) {
    await t.typeText(this.orgSearchFilter, text);
  }
  async selectPageSize(size: string) {
    await t.click(this.pageSizeFilter);
    await muiMenuItemSelect(this.pageSizeMenuItem, size);
  }

  async filter(filterDataTest: string, value?: string) {
    await t.click(Selector(`[data-test=${filterDataTest}]`));
    await muiMenuItemSelect(
      Selector(`[data-test=menu-${filterDataTest}]`).find("li"),
      value
    );
    await t.pressKey("esc");
  }

  async filterMultiple(filterDataTest: string, values?: Array<string>) {
    await t.click(Selector(`[data-test=${filterDataTest}]`));
    await muiMenuItemSelectMultiple(
      Selector(`[data-test=menu-${filterDataTest}]`).find("li"),
      values
    );
    await t.pressKey("esc");
  }
}

export default new OrganisationListPageModel();
