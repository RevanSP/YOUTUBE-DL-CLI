# YouTube MP4 Downloader CLI Tool

A beautiful, interactive CLI tool to extract and display YouTube video and audio download links (with details like type, resolution, and size) from turboscribe.ai. Built with Puppeteer Extra (with Stealth Plugin), Inquirer, Chalk, and cli-progress. Created by ReiivanTheOnlyOne.

---

## Features
- Extracts all available YouTube video/audio download links (MP4, WebM, M4A, etc.)
- Shows type (audio/video), resolution, and file size for each link
- Beautiful, modern CLI interface with progress bars and loading animations
- Works on Windows Terminal, CMD, PowerShell, Linux Terminal, and Termux
- Only accepts YouTube short links with prefix `https://youtu.be/`

---

## Requirements
- **Node.js** v18 or higher ([Download Node.js](https://nodejs.org/))
- **puppeteer-extra** and **puppeteer-extra-plugin-stealth** (installed automatically with npm install)
- Terminal/Command Prompt/PowerShell (Windows) or Terminal/Termux (Linux/Android)

---

## Installation

1. **Clone or Download this Repository**
   ```sh
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```
   Or just download and extract the ZIP, then open the folder in your terminal.

2. **Install Dependencies**
   ```sh
   npm install
   # (installs puppeteer-extra, puppeteer-extra-plugin-stealth, and all other dependencies)
   ```

---

## Usage

1. **Run the CLI Tool**
   ```sh
   node youtube-cli.js
   ```

2. **Follow the Prompts**
   - Enter a YouTube video URL (must start with `https://youtu.be/`).
   - Wait for the tool to process and fetch all available download links.
   - The tool will display all download links with type, resolution, and file size.

---

## Example
```
$ node youtube-cli.js

 ██╗   ██╗ ██████╗ ██╗   ██╗████████╗██╗   ██╗██████╗ ███████╗
╚██╗ ██╔╝██╔═══██╗██║   ██║╚══██╔══╝██║   ██║██╔══██╗██╔════╝
 ╚████╔╝ ██║   ██║██║   ██║   ██║   ██║   ██║██████╔╝█████╗  
  ╚██╔╝  ██║   ██║██║   ██║   ██║   ██║   ██║██╔══██╗██╔══╝  
   ██║   ╚██████╔╝╚██████╔╝   ██║   ╚██████╔╝██████╔╝███████╗
   ╚═╝    ╚═════╝  ╚═════╝    ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝

                🎬 YouTube MP4 Downloader CLI Tool 🎬

Make sure you don't violate the rights of others with any files you download.
Copyrighted music can't be downloaded with this tool.

  ═══════════════════════════════════════════════════════════════════════════

  Created with ❤️  by ReiivanTheOnlyOne
  🚀 Fast, Reliable, and Easy to Use!

Enter a YouTube video URL: https://youtu.be/abc123
Waiting for download section...

🔗 Download Links:
════════════════════════════════════════════════════════════

1. Video - Integrasi Realtime dengan Third Party.mp4 | 640x360 | 22.4 MB
https://...itag=18...

2. Audio - Integrasi Realtime dengan Third Party.m4a | Audio | 14.2 MB
https://...itag=140...

...
════════════════════════════════════════════════════════════

🎉 Thank you for using YouTube MP4 Downloader CLI! 🎉

Created with ❤️  by ReiivanTheOnlyOne
🌟 If you found this tool helpful, please share it! 🌟
```

---

## Notes
- This tool does **not** download the audio/video files directly, but provides download links for each stream.
- For educational and personal use only.
- Only works with YouTube short links (https://youtu.be/...).

---

## Credits
- Created by ReiivanTheOnlyOne
- Uses [puppeteer-extra](https://github.com/berstend/puppeteer-extra), [puppeteer-extra-plugin-stealth](https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra-plugin-stealth), [Inquirer](https://github.com/SBoudrias/Inquirer.js/), [Chalk](https://github.com/chalk/chalk), [cli-progress](https://github.com/AndiDittrich/Node.CLI-Progress) 