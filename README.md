# HTML video samples
Videos samples to test in browsers.

## Available at
https://dhiogoboza.github.io/html-video-samples/

## Browsers support

| Video  | Chrome | Firefox |
| ------------- | :---: | :---: |
| [ClearKey > EME > MP4 Fragmented](https://dhiogoboza.github.io/html-video-samples/clearkey/eme/mp4_fragmented.html) | ❌ | ❌ |
| [ClearKey > EME > MP4 Fragmented 2](https://dhiogoboza.github.io/html-video-samples/clearkey/eme/mp4_fragmented_2.html) | ❌ | ❌ |
| [ClearKey > EME > MP4 non Fragmented](https://dhiogoboza.github.io/html-video-samples/clearkey/eme/mp4_non_fragmented.html) |❌ | ❌ |
| [ClearKey > EME > WEBM](https://dhiogoboza.github.io/html-video-samples/clearkey/eme/webm.html) | ✔️ | ❌ |
| [ClearKey > MSE > TOF4K (mpd, dash.js)](https://dhiogoboza.github.io/html-video-samples/clearkey/mse/tof4k_dashjs.html) | ✔️ | ✔️ |
| [ClearKey > MSE > BBB Dash CENC (mpd, dash.js)](https://dhiogoboza.github.io/html-video-samples/clearkey/mse/bbb_cenc_dashjs.html) | ✔️ | ✔️ |
| [ClearKey > MSE > BBB Dash CENC (mpd, Shaka Player)](https://dhiogoboza.github.io/html-video-samples/clearkey/mse/bbb_cenc_shaka.html) | ✔️ | ✔️ |
| [ClearKey > MSE > BBB Dash CENC (mpd, Shaka Player)](https://dhiogoboza.github.io/html-video-samples/clearkey/mse/bbb_cenc_shaka.html) | ✔️ | ✔️ |
| [ClearKey > MSE > BBB Dash CBCS (mpd, Shaka Player)](https://dhiogoboza.github.io/html-video-samples/clearkey/mse/bbb_cbcs_shaka.html) | ✔️ | ❌ |
| [Non encrypted > Dash mpd in video src](https://dhiogoboza.github.io/html-video-samples/plain/mpd_native.html) | ❌ | ❌ |
| [Non encrypted > HLS m3u8 in video src](https://dhiogoboza.github.io/html-video-samples/plain/m3u8_native.html) | ❌ | ❌ |

## Medias
- [Big Buck Bunny Clearkey CENC](video/big-buck-bunny-clearkey-cenc/README.md)
- [Big Buck Bunny Clearkey CENC No PSSH Box](video/big-buck-bunny-clearkey-cenc-no-psshbox/README.md)
- [Big Buck Bunny Clearkey CBCS](video/big-buck-bunny-clearkey-cbcs/README.md)

## Bugs found in browsers with this tests
- https://bugzilla.mozilla.org/show_bug.cgi?id=1644879

## References sources
- https://github.com/samdutton/simpl
- https://github.com/cpearce/eme-in-non-fragmented-mp4
- https://www.bok.net/svn/Bento4/trunk/Documents/Websites/www.bok.net/dash/players/html5/shaka-player/index.html
