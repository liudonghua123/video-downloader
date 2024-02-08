# video-downloader

It's a simple tool which download video from some source like yhdm.

## How to use it

### Use it as a tool

1. `npm i -g @liudonghua123/video-downloader`
2. `video-downloader -h`
3. `video-downloader -u /url/to/the/video -u /rule/of/video/url -o /path/to/video/file/to/save`

### Use it as a libary

1. `npm i -S @liudonghua123/video-downloader`
2. `import { getVideoUrl, downloadVideo } from "@liudonghua123/video-downloader";`
3. invoke [`getVideoUrl`](https://github.com/liudonghua123/video-downloader/blob/main/lib/index.mts) function just like [`video-downloader.mts`](https://github.com/liudonghua123/video-downloader/blob/main/bin/video-downloader.mts).

## ToDos

- [ ] add config.yaml file for arguments replacement
- [ ] add more source of video supporting
- [ ] add more features ...

## License

MIT License

Copyright (c) 2024 liudonghua.
