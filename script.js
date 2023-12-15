import { consolePrint, createCommandLine, printAsciiArt } from './commandLine.js';

const title = `ooooooooo.             oooo                  o8o               ooo        ooooo\n                                
\`888   \`Y88.           \`888                  \`YP               \`88.       .888\'\n                                
 888   .d88'  .ooooo.   888  oooo   .ooooo.   '   .oooo.o       888b     d'888   .oooo.     oooooooo  .ooooo.  \n
 888ooo88P\'  d88\' \`88b  888 .8P\'   d88\' \`88b     d88(  \"8       8 Y88. .P  888  \`P  )88b   d'""7d8P  d88' \`88b\n 
 888\`88b.    888   888  888888.    888   888     \`"Y88b.        8  \`888'   888   .oP"888     .d8P'   888ooo888 \n
 888  \`88b.  888   888  888 \`88b.  888   888     o.  )88b       8    Y     888  d8(  888   .d8P'  .P 888    .o \n
o888o  o888o \`Y8bod8P' o888o o888o \`Y8bod8P'     8""888P'      o8o        o888o \`Y888""8o d8888888P  \`Y8bod8P' \n
                                                                                                        
`;

createCommandLine(false);
printAsciiArt(title, false);
consolePrint("PLEASE ENTER YOUR NAME");