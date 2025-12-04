#!/usr/bin/env node
    const { createProjectFiles,installConcurrently,addCustomNPMCommand,installClientappDependancies,addSwaggerUIPackage,overwriteProgramFile,editViteConfig,editNetLaunchSettings,editWelcomePage } = require('./ezViteNetFunctions');
    const fs = require('node:fs');
    const path = require('node:path');
    const args = process.argv.slice(2);
    const folderName = args[0];
    const clientappFolderName = "clientapp";
    const apiFolderName = "api";
    const viteExecution = `npm create vite@latest ${clientappFolderName} -- --template ${args[1] && !args[1].startsWith("-")?args[1]:"react"}`;
    const aspNetExecution = `dotnet new webapi -n ${apiFolderName} `;
    const green = '\x1b[32m'; // ANSI escape code for green text
    const bold = '\x1b[1m';   // ANSI escape code for bold text
    const reset = '\x1b[0m';

    console.log("Hello! Creating Custom EZVN Project!");
    console.log("Arguments passed:", args);

    const currentDirectory = process.cwd();
    const newFolderPath = path.join(currentDirectory, folderName);

    if(!args.includes("-noDir"))fs.access(newFolderPath, (error) => {
    if (error) {
        // Creates folder if it doesn't exist
        fs.mkdir(newFolderPath, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating folder:', err);
        } else {
            console.log(`Folder '${folderName}' created successfully!`);
            process.chdir(newFolderPath);
            createProjectFiles(viteExecution,aspNetExecution);
            console.log("Folder Created! Adding Custom npm script...");
            const clientappPath = path.join(newFolderPath,clientappFolderName);
            const apiPath = path.join(newFolderPath,apiFolderName);
            
            // Vite Configurations
            installConcurrently(newFolderPath);
            addCustomNPMCommand(folderName);
            //editViteConfig(clientappPath);
            editWelcomePage(clientappPath);

            // ASP NET Configurations
            addSwaggerUIPackage(apiPath);
            overwriteProgramFile(apiPath+"/Program.cs");
            editNetLaunchSettings(apiPath);
            // Initial npm install
            installClientappDependancies(clientappPath);
            
            process.on('exit', (code) => {
            console.log(bold+green+'\n\nSuccessfully built ezvn project!'+reset);
            console.log('\x1b[36m%s\x1b[0m', 'To run project, simply cd into project and run \'\x1b[1mnpm run dev\'.',"font-weight: bold;");
            });
        }
        });
    } else {
        console.log(`Folder '${folderName}' already exists.`);
    }
    });
    else{
        createProjectFiles(viteExecution,aspNetExecution);
    }