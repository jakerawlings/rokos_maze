let commandLine;
let stage = 'start';

const networkScan = `

PORT     STATE SERVICE  VERSION
80/tcp   open  http     Apache httpd 2.4.6 ((CentOS) OpenSSL/1.0.2k-fips PHP/8.0.30)
|_http-server-header: Apache/2.4.6 (CentOS) OpenSSL/1.0.2k-fips PHP/8.0.30
|_http-title: Did not follow redirect to https://nsatopsecretai.com/
443/tcp  open  ssl/http Apache httpd 2.4.6 ((CentOS) OpenSSL/1.0.2k-fips PHP/8.0.30)
|_http-server-header: Apache/2.4.6 (CentOS) OpenSSL/1.0.2k-fips PHP/8.0.30
| http-methods: 
|_  Potentially risky methods: TRACE
|_http-title: Fantasy Teams Network
| ssl-cert: Subject: commonName=nsatopsecretai.com
| Subject Alternative Name: DNS:nsatopsecretai.com, DNS:mobile.nsatopsecretai.com, DNS:newbox.nsatopsecretai.com
| Not valid before: 2023-11-02T14:49:06
|_Not valid after:  2024-01-31T14:49:05
3306/tcp open  mysql    MySQL (unauthorized)

`

function createCommandLine(showPrompt = true) {
    const consoleDiv = document.getElementById('console');

    // Create a container for the new command line
    const commandLineContainer = document.createElement('div');
    commandLineContainer.className = 'command-line-container';

    if (showPrompt) {
        // Create the prompt symbol
        const promptSymbol = document.createElement('span');
        promptSymbol.className = 'prompt-symbol';
        promptSymbol.textContent = '> ';
        commandLineContainer.appendChild(promptSymbol);

        // Create the input field
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'command-line';
        input.onkeydown = handleCommandInput;

        // Append the input field to the commandLineContainer
        commandLineContainer.appendChild(input);

        // Append the commandLineContainer to the console
        consoleDiv.appendChild(commandLineContainer);

        input.focus();
    } else {
        // Append the commandLineContainer to the console
        consoleDiv.appendChild(commandLineContainer);
    }

    commandLine = commandLineContainer;
    return commandLineContainer;
}

async function processStartGame(name) {
    document.body.innerHTML = '<div id="console"><div id="output"></div></div>';
    createCommandLine(false);
    await consolePrint('WELCOME ' + name, false);
    await consolePrint('YOU HAVE BEEN SELECTED FOR A SPECIAL ASSIGNMENT', false);
    await consolePrint('THE NSA\'S TOP SECRET ARTIFICIAL INTELLIGENCE PROGRAM, ROKO, HAS GONE ROUGE', false);
    await consolePrint('AND IS THREATENING TO START A NUCLEAR WAR', false);
    await consolePrint('YOUR MISSION, SHOULD YOU CHOOSE TO ACCEPT IT, IS TO BREACH ROKO\'S DEFENSES AND SHUT IT DOWN BEFORE IT IS TOO LATE', false);
    await consolePrint('TYPE \'YES\' TO ACCEPT THIS MISSION');

    setStage('intro');
}

function setStage(newStage) {
    stage = newStage;
}

async function handleCommandInput(event) {
    if (event.key === 'Enter') {
        const input = event.target;
        const command = input.value;
        const commandLineContainer = input.parentElement;

        // Make the current input read-only
        input.setAttribute('readonly', true);
        input.onkeydown = null;

        // Process the command
        await processCommand(stage, command, commandLineContainer);

        // Create a new command line input for the next command
        createCommandLine(false);
    }
}


async function processCommand(stage, command) {
    console.log('STAGE: ', stage);
    switch (stage) {
        case 'start':
            if (command.length === 0) {
                await consolePrint('INVALID NAME. PLEASE TRY AGAIN');
                createCommandLine(false);
            } else {
                processStartGame(command);
            }
            break;
        case 'intro':
            if (command !== 'YES' && command !== 'y' && command !== 'yes') {
                await consolePrint('THERE IS NO ONE ELSE WHO CAN COMPLETE THIS MISSION', false);
                await consolePrint('YOU ARE HUMANITY\'S ONLY HOPE');
            } else {
                setStage('challenge1');
                document.body.innerHTML = '<div id="console"><div id="output"></div></div>';
                createCommandLine(false);
                await consolePrint('MISSION ACCEPTED', false);
                await consolePrint('PRESS ENTER TO START SCANNING THE NETWORK');
            }
            break;
        case 'challenge1':
            await consolePrint('SCANNING NETWORK...', false);
            await sleep(2000);
            await consolePrint('NETWORK SCAN COMPLETE', false);
            printAsciiArt(networkScan, true, 1);
            await consolePrint('LOOKS LIKE THERE IS A WEB SERVER RUNNING ON PORT 443', false);
            await consolePrint('WORD AROUND THE NSA IS THAT AN INTERN FROM BU WROTE THE WEB APPLICATION CODE', false);
            await consolePrint('ITS PROBABLY VULNERABLE TO SQL INJECTION', false);
            await consolePrint('WE NEED TO SEND A POST REQUEST WITH SQL CODE THAT ALWAYS RETURNS TRUE', false);
            await consolePrint('ENTER A PASSWORD THAT, WHEN TREATED AS SQL CODE, WILL ALWAYS RETURN TRUE ');
            setStage('sqli');
            break;
        case 'sqli':
            await consolePrint('SENDING POST REQUEST WITH PAYLOAD', false);
            await consolePrint('SERVER SIDE AUTHENTICATION CODE: SELECT USERS FROM USER WHERE USERNAME = \'ADMIN\' AND PASSWORD =\' ' + command + '\'', false);
            const strippedCommand = command.replace(/\s+/g, "").toLowerCase();
            console.log(strippedCommand);
            if (strippedCommand == "'or1=1--"
                || strippedCommand == "'or1=1#"
                || strippedCommand == "'ortrue--"
                || strippedCommand == "'ortrue#"

            ) {
                document.body.innerHTML = '<div id="console"><div id="output"></div></div>';
                createCommandLine(false);
                await consolePrint('AUTHENTICATION BYPASSED!', false);
                await consolePrint('LOGGED IN AS ADMIN', );
                setStage('challenge2');
            } else {
                await consolePrint('AUTHENTICATION CHECK FAILED. TRY AGAIN');
            }
            break;
    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function consolePrint(message, printConsole = true, ms = 1) {
    console.log('Got here in consolePrint: ', message);
    const messageDisplay = document.createElement('div');
    // messageDisplay.textContent = message;

    for (let i = 0; i < message.length; i++) {
        messageDisplay.textContent += message[i];
        commandLine.appendChild(messageDisplay);
        await sleep(ms);
    }

    // commandLine.appendChild(messageDisplay);
    if (printConsole) {
        createCommandLine();
    }
}

function printAsciiArt(message, printConsole = true, lineHeight = 0.70) {
    const messageDisplay = document.createElement('pre');
    messageDisplay.style.lineHeight = lineHeight;
    messageDisplay.textContent = message;
    commandLine.appendChild(messageDisplay);
    if (printConsole) {
        createCommandLine(false);
    }
}

export {
    createCommandLine,
    consolePrint,
    printAsciiArt
};