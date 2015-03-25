# mde-soundboard

Million Dollar Extreme audio soundboard.

http://lukehorvat.github.io/mde-soundboard

## Contributing

Pull requests are welcome. For now, I'm only accepting voice clips with a minimal amount of music in the background, since they work the best for this kind of thing. Unfortunately, this rules out some really good MDE material. Oh well, it is what it is.

I use [youtube-dl](http://rg3.github.io/youtube-dl/) to download their YouTube videos and [SoX](http://sox.sourceforge.net/) to slice up the audio tracks. Example:

```bash
# Download audio track of a YouTube video. Results in an "in.mp3" file.
youtube-dl --extract-audio --audio-format mp3 --audio-quality 0 -o "in.%(ext)s" 8G9QIIvSpzE

# Extract a time range, maximize volume, and convert to mono. Results in an "out.mp3" file.
sox -v $(sox in.mp3 -n stat -v 2>&1) in.mp3 out.mp3 channels 1 trim 14.6 9.3
```
