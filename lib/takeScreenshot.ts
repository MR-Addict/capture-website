import puppeteer from "puppeteer";

import { OptionsType } from "../types";

export default async function takeScreenshot(url: string, options: OptionsType) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  page.setDefaultTimeout(options.timeout * 1000);
  await page.setViewport({ width: options.width, height: options.height });
  await page.setBypassCSP(true);
  await page.setJavaScriptEnabled(true);

  if (options.disableAnimations) {
    await page.addStyleTag({
      content: "*,::before,::after{animation:initial !important;transition:initial !important;}",
    });
  }

  try {
    await page.goto(url, { waitUntil: "networkidle2" });
    await page.waitForTimeout(options.delay * 1000);
    const base64 = await page.screenshot({ type: options.type, fullPage: options.fullPage, encoding: "base64" });
    if (browser !== null) await browser.close();
    return `data:image/${options.type};base64,${base64}`;
  } catch (error) {
    console.error(error);
    if (browser !== null) await browser.close();
    return;
  }
}
