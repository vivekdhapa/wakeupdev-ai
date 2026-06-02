#!/usr/bin/env bun
import { runWakeup } from "./tui/wakeup.ts";
import { Command } from "commander";

const program = new Command();

program
    .name("wakeupdev-ai")
    .description("A CLI tool for WakeupDev AI")
    .version("1.0.0");

program
    .command("wakeup")
    .description("show the banner and pick cli or telegram")
    .action(
        async ()=>{
            await runWakeup();        
        }
);

await program.parseAsync(process.argv);