import { t, Selector, ClientFunction } from "testcafe";

export const REGEX_EMAIL_PATTERN = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/gi;

export const userSelector = async (email: string) => {
  await t.click(Selector(`[name=user]`).parent(0));
  const AdminUser = await Selector("li").withAttribute("data-value", email);

  await t.click(AdminUser);
};

export const muiMenuItemSelect = async (
  menuItemSelector: Selector,
  text?: string
) => {
  if (text) {
    await t.click(menuItemSelector.withText(text));
  } else {
    await t.click(menuItemSelector.nth(0));
  }
};

export const muiMenuItemSelectMultiple = async (
  menuItemSelector: Selector,
  values?: Array<string>
) => {
  if (values && values.length) {
    for (let value of values) {
      await t.click(menuItemSelector.withText(value));
    }
  } else {
    // click the first two menu items
    await t.click(menuItemSelector.nth(0));
    await t.click(menuItemSelector.nth(1));
  }
};

export const getLocation = ClientFunction(() => document.location.href);
