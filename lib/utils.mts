import { writeFile } from 'fs/promises';
import ora from 'ora';
import prettyBytes from 'pretty-bytes';

export async function downloadVideo(url: string, save_path: string) {
  try {
    const download_spinner = ora(`[ 0.00%] Downloading video ...`).start();
    let response = await fetch(url);
    if (!response.body) {
      console.log('No response body');
      return;
    }
    const reader = response.body.getReader();
    const content_length = +(response.headers.get('Content-Length') ?? 0);
    let received_length = 0;
    let chunks = [];
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }
      chunks.push(value);
      received_length += value.length;
      download_spinner.text = `[${(received_length / content_length * 100).toFixed(2)}%] Downloading video with size ${prettyBytes(content_length)} ...`;
    }
    download_spinner.succeed(`[100.00%] Download video completed with size ${prettyBytes(content_length)}!`);
    let chunksAll = new Uint8Array(received_length); // (4.1)
    let position = 0;
    for (let chunk of chunks) {
      chunksAll.set(chunk, position); // (4.2)
      position += chunk.length;
    }
    await writeFile(save_path, chunksAll);
  }
  catch (e) {
    console.error(e);
  }
}