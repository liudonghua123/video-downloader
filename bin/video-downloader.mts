#!/usr/bin/env -S node --no-warnings=ExperimentalWarning

import { Command, Option } from "commander";
import figlet from "figlet";
import package_json from "../package.json" assert {type: "json"};
import { basename, extname, parse, dirname } from "path";
import { fileURLToPath } from 'url';
import { getVideoUrl, downloadVideo } from "../lib/index.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url_regexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

async function main() {
  // Print the banner
  console.log(figlet.textSync("video-downloader"));
  // Parse the command line arguments
  const program = new Command();
  program
    .version(package_json.version)
    .description("Create single executable application (SEA) from entry script")
    .option("-u, --url <url>", "url of webpage for video download", 'http://yhdm4.one/acg/3545/1.html')
    .option("-r, --rule <rule>", "rule for video url, like url.includes('tos-alisg-v-0000') and so on...", "url.endsWith('sd.mp4')")
    .option("-o, --output <file_path>", "video file path to save", "")
    .option("-t, --timeout <timeout>", "timeout for detect video url in milliseconds", '10000')
    .option("-n, --dry-run", "dry run mode")
  program.parse(process.argv);
  const options = program.opts();

  console.info('Usage: download-video -u <url> -r <rule> -o <file_path>');
  // check if the url is valid
  if (!url_regexp.test(options.url)) {
    console.error(`Invalid url of ${options.url}`);
    process.exit(1);
  }
  options.output = options.output || `${parse(options.url).name.replace(/(\d+)/g, (match, p1) => p1.padStart(2, '0'))}.mp4`;
  options.timeout = +options.timeout;
  console.info(`trying to download video from ${options.url}, save to ${options.output} with rule ${options.rule} and timeout ${options.timeout} milliseconds and dry run mode ${options.dryRun}`);

  try {
    const url = await getVideoUrl(options.url, options.rule, options.timeout);
    if (options.dryRun) {
      console.info(`dry run mode, will not download video from ${url}`);
      return;
    }
    if (url) {
      console.info(`trying to download video from ${url}`)
      await downloadVideo(url, options.output);
    }
  }
  catch (e) {
    console.error(e);
  }
}

await main();
