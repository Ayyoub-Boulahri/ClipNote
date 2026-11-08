# ClipNote

Watch a video, pin notes to exact moments, and export them as a plain `.txt` file you can
hand to someone (or to an AI assistant) so they know exactly what to fix and when.

It comes in two versions that share the same page:

- **Web**: a single HTML file. No install, no server, no build step.
- **Desktop**: an [Electron](https://www.electronjs.org/) app for Windows, Linux and macOS.

## Project layout

```
web/clipnote.html   the whole app (HTML, CSS and JS in one file)
desktop/            Electron wrapper that loads web/clipnote.html
```

The desktop app has no copy of the page: it loads `web/clipnote.html` while developing and
bundles it at build time, so a change to the web version reaches both.

## Web version

1. Open `web/clipnote.html` in your browser (double-click it).
2. Click **Open video** or drag a video file onto the page.
3. Watch, pause, and add notes. When you're done, click **Export notes** or **Copy**.

The video never leaves your computer: it's loaded locally in the browser, so large files
work fine. Any format your browser can play is supported (MP4/H.264, WebM, usually MOV).

## Desktop version

Requires [Node.js](https://nodejs.org/).

```bash
cd desktop
npm install
npm start            # run the app
```

Build a package (output goes to `desktop/dist/`):

| Command              | Output                                                       |
|----------------------|--------------------------------------------------------------|
| `npm run dist:win`   | `ClipNote-<version>-win.zip`: unzip and run `ClipNote.exe`   |
| `npm run dist:linux` | `ClipNote-<version>.AppImage`                                |
| `npm run dist:mac`   | `ClipNote-<version>.dmg` (must be built on a Mac)            |

The Windows build is a portable zip rather than an installer, so it can be built on Linux
without Wine. It isn't code-signed, so Windows SmartScreen may warn on first launch
(**More info → Run anyway**).

The desktop app keeps its saved notes separately from the browser, so notes written in the
web version don't show up there (and vice versa). Use **Export** / **Import** to move them.

## Features

- **Timeline with markers**: click or drag to seek. Each note shows as a marker; hover to
  read it, click to jump to it.
- **Playback speed**: 0.25x, 0.5x, 1x, 1.5x, 2x.
- **Frame stepping**: move one frame at a time to land on the exact spot.
- **Point or range notes**: press `N` for a note at the current time, or press `I` to mark
  a start point and then `N` to note the whole range.
- **Notes list**: always sorted by time; click a note to seek, edit its text or move it to
  the current time, or delete it.
- **Auto-save**: notes are kept in the browser (`localStorage`) per video, matched by file
  name and size, so closing the tab doesn't lose them.
- **Export / Copy**: download `<video-name>_notes.txt` or copy the same text to the
  clipboard.
- **Import**: load a notes `.txt` back onto the timeline with **Import notes**, or drop it
  on the page (alone or together with the video). Duplicates are skipped and the import
  can be undone.

## Export format

```
Video: my_edit_v3.mp4
Duration: 02:14.0
Notes: 3

[00:12.4] Cut is too abrupt here
[00:40.0 - 00:47.5] Shaky footage, stabilize or replace
[01:30.0] Caption typo "teh" -> "the"
```

Import also accepts lines without brackets (`01:02.5 - 01:05 text`), `h:mm:ss` times and
`,` as the decimal separator. A line with no timestamp continues the note above it.

## Keyboard shortcuts

| Key     | Action                                  |
|---------|-----------------------------------------|
| `Space` | Play / pause                            |
| `←` `→` | Back / forward 5 seconds                |
| `,` `.` | Back / forward one frame                |
| `N`     | Add a note at the current time          |
| `I`     | Mark the start of a range               |
| `E`     | Export notes                            |
| `Enter` | Save the note being typed               |
| `Esc`   | Cancel the note, edit or range          |

Shortcuts are ignored while typing in a text box.
