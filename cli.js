#!/usr/bin/env node
    const fs = require('node:fs');
    const path = require('node:path');
    const { execSync } = require('child_process');
    const args = process.argv.slice(2);
    const folderName = args[0] ?? Error("Expected project name!");

    console.log("Hello! Creating Custom EZVN Project!");
    console.log("Arguments passed:", args);

    const currentDirectory = process.cwd();
    const newFolderPath = path.join(currentDirectory, folderName);

    fs.access(newFolderPath, (error) => {
    if (error) {
        // Creates folder if it doesn't exist
        fs.mkdir(newFolderPath, { recursive: true }, (err) => {
        if (err) {
            console.error('Error creating folder:', err);
        } else {
            console.log(`Folder '${folderName}' created successfully!`);
            process.chdir(newFolderPath);
            try {
            const viteOut = execSync(`npm create vite@latest ${args[0]?args[0]+"-clientapp":"clientapp"} -- --template ${args[1]??"react"}`);
            console.log(`Vite Out: ${viteOut.toString()}`);
            const netOut = execSync(`dotnet new webapi -n ${args[0]?args[0]+"-api":"api"} `);
            console.log(`ASP.NET API Out: ${netOut}`)
            } catch (error) {
            console.error(`Error executing command: ${error.message}`);
            }
        }
        });
    } else {
        console.log(`Folder '${folderName}' already exists.`);
    }
    });