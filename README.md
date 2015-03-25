# mde-soundboard

Million Dollar Extreme audio soundboard.

Live version hosted [here](http://lukehorvat.github.io/mde-soundboard).

Kudos to Sam for giving me permission to do this.

## Setup

To run a local instance, issue the following commands:

```bash
$ npm install
$ bower install
$ gulp watch
```

This installs all dependencies and serves the soundboard on port 9000.

## Contributing

Pull requests are welcome.

For now, I'm only accepting voice clips with a minimal amount of music in the background, since they work the best for this kind of thing. Unfortunately, this rules out some really good MDE material. Oh well, it is what it is.

Use [youtube-dl](http://rg3.github.io/youtube-dl/) to download their YouTube videos and [SoX](http://sox.sourceforge.net/) to slice up the audio tracks. Example:

```bash
# Download audio track of a YouTube video. Produces an "in.mp3".
$ youtube-dl --extract-audio --audio-format mp3 --audio-quality 0 -o "in.%(ext)s" 8G9QIIvSpzE

# Extract time range, maximize volume, and convert to mono. Produces an "out.mp3".
$ sox -v $(sox in.mp3 -n stat -v 2>&1) in.mp3 out.mp3 channels 1 trim 14.6 9.3
```
