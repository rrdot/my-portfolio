import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("homepage, case studies, resume and SEO are available", async ({
  page,
  request,
}) => {
  await page.goto("/");
  await expect(page).toHaveTitle("Your Name | Web Developer");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "WebDeveloper.",
  );
  const cases = [
    "sample-online-store",
    "sample-task-dashboard",
    "sample-creative-website",
  ];
  for (const slug of cases) {
    await page.goto(`/projects/${slug}`);
    await expect(
      page.getByRole("heading", { name: "What I worked on" }),
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: "Repository", exact: true }),
    ).toHaveCount(0);
  }
  expect((await request.get("/projects/not-a-project")).status()).toBe(404);
  const resume = await request.get("/resume/sample-resume.pdf");
  expect(resume.ok()).toBeTruthy();
  expect((await resume.body()).subarray(0, 5).toString()).toBe("%PDF-");
  expect((await request.get("/sitemap.xml")).ok()).toBeTruthy();
  expect((await request.get("/robots.txt")).ok()).toBeTruthy();
  expect((await request.get("/opengraph-image")).ok()).toBeTruthy();
});

test("mobile navigation, theme persistence, and responsive layouts", async ({
  page,
}) => {
  for (const width of [360, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBeTruthy();
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Projects" })
    .click();
  await expect(page).toHaveURL(/#projects$/);
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }),
  ).toHaveCount(0);
  await page
    .getByRole("button", { name: "Theme: system. Switch to light" })
    .click();
  await page
    .getByRole("button", { name: "Theme: light. Switch to dark" })
    .click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page
    .getByRole("button", { name: "Theme: dark. Switch to system" })
    .click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "system");
});

test("accessible light, dark, and mobile pages", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  for (const theme of ["light", "dark"]) {
    await page.evaluate((theme) => {
      document.documentElement.dataset.theme = theme;
    }, theme);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  }
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Open navigation" }).click();
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
  await page.goto("/projects/sample-online-store");
  expect(
    (
      await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze()
    ).violations,
  ).toEqual([]);
});

test("contact validates input and handles loading, success and delivery failure", async ({
  page,
  request,
}) => {
  const malformed = await request.post("/api/contact", {
    headers: { Origin: "http://localhost:3000" },
    data: { name: "" },
  });
  expect(malformed.status()).toBe(400);
  const crossOrigin = await request.post("/api/contact", {
    headers: { Origin: "https://untrusted.example" },
    data: {},
  });
  expect(crossOrigin.status()).toBe(403);
  await page.goto("/#contact");
  async function fill() {
    await page
      .getByRole("textbox", { name: "Your name", exact: true })
      .fill("Test visitor");
    await page.getByLabel("Email address").fill("visitor@example.com");
    await page
      .getByLabel("Subject", { exact: true })
      .fill("Engineering opportunity");
    await page
      .getByLabel("Message", { exact: true })
      .fill("A browser test message. No email should be sent.");
  }
  await page.route("**/api/contact", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({
        error:
          "Email delivery is currently unavailable. Please email me directly.",
      }),
    });
  });
  await fill();
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("button", { name: "Sending…" })).toBeDisabled();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Email delivery is currently unavailable",
  );
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        message: "Thanks for reaching out. Your message has been sent.",
      }),
    }),
  );
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("status")).toContainText(
    "Your message has been sent",
  );
  await expect(
    page.getByRole("textbox", { name: "Your name", exact: true }),
  ).toHaveValue("");
});
