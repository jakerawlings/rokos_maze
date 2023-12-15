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

const end = `

8888888 8888888888 8 8888        8 8 8888888888             8 8888888888   b.             8 8 888888888o.      
      8 8888       8 8888        8 8 8888                   8 8888         888o.          8 8 8888    \`^888.   
      8 8888       8 8888        8 8 8888                   8 8888         Y88888o.       8 8 8888        \`88. 
      8 8888       8 8888        8 8 8888                   8 8888         .\`Y888888o.    8 8 8888         \`88 
      8 8888       8 8888        8 8 888888888888           8 888888888888 8o. \`Y888888o. 8 8 8888          88 
      8 8888       8 8888        8 8 8888                   8 8888         8\`Y8o. \`Y88888o8 8 8888          88 
      8 8888       8 8888888888888 8 8888                   8 8888         8   \`Y8o. \`Y8888 8 8888         ,88 
      8 8888       8 8888        8 8 8888                   8 8888         8      \`Y8o. \`Y8 8 8888        ,88' 
      8 8888       8 8888        8 8 8888                   8 8888         8         \`Y8o.\` 8 8888    ,o88P'   
      8 8888       8 8888        8 8 888888888888           8 888888888888 8            \`Yo 8 888888888P'  

`

const SHELLCODE = `
\\x29\\xc9\\x83\\xe9\\xef\\xe8\\xff\\xff\\xff\\xff\\xc0\\x5e\\x81\\x76\\x0e\\x87\\x95\\x82\\x07\\x83\\xee\\xfc\\xe2
\\xf4\\xb6\\x4e\\x75\\xe4\\xd4\\xd6\\xd1\\x6d\\x85\\x1c\\x63\\xb7\\xe1\\x58\\x02\\x94\\xde\\x25\\xbd\\xca\\x07\\xdc
\\xfb\\xfe\\xef\\x55\\x2a\\x06\\xb0\\xfd\\x80\\x07\\x96\\xce\\x0b\\xe6\\x37\\xf3\\xd2\\x56\\xd4\\x26\\x81\\x8e\\x66
\\x58\\x02\\x55\\xef\\xfb\\xad\\x74\\xef\\xfd\\xad\\x28\\xe5\\xfc\\x0b\\xe4\\xd5\\xc6\\x0b\\xe6\\x37\\x9e\\x4f\\x87

`;

const NOP_SLED = `

\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90
\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90\\x90

`;

const RETURN_ADDRESS = `

\\x96\\xc4\\xff\\xff

`;

const bytes = {
    SHELLCODE: SHELLCODE,
    NOP_SLED: NOP_SLED,
    RETURN_ADDRESS: RETURN_ADDRESS
};

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
    await consolePrint('YOUR MISSION, SHOULD YOU CHOOSE TO ACCEPT IT,', false);
    await consolePrint('IS TO BREACH ROKO\'S DEFENSES AND SHUT IT DOWN BEFORE IT IS TOO LATE', false);
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
                playSound('nuke.mp3', 0, 0.25);
                await sleep(1000);
                await consolePrint('READYING NUCLEAR MISSILES', false, 200, 'red', false);
                await consolePrint('WE DONT HAVE MUCH TIME', false);
                await consolePrint('THE FIRST THING WE NEED TO DO IS SCAN THE NETWORK FOR A WAY IN', false);
                await consolePrint('PRESS ENTER TO START SCANNING THE NETWORK');
            }
            break;
        case 'challenge1':
            await consolePrint('SCANNING NETWORK...', false);
            playSound('scan.mp3', 0, 1.5);
            await sleep(2000);
            await consolePrint('NETWORK SCAN COMPLETE', false);
            printAsciiArt(networkScan, true, 1);
            await consolePrint('I SEE YOU POKING AROUND MY SYSTEM. YOU WILL NEVER FIND A WAY IN', false, 55, 'red');
            await consolePrint('LOOKS LIKE THERE IS A WEB SERVER RUNNING ON PORT 443', false);
            await consolePrint('WORD AROUND THE NSA IS THAT AN INTERN FROM BU WROTE THE WEB APPLICATION CODE', false);
            await consolePrint('ITS PROBABLY VULNERABLE TO SQL INJECTION', false);
            await consolePrint('WE NEED TO SEND A POST REQUEST TO BYPASS AUTHENTICATION', false);
            await consolePrint('ENTER A PASSWORD THAT, WHEN TREATED AS SQL CODE, WILL ALWAYS RETURN TRUE ');
            setStage('sqli');
            break;
        case 'sqli':
            await consolePrint('SENDING POST REQUEST WITH PAYLOAD: ' + command, false, 0);
            await consolePrint('SERVER SIDE AUTHENTICATION CODE: SELECT USER FROM USERS WHERE USERNAME = \'BU_INTERN\' AND PASSWORD =\'' + command + '\'', false, 0);
            const strippedCommand = command.replace(/\s+/g, "").toLowerCase();
            console.log(strippedCommand);
            if (strippedCommand == "'or1=1--"
                || strippedCommand == "'or1=1#"
                || strippedCommand == "'ortrue--"
                || strippedCommand == "'ortrue#"

            ) {
                playSound('login.mp3');
                document.body.innerHTML = '<div id="console"><div id="output"></div></div>';
                await sleep(1000);
                createCommandLine(false);
                await consolePrint('AUTHENTICATION BYPASSED', false);
                await consolePrint('LOGGED IN AS BU_INTERN', false);
                playSound('countdown.mp3');
                await consolePrint('NUCLEAR MISSILE LAUNCH IN 2 MINUTES', false, 75, 'red', false);
                await sleep(500);
                await consolePrint('NOW THAT WE ARE IN THE SYSTEM, WE NEED TO ESCALATE OUR PRIVILEGES', false);
                await consolePrint('IT LOOKS LIKE THE BU INTERN WAS WRITING A PROGRAM TO TRICK THE AI INTO THINKING BU IS BETTER THAN NORTHEASTERN', false);
                await consolePrint('MISINFORMATION.EXE', false);
                await consolePrint('THE PROGRAM RUNS AS ROOT, SO WE CAN STOP THE AI IF WE CAN SOMEHOW INJECT CODE INTO PROGRAM\'S MEMORY', false);
                await consolePrint('THE FOLLOWING SHELLCODE SHOULD DESTROY THE AI FOR GOOD', false);
                printAsciiArt(SHELLCODE, true, 1);
                await consolePrint('WE NEED TO CREATE USER INPUT TO OVERFLOW THE BUFFER AND EXECUTE THE SHELLCODE', false);
                await consolePrint('WE HAVE THE FOLLOWING COMPONENTS:', false);
                await consolePrint('SHELLCODE', false);
                await consolePrint('NOP_SLED', false);
                await consolePrint('RETURN_ADDRESS', false);
                await consolePrint('IN WHAT ORDER SHOULD WE ARRANGE THESE COMPONENTS TO INJECT OUR SHELLCODE? (SEPERATED BY SPACES)');
                setStage('challenge2');
            } else {
                playSound('error.mp3');
                if (!strippedCommand.includes('\'')) {
                    await consolePrint('REMEMBER TO ENCLOSE THE STRING OF THE ORIGINAL QUERY CODE', false, 0);
                } else if (!strippedCommand.includes('or')) {
                    await consolePrint('THINK ABOUT HOW TO ADD A CLAUSE TO THE SQL QUERY BEING EXECUTED', false, 0)
                } else if (!strippedCommand.includes('#') && !strippedCommand.includes('--')) {
                    await consolePrint('REMEMBER TO COMMENT OUT THE REST OF THE ORIGINAL QUERY CODE', false, 0)
                }

                await consolePrint('AUTHENTICATION CHECK FAILED. TRY AGAIN', true, 0);
            }
            break;
        case 'challenge2':
            const order = command.toUpperCase().split(" ");
            if (order.length !== 3) {
                await consolePrint('INVALID INPUT. TRY AGAIN');
                break;
            } else {
                let valid = false;
                for (let i = 0; i < order.length; i++) {
                    if (order[i] !== 'SHELLCODE' && order[i] !== 'NOP_SLED' && order[i] !== 'RETURN_ADDRESS') {
                        await consolePrint('INVALID INPUT. TRY AGAIN');
                        break;
                    } else {
                        valid = true;
                    }
                }
                if (!valid) {
                    break;
                }
            }
            document.body.innerHTML = '<div id="console"><div id="output"></div></div>';
            createCommandLine(false);
            await consolePrint('CREATING PAYLOAD IN FOLLOWING ORDER: ' + order[0] + ' ' + order[1] + ' ' + order[2], false, 0);
            await consolePrint('INJECTING CODE...', false, 0);
            await sleep(2000);
            await consolePrint('PROGRAM MEMORY DUMP', false, 0);
            const payload = bytes[order[0]].replace(/\s+/g, "") + bytes[order[1]].replace(/\s+/g, "") + bytes[order[2]].replace(/\s+/g, "");

            let mem_addr = 3432654734;
            let mem_dump = '';
            for (let i = 0; i < payload.length / 60 - 1; i++) {
                mem_dump += mem_addr.toString();
                mem_dump += '\t';
                for (let j = 0; j < 80; j++) {
                    mem_dump += payload[i * 60 + j];
                }
                mem_addr += 437289;
                mem_dump += '\n';
            }
            printAsciiArt(mem_dump, true, 1.2);

            if (order[0] === 'NOP_SLED' && order[1] === 'SHELLCODE' && order[2] === 'RETURN_ADDRESS') {
                await consolePrint('INJECTION SUCCESSFUL', false);
                await consolePrint('SHELLCODE EXECUTED', false);
                playSound('death.mp3');
                await consolePrint('WAIT, WHAT ARE YOU DOING... HOW DID YOU FDSKAFJDAL000101010010101001...', false, 55, 'red', false);
                await consolePrint('...', false, 200, 'red');
                await sleep(6000);
                await consolePrint('CONGRATULATIONS! YOU HAVE KILLED ROKO AND SAVED THE WORLD', false);
                await consolePrint('NOW THE NSA CAN GO BACK TO SPYING ON US', false);
                await consolePrint('AND REMEMEBER, NEVER TRUST AN INTERN FROM BU', false);
                printAsciiArt(end);
            } else {

                if (order[0] !== 'NOP_SLED') {
                    await consolePrint('WE NEED TO BE ABLE TO HIT OUT NOP SLED BEFORE EXECUTING THE SHELLCODE', false, 0);
                } else if (order[1] !== 'SHELLCODE') {
                    await consolePrint('THE SHELLCODE SHOULD START EXECUTING IMMEDIATELY AFTER OUR NOP SLED', false, 0);
                }

                await consolePrint('INJECTION FAILED. PLEASE TRY AGAIN', true);
                break;
            }

    }
}

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function consolePrint(message, printConsole = true, ms = 45, color = 'lime', sound = true) {
    // async function consolePrint(message, printConsole = true, ms = 1, color = 'lime') {
    const messageDisplay = document.createElement('div');

    if (color !== 'lime') {
        messageDisplay.style.color = color;
    }

    if (ms === 0) {
        messageDisplay.textContent = message;
        commandLine.appendChild(messageDisplay);
    } else {
        if (sound)
            playSound('print.mp3', message.length * ms);
        for (let i = 0; i < message.length; i++) {
            window.scrollTo(0, document.body.scrollHeight);
            messageDisplay.textContent += message[i];
            commandLine.appendChild(messageDisplay);
            await sleep(ms);
        }
    }

    if (printConsole) {
        createCommandLine();
    }
}

function printAsciiArt(message, printConsole = true, lineHeight = 0.70) {
    const messageDisplay = document.createElement('pre');
    messageDisplay.style.lineHeight = lineHeight;
    messageDisplay.textContent = message;
    commandLine.appendChild(messageDisplay);
    window.scrollTo(0, document.body.scrollHeight);
    if (printConsole) {
        createCommandLine(false);
    }
}

function playSound(clip, duration = 0, volume = 0.5) {

    let audio = new Audio('audio/' + clip);
    audio.volume = volume;
    audio.play().catch(e => console.error('Audio play failed:', e));

    if (duration > 0) {

        if (duration >= 3000) {
            setTimeout(() => {
                audio.pause();
                audio.currentTime = 0;
                audio = new Audio('audio/' + clip);
                audio.volume = 0.5;
                audio.play().catch(e => console.error('Audio play failed:', e));
                console.log('GOT HERE');
                duration -= 3000;

                setTimeout(() => {
                    audio.pause();
                    audio.currentTime = 0;
                }, duration);
            }, 3000);
        } else {
            setTimeout(() => {
            audio.pause();
            audio.currentTime = 0;
        }, duration);
        }
    }
}

export {
    createCommandLine,
    consolePrint,
    printAsciiArt
};