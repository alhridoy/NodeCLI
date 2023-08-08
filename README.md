# NodeCLI

This project is essentially a basic command-line interface (CLI) utility that allows users to execute shell commands from within a Node.js application. It also comes with some custom commands such as exit to terminate the application and history to view previously executed commands. Moreover, it supports piping between commands, similar to UNIX shell behavior. Let's break it down:

#Imports: The code imports necessary modules:

readline: To provide an interface for reading lines from a readable stream (like process.stdin) and writing lines to a writable stream.
spawn: From the child_process module, which is used to execute shell commands.
Writable: From the stream module, though it seems to be unused in this snippet.
History Storage:

let history = [];: This line initializes an empty array to keep track of executed commands.
Readline Interface Creation:

const rl = readline.createInterface(...): It creates a readline interface to read user inputs.
Command Line Prompt:

When you run this program, it will display a $ prompt, waiting for user input.
Event Handling:The code listens to the line event which is triggered when a user enters a command and hits the enter key.
If the command is exit, the CLI application terminates.
If the command is history, it displays all the previously entered commands.
If there's a | in the command (used in UNIX-like systems for piping output from one command as input to another), the program will split the command into two parts and execute them, piping the output of the first command to the second command.
Otherwise, the program will attempt to execute the command provided.
Command Execution:

The spawn function is used to execute the shell commands.
Event listeners are attached to stdout (standard output) and stderr (standard error) streams of the spawned processes to handle outputs and errors, respectively.
Exiting:

The program listens to the close event on the readline interface to exit the process when the interface is closed.
In essence, this utility allows you to run shell commands from a Node.js context, view the history of your commands, and pipe outputs from one command to another. It's a simple yet functional representation of a shell-like environment.
