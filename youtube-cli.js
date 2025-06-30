import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import inquirer from 'inquirer';
import chalk from 'chalk';
import cliProgress from 'cli-progress';

puppeteer.use(StealthPlugin());

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const showLoading = (message) => {
    const frames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
    let i = 0;
    return setInterval(() => {
        process.stdout.write(`\r${chalk.cyan(frames[i])} ${chalk.yellow(message)}`);
        i = (i + 1) % frames.length;
    }, 80);
};

const stopLoading = (interval) => {
    clearInterval(interval);
    process.stdout.write('\r' + ' '.repeat(50) + '\r');
};

const showHeader = () => {
    console.clear();
    console.log(chalk.cyan.bold(`
 ██╗   ██╗ ██████╗ ██╗   ██╗████████╗██╗   ██╗██████╗ ███████╗
╚██╗ ██╔╝██╔═══██╗██║   ██║╚══██╔══╝██║   ██║██╔══██╗██╔════╝
 ╚████╔╝ ██║   ██║██║   ██║   ██║   ██║   ██║██████╔╝█████╗  
  ╚██╔╝  ██║   ██║██║   ██║   ██║   ██║   ██║██╔══██╗██╔══╝  
   ██║   ╚██████╔╝╚██████╔╝   ██║   ╚██████╔╝██████╔╝███████╗
   ╚═╝    ╚═════╝  ╚═════╝    ╚═╝    ╚═════╝ ╚═════╝ ╚══════╝

                🎬 YouTube MP4 Downloader CLI Tool 🎬

${chalk.yellow("Make sure you don't violate the rights of others with any files you download.\nCopyrighted music can't be downloaded with this tool.")}

  ═══════════════════════════════════════════════════════════════════════════

  Created with ❤️  by ${chalk.yellow.bold('ReiivanTheOnlyOne')}
  🚀 Fast, Reliable, and Easy to Use!
`));
};

const showFooter = () => {
    console.log(chalk.cyan.bold(`
══════════════════════════════════════════════════════════════════════════════

🎉 Thank you for using YouTube MP4 Downloader CLI! 🎉

Created with ❤️  by ${chalk.yellow.bold('ReiivanTheOnlyOne')}
🌟 If you found this tool helpful, please share it! 🌟
`));
};

async function main() {
    showHeader();

    const { youtubeUrl } = await inquirer.prompt([
        {
            type: 'input',
            name: 'youtubeUrl',
            message: 'Enter a YouTube video URL:',
            validate: val => val.includes('youtube.com') || val.includes('youtu.be') || 'Please enter a valid YouTube URL!'
        }
    ]);

    if (!youtubeUrl.startsWith('https://youtu.be/')) {
        console.log(chalk.red.bold('\n❌ Error: Only URLs with prefix @https://youtu.be/ are allowed!'));
        showFooter();
        return;
    }

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    let loadingInterval;
    try {
        loadingInterval = showLoading('Navigating to turboscribe.ai...');
        await page.goto('https://turboscribe.ai/downloader/youtube/mp4', { waitUntil: 'networkidle2', timeout: 60000 });
        stopLoading(loadingInterval);
    } catch (err) {
        stopLoading(loadingInterval);
        console.log(chalk.red.bold('\n❌ Error: Failed to navigate to turboscribe.ai.'));
        if (err instanceof Error && err.message.includes('Timeout')) {
            console.log(chalk.red('Navigation timed out. The site may be slow or blocking automated browsers.'));
        } else {
            console.log(chalk.red(err.message));
        }
        await browser.close();
        showFooter();
        return;
    }

    try {
        await page.waitForSelector('input[name="url"]', { timeout: 20000 });
    } catch (err) {
        console.log(chalk.red.bold('\n❌ Error: input[name="url"] not found after waiting.'));
        await browser.close();
        showFooter();
        return;
    }

    const loadingInput = showLoading('Filling and submitting the form...');
    await page.type('input[name="url"]', youtubeUrl);
    await page.keyboard.press('Enter');
    stopLoading(loadingInput);
    console.log(chalk.yellow('Waiting for download section...'));

    let found = false;
    for (let i = 0; i < 30; i++) {
        found = await page.$('a.dui-btn[href*="videoplayback"]');
        if (found) break;
        await delay(1000);
    }
    if (!found) {
        console.log(chalk.red('No download links found after waiting.'));
        await browser.close();
        showFooter();
        return;
    }

    const links = await page.evaluate(() => Array.from(document.querySelectorAll('.block.bg-base-100')).flatMap(block =>
        Array.from(block.querySelectorAll('a.dui-btn[href*="videoplayback"]')).map(a => {
            const label = block.querySelector('div.flex.flex-col.space-y-2 > div')?.textContent.trim() || '';
            let resolution = '', size = '';
            block.querySelectorAll('span').forEach(span => {
                if (/\d+x\d+/.test(span.textContent)) resolution = span.textContent.trim();
                if (/MB|GB|KB/i.test(span.textContent)) size = span.textContent.trim();
            });
            let type = /audio/i.test(label) ? 'Audio' : /video/i.test(label) ? 'Video' : (a.textContent.trim() || 'Unknown');
            return { url: a.href, label, type, resolution, size };
        })
    ));

    if (!links.length) {
        console.log(chalk.red('No MP4 download links found.'));
        await browser.close();
        showFooter();
        return;
    }

    const bar = new cliProgress.SingleBar({
        format: chalk.cyan('Extracting Links') + ' |{bar}| {percentage}% | {value}/{total} links',
        barCompleteChar: chalk.green('█'),
        barIncompleteChar: chalk.gray('░'),
        hideCursor: true,
        clearOnComplete: true
    });
    bar.start(links.length, 0);
    links.forEach((_, i) => bar.update(i + 1));
    bar.stop();

    console.log(chalk.cyan.bold('\n🔗 Download Links:'));
    console.log(chalk.gray('═'.repeat(60)));
    links.forEach((link, i) => {
        let info = chalk.green.bold(`\n${i + 1}. ${link.type}`) +
            (link.label ? chalk.white(` - ${link.label}`) : '') +
            (link.resolution ? chalk.yellow(` | ${link.resolution}`) : '') +
            (link.size ? chalk.magenta(` | ${link.size}`) : '');
        console.log(info);
        console.log(chalk.blue.underline(link.url));
    });
    console.log(chalk.gray('\n' + '═'.repeat(60)));

    await browser.close();
    showFooter();
}

main();