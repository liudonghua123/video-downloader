
import { launch } from 'puppeteer-core';

export { downloadVideo } from './utils.mjs';

export async function getVideoUrl(web_url: string, rule: string, timeout: number = 10000): Promise<string> {
  const browser = await launch({
    executablePath: `C:/Program Files/Google/Chrome/Application/chrome.exe`,
    headless: true,
  });
  const page = await browser.newPage();
  return new Promise((resolve, reject) => {
    try {
      // return fail after some seconds
      const timeoutID = setTimeout(() => {
        console.info(`Could not find video in ${timeout} milliseconds`);
        reject(`Video not found`);
      }, timeout);
      page.on('response', async (response) => {
        const request = response.request();
        const url = request.url();
        if (response.ok()) {
          if (eval(rule)) {
            browser.close();
            clearTimeout(timeoutID);
            resolve(url);
          }
        }
      })
      page.goto(web_url, { timeout: 0, waitUntil: 'domcontentloaded' });
    } catch (error) {
      reject(error);
    }
  });
}