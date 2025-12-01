#!/usr/bin/env node

    const { execSync } = require('child_process');
    const args = process.argv.slice(2);

    console.log("Hello! Creating Custom EZVN Project!");
    console.log("Arguments passed:", args);

    try {
    const viteOut = execSync(`npm create vite@latest ${args[1]?args[1]+"-clientapp":"clientapp"} -- --template ${args[0]??"react"}`);
    console.log(`Vite Out: ${viteOut.toString()}`);
    const netOut = execSync(`dotnet new webapi -n ${args[1]?args[1]+"-api":"api"} `);
    console.log(`ASP.NET API Out: ${netOut}`)
    } catch (error) {
    console.error(`Error executing command: ${error.message}`);
    }

    // Here, you would add your project scaffolding logic.
    // This could involve:
    // - Prompting the user for project details (e.g., project name, features)
    // - Copying template files from a 'template' directory within your package
    // - Installing dependencies with 'npm install' or 'yarn install'
    // - Initializing a Git repository