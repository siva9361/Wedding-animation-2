import assert from "node:assert/strict";
import { mkdir, readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

// Uses an installed Playwright without adding a production dependency.
const modulePath = process.env.PLAYWRIGHT_MODULE;
const { chromium } = await import(modulePath ? pathToFileURL(modulePath).href : "playwright");
const browser = await chromium.launch({ headless: true });
const baseUrl = process.env.PREVIEW_URL ?? "http://localhost:3000";
const output = "output/qa";
await mkdir(output, { recursive: true });
const errors = [];
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, permissions: ["clipboard-read", "clipboard-write"] });
const page = await context.newPage();
page.setDefaultTimeout(15000);
page.on("pageerror", (error) => errors.push(error.message));

try {
  console.log("Checking desktop entrance and personalized invitation...");
  const response = await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  assert.equal(response.status(), 200);
  await page.getByRole("heading", { name: "You’re invited", exact: true }).waitFor();
  await page.locator(".lamp__photo").first().evaluate((image) => image.decode());
  assert.equal(await page.locator(".gate .thoranam").count(), 0, "No leaves on the opening doors");
  assert.equal(await page.getByText("Your lovely name", { exact: false }).count(), 0);
  await page.screenshot({ path: `${output}/entrance-desktop.png` });
  const nameInput = page.getByLabel("Enter your name", { exact: true });
  assert.equal(await nameInput.inputValue(), "");
  await nameInput.fill("Meena");
  await page.getByRole("heading", { name: "Welcome, Meena", exact: true }).waitFor();
  await page.waitForTimeout(600);
  assert.equal(await page.getByRole("dialog").getAttribute("data-state"), "closed", "Typing alone does not open doors");
  await nameInput.fill("   ");
  assert.equal(await page.getByRole("button", { name: "Open invitation", exact: true }).isDisabled(), true);
  await nameInput.fill(" Siva ");
  await nameInput.focus();
  await page.keyboard.press("Shift+Tab");
  assert.equal(await page.evaluate(() => document.activeElement?.type), "submit");
  await page.keyboard.press("Tab");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "guest-name");
  await nameInput.press("Enter");
  await page.locator(".gate__opening-welcome").getByText("Welcome, Siva", { exact: true }).waitFor();
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `${output}/doors-opening.png` });
  await page.getByRole("dialog").waitFor({ state: "detached", timeout: 6000 });
  assert.equal(new URL(page.url()).searchParams.get("guest"), "Siva");
  assert.equal(await page.evaluate(() => document.activeElement?.id), "invitation-title");
  assert.equal(await page.locator("main").evaluate((main) => main.inert), false);
  await page.getByRole("button", { name: "Copy invitation link for Siva" }).click();
  assert.equal(new URL(await page.evaluate(() => navigator.clipboard.readText())).searchParams.get("guest"), "Siva");
  await page.screenshot({ path: `${output}/invitation-desktop.png` });
  assert.equal(await page.getByText("Sample couple photo", { exact: true }).count(), 0);
  assert.equal(await page.locator(".portrait-frame img").getAttribute("src"), "/images/couple.webp");
  assert.equal(await page.getByText("வான்மதி", { exact: false }).count() > 0, true);
  await page.locator(".hero__thoranam .thoranam__leaf img").first().evaluate((image) => image.decode());

  await page.locator(".portrait-section").scrollIntoViewIfNeeded();
  await page.locator(".portrait-frame img").evaluate((image) => image.decode());
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${output}/couple-portrait.png` });
  assert.equal(await page.getByText("Add your couple photo", { exact: false }).count(), 0);
  assert.equal(await page.getByText("கீழே காண்க", { exact: true }).count(), 0);
  assert.equal(await page.locator('input[type="file"]').count(), 0);
  await page.locator(".events").scrollIntoViewIfNeeded();
  await page.getByText("வடக்குபாளையம், கரூர்", { exact: true }).waitFor();
  const receptionMap = page.locator(".event").nth(1).getByRole("link", { name: /Directions/ });
  assert.equal(new URL(await receptionMap.getAttribute("href")).searchParams.get("query"), "M.S. Thirumana Mandapam Vadakkupalayam Karur");
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `${output}/corrected-venues.png` });
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: /Save the Date/ }).click();
  const calendarDownload = await downloadPromise;
  assert.equal(calendarDownload.suggestedFilename(), "suresh-vaanmathi-wedding.ics");
  await calendarDownload.saveAs(`${output}/wedding.ics`);
  const calendar = await readFile(`${output}/wedding.ics`, "utf8");
  assert.ok(calendar.includes("DTSTART;VALUE=DATE:20261115"));
  assert.ok(calendar.includes("DTEND;VALUE=DATE:20261116"));
  assert.ok(calendar.includes("Suresh & Vaanmathi"));
  await revealFullPage();
  await page.screenshot({ path: `${output}/invitation-desktop-full.png`, fullPage: true });

  for (const viewport of [{ width: 390, height: 844 }, { width: 320, height: 568 }, { width: 768, height: 1024 }, { width: 812, height: 375 }]) {
    console.log(`Checking mobile layout at ${viewport.width}px...`);
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}/?guest=Siva`, { waitUntil: "networkidle" });
    await page.getByRole("heading", { name: "Welcome, Siva", exact: true }).waitFor();
    await page.waitForTimeout(1500);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "No horizontal overflow at the entrance");
    const bounds = await page.getByRole("button", { name: "Open invitation", exact: true }).boundingBox();
    assert.ok(bounds.y >= 0 && bounds.y + bounds.height <= viewport.height, "Entrance button fits on mobile");
    const cardBounds = await page.locator(".gate__content").boundingBox();
    assert.ok(Math.abs(cardBounds.x + cardBounds.width / 2 - viewport.width / 2) < 2, "Card is horizontally centered");
    if (cardBounds.height + 56 < viewport.height) assert.ok(Math.abs(cardBounds.y + cardBounds.height / 2 - viewport.height / 2) < 2, "Card is vertically centered");
    await page.screenshot({ path: `${output}/entrance-${viewport.width}.png` });
    await page.getByLabel("Enter your name", { exact: true }).press("Enter");
    await page.getByRole("dialog").waitFor({ state: "detached", timeout: 6000 });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, "No horizontal overflow in invitation");
    await page.screenshot({ path: `${output}/invitation-${viewport.width}.png` });
    if (viewport.width === 390) {
      await revealFullPage();
      await page.screenshot({ path: `${output}/invitation-mobile-full.png`, fullPage: true });
    }
  }

  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "You’re invited", exact: true }).waitFor();
  await page.getByLabel("Enter your name", { exact: true }).fill("A very long guest name with family and friends here");
  await page.getByRole("button", { name: "Open invitation", exact: true }).scrollIntoViewIfNeeded();
  assert.equal(await page.getByRole("button", { name: "Open invitation", exact: true }).isVisible(), true, "Long guest names keep the entrance usable");
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);

  console.log("Checking Tamil names and reduced motion...");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(`${baseUrl}/?guest=${encodeURIComponent("சிவா")}`, { waitUntil: "networkidle" });
  await page.getByRole("heading", { name: "Welcome, சிவா", exact: true }).waitFor();
  await page.getByLabel("Enter your name", { exact: true }).press("Enter");
  await page.getByRole("dialog").waitFor({ state: "detached", timeout: 2000 });
  assert.equal(await page.locator(".lamp__fire").first().evaluate((flame) => getComputedStyle(flame).animationName), "none");
  assert.equal(await page.locator(".hero__thoranam .thoranam__leaf-motion").first().evaluate((leaf) => getComputedStyle(leaf).animationName), "none");
  assert.deepEqual(errors, [], "No browser runtime errors");
  console.log("PASS: empty name entry, Enter-to-open without auto-opening while typing, centered compact card, no entrance leaves or old label, supplied couple photo, corrected names and addresses, map link, all-day calendar, desktop/mobile/tablet/landscape layouts, Tamil names, reduced motion, and browser runtime checks. Screenshots saved to output/qa.");
} finally {
  await browser.close();
}

async function revealFullPage() {
  for (let scrollY = 0; scrollY < await page.evaluate(() => document.documentElement.scrollHeight); scrollY += 500) {
    await page.evaluate((position) => window.scrollTo(0, position), scrollY);
    await page.waitForTimeout(120);
  }
  await page.waitForTimeout(1200);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(200);
}
