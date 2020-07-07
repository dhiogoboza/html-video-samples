# Create dash

## Requirements
- [ffmpeg](https://ffmpeg.org/)
- [bento4](https://www.bento4.com/downloads/)
- [shaka-packager](https://github.com/google/shaka-packager.git)

## Instructions

- Extract bento folder and add `bin` to `PATH`.

### Audio
```
ffmpeg -i source.mp4 -vn -acodec aac -ab 128k audio.mp4
```

### Video
```
ffmpeg -i source.mp4 -an -c:v libx264 -preset veryslow -profile:v high -level 4.2 -b:v 2000k -minrate 2000k -maxrate 2000k -bufsize 4000k -g 96 -keyint_min 96 -sc_threshold 0 -filter:v "scale='trunc(oh*a/2)*2:720'" -pix_fmt yuvj420p video-720p.mp4

ffmpeg -i source.mp4 -an -c:v libx264 -preset veryslow -profile:v high -level 4.2 -b:v 1500k -minrate 1500k -maxrate 1500k -bufsize 3000k -g 96 -keyint_min 96 -sc_threshold 0 -filter:v "scale='trunc(oh*a/2)*2:480'" -pix_fmt yuvj420p video-480p.mp4

ffmpeg -i source.mp4 -an -c:v libx264 -preset veryslow -profile:v high -level 4.2 -b:v 1000k -minrate 1000k -maxrate 1000k -bufsize 2000k -g 96 -keyint_min 96 -sc_threshold 0 -filter:v "scale='trunc(oh*a/2)*2:360'" -pix_fmt yuvj420p video-360p.mp4

ffmpeg -i source.mp4 -an -c:v libx264 -preset veryslow -profile:v high -level 4.2 -b:v 700k -minrate 700k -maxrate 700k -bufsize 1400k -g 96 -keyint_min 96 -sc_threshold 0 -filter:v "scale='trunc(oh*a/2)*2:240'" -pix_fmt yuvj420p video-240p.mp4
```

### Fragment
```
mp4fragment video-720p.mp4 video-720p-fragmented.mp4
mp4fragment video-480p.mp4 video-480p-fragmented.mp4
mp4fragment video-360p.mp4 video-360p-fragmented.mp4
mp4fragment video-240p.mp4 video-240p-fragmented.mp4
mp4fragment audio.mp4 audio-fragmented.mp4
```

### Keys
key: 617D8A125A284DF48E3C6B1866348A3F - YX2KElooTfSOPGsYZjSKPw
KID: B326F895B6A24CC5A4DC70995728059C - syb4lbaiTMWk3HCZVygFnA

```
mp4encrypt --method MPEG-CENC --key 1:617D8A125A284DF48E3C6B1866348A3F:random --property 1:KID:B326F895B6A24CC5A4DC70995728059C  --global-option mpeg-cenc.eme-pssh:true video-240p-fragmented.mp4 video-240p-fragmented-encrypted.mp4
mp4encrypt --method MPEG-CENC --key 1:617D8A125A284DF48E3C6B1866348A3F:random --property 1:KID:B326F895B6A24CC5A4DC70995728059C  --global-option mpeg-cenc.eme-pssh:true video-360p-fragmented.mp4 video-360p-fragmented-encrypted.mp4
mp4encrypt --method MPEG-CENC --key 1:617D8A125A284DF48E3C6B1866348A3F:random --property 1:KID:B326F895B6A24CC5A4DC70995728059C  --global-option mpeg-cenc.eme-pssh:true video-480p-fragmented.mp4 video-480p-fragmented-encrypted.mp4
mp4encrypt --method MPEG-CENC --key 1:617D8A125A284DF48E3C6B1866348A3F:random --property 1:KID:B326F895B6A24CC5A4DC70995728059C  --global-option mpeg-cenc.eme-pssh:true video-720p-fragmented.mp4 video-720p-fragmented-encrypted.mp4
mp4encrypt --method MPEG-CENC --key 1:617D8A125A284DF48E3C6B1866348A3F:random --property 1:KID:B326F895B6A24CC5A4DC70995728059C  --global-option mpeg-cenc.eme-pssh:true audio-fragmented.mp4 audio-fragmented-encrypted.mp4
```

### Generate DASH file

```
mp4dash -o dash video-240p-fragmented-encrypted.mp4 video-360p-fragmented-encrypted.mp4 video-480p-fragmented-encrypted.mp4 video-720p-fragmented-encrypted.mp4 audio-fragmented-encrypted.mp4
```

### Generate PSSHBOX

- Compile shaka-packager
- Run the following command in shaka-packager src folder:

```
./out/Release/pssh-box.py --base64 --system-id 1077efecc0b24d02ace33c1e52e2fb4b --key-id B326F895B6A24CC5A4DC70995728059C
```

Output:
```
AAAANHBzc2gBAAAAEHfv7MCyTQKs4zweUuL7SwAAAAGzJviVtqJMxaTccJlXKAWcAAAAAA==
```

Now get the generated psshbox and insert in a content protection node in the `stream.mpd` generated file:
```xml
<ContentProtection schemeIdUri="urn:uuid:e2719d58-a985-b3c9-781a-b030af78d30e" value="cenc">
    <cenc:pssh>AAAANHBzc2gBAAAAEHfv7MCyTQKs4zweUuL7SwAAAAGzJviVtqJMxaTccJlXKAWcAAAAAA==</cenc:pssh>
</ContentProtection>
```

## References
- https://radek350.wordpress.com/2017/10/29/dash-encrypting-and-playing-video-with-clearkey-videojs/
- https://github.com/google/shaka-packager/tree/master/packager/tools/pssh

