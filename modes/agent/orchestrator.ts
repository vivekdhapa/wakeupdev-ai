import chalk from 'chalk';
import { isCancel,text } from "@clack/prompts";
import { defaultAgentConfig } from "./types.ts";
import { ActionTracker } from './action-tracker.ts';

export async function runAgentMode(){
    console.log(chalk.bold('\n🤖 Agent Mode\n'));

    const goal = await text({
        message: chalk.cyan('What would you like the agent to do?'),
        placeholder: chalk.dim('Concrete task for this codebase...'),
    });

    if(isCancel(goal) || !goal.trim()) {
        console.log(chalk.yellow('Operation cancelled.'));
        return;
    }

    const config = defaultAgentConfig();
    const tracker = new ActionTracker();
    
}