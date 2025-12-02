#!/usr/bin/env node
    const { createProjectFiles,addCustomNPMCommand,installClientappDependancies,addSwaggerUIPackage,overwriteProgramFile } = require('./ezViteNetFunctions');
    const fs = require('node:fs');
    const path = require('node:path');
    const args = process.argv.slice(2);
    const folderName = args[0];
    const clientappFolderName = "clientapp";
    const apiFolderName = "api";
    const viteExecution = `npm create vite@latest ${clientappFolderName} -- --template ${args[1] && !args[1].startsWith("-")?args[1]:"react"}`;
    const aspNetExecution = `dotnet new webapi -n ${apiFolderName} `;

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
            addCustomNPMCommand(folderName);
            installClientappDependancies(clientappPath);
            addSwaggerUIPackage(apiPath);
            overwriteProgramFile(apiPath+"/Program.cs");
        }
        });
    } else {
        console.log(`Folder '${folderName}' already exists.`);
    }
    });
    else{
        createProjectFiles(viteExecution,aspNetExecution);
    }