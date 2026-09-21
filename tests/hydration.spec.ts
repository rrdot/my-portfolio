import { expect, test } from "@playwright/test";

test("hydrates when an extension inserts a script into the head", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    localStorage.setItem("theme", "dark");
    // Match a document-start extension without intercepting the document response,
    // which can change the browser's local-network treatment of the dev server.
    const observer = new MutationObserver(() => {
      if (!document.head) return;
      observer.disconnect();
      const script = document.createElement("script");
      script.src =
        "chrome-extension://lgblnfidahcdcjddiepkckcfdhpknnjh/content/popups-script.js";
      document.head.prepend(script);
    });
    observer.observe(document, { childList: true, subtree: true });
  });
  await page.goto("/");
  await page
    .getByRole("button", { name: "Theme: dark. Switch to system" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "system");
  expect(
    errors.filter((message) =>
      /hydrat|server rendered|server-rendered|didn't match|Minified React error #(418|425)/i.test(
        message,
      ),
    ),
  ).toEqual([]);
});

for (const preference of [
  "system",
  "light",
  "dark",
  "storage-blocked",
] as const) {
  test(`hydrates without warnings with ${preference}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("console", (message) => {
      if (message.type() === "error" || message.type() === "warning") {
        errors.push(message.text());
      }
    });
    page.on("pageerror", (error) => errors.push(error.message));
    await page.addInitScript((value) => {
      if (value === "storage-blocked") {
        Object.defineProperty(window, "localStorage", {
          get() {
            throw new DOMException("Storage is disabled", "SecurityError");
          },
        });
      } else {
        localStorage.setItem("theme", value);
      }
    }, preference);

    const theme = preference === "storage-blocked" ? "system" : preference;
    const next =
      theme === "system" ? "light" : theme === "light" ? "dark" : "system";
    for (const path of ["/", "/projects/sample-online-store"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
      // Clicking proves the client event handlers have hydrated, including when
      // the initial server label happens to match the stored preference.
      await page
        .getByRole("button", { name: `Theme: ${theme}. Switch to ${next}` })
        .click();
      await expect(page.locator("html")).toHaveAttribute("data-theme", next);
      expect(
        errors.filter((message) =>
          /hydrat|server rendered|server-rendered|didn't match|Minified React error #(418|425)/i.test(
            message,
          ),
        ),
      ).toEqual([]);
      if (preference !== "storage-blocked") {
        await page.evaluate(
          (value) => localStorage.setItem("theme", value),
          theme,
        );
      }
    }
  });
}
