import {select , isCancel} from "@clack/prompts";
import chalk from "chalk"; //used for colored output in terminal
import figlet from "figlet";
import { runCliMode } from "../modes/cli.ts";

const BANNER_FONT = 'ANSI Shadow';  
const SHADOW = chalk.hex('#ffffff'); 
const FACE = chalk.hex('#e4dbbe').bold;

function printBannerWithShadow(ascii:string){
    const bannerLines=ascii.replace(/\s+$/, '').split('\n');
    const maxLen=Math.max(...bannerLines.map((l)=> l.length),0);
    const rowWidth=maxLen+2;

    for (const line of bannerLines){
        console.log(SHADOW((' '+ line).padEnd(rowWidth)));
    }
    process.stdout.write(`\x1b[${bannerLines.length}A`);
    for (const line of bannerLines){
        console.log(FACE(line.padEnd(rowWidth)));
    }
}

export async function runWakeup() {
    let ascii:string;
    try {
        ascii=figlet.textSync("wakeupdev-ai",{font:BANNER_FONT})
    } catch (error) {
        ascii=figlet.textSync("wakeupdev-ai",{font:"Standard"})
    }
    printBannerWithShadow(ascii);

    const mode=await select({
        message:"Choose your mode:",
        options:[
            {value:"cli",label:"CLI"},
            {value:"telegram",label:"Telegram"},
            {value:"exit",label:"Exit"}
        ],
    });
    if(isCancel(mode || mode==="exit")){
        console.log(chalk.dim('Session aborted.'));
        // process.exit(0);
        return;
    }

    if(mode==="cli"){
        console.log(chalk.dim('starting in CLI mode...'));
        await runCliMode();
    }
    else if(mode==="telegram"){
        console.log(chalk.dim('starting in Telegram mode...'));
        }

}