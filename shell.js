const readline = require('readline');
const { spawn } = require('child_process');
const { Writable } = require('stream');

let history = [];

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '$ '
});

rl.prompt();

rl.on('line', (line) => {
    line = line.trim();
    history.push(line);

    if (line === 'exit') {
        rl.close();
    } else if (line === 'history') {
        console.log(history.join('\n'));
        rl.prompt();
    } else {
        const commandArgs = line.split(' ');
        const pipeIndex = commandArgs.indexOf('|');
        if (pipeIndex !== -1) {
            // If pipe operator is found, we separate the commands and execute them
            const command1Args = commandArgs.slice(0, pipeIndex);
            const command2Args = commandArgs.slice(pipeIndex + 1);
            const command1 = spawn(command1Args[0], command1Args.slice(1));
            const command2 = spawn(command2Args[0], command2Args.slice(1));

            command1.stdout.on('data', (data) => command2.stdin.write(data));
            command1.stderr.on('data', (data) => console.error(`Error: ${data}`));
            command1.on('close', (code) => {
                if (code !== 0) {
                    console.log(`command1 exited with code ${code}`);
                }
                command2.stdin.end();
            });

            command2.stdout.on('data', (data) => console.log(`${data}`));
            command2.stderr.on('data', (data) => console.error(`Error: ${data}`));
            command2.on('close', (code) => {
                if (code !== 0) {
                    console.log(`command2 exited with code ${code}`);
                }
                rl.prompt();
            });
        } else {
            const cmd = spawn(commandArgs[0], commandArgs.slice(1));

            cmd.stdout.on('data', (data) => {
                console.log(`${data}`);
            });

            cmd.stderr.on('data', (data) => {
                console.error(`Command not found: ${commandArgs[0]}`);
            });

            cmd.on('close', () => {
                rl.prompt();
            });
        }
    }
}).on('close', () => {
    process.exit(0);
});
