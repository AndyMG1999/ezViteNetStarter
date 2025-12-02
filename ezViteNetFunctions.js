const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const createProjectFiles = (viteExecution,aspNetExecution) => {
    try {
    const viteOut = execSync(viteExecution);
    console.log(`Vite Out: ${viteOut.toString()}`);
    const netOut = execSync(aspNetExecution);
    console.log(`ASP.NET API Out: ${netOut}`)
    } catch (error) {
    console.error(`Error executing command: ${error.message}`);
    }
}

const installClientappDependancies = (clientappPath) => {
    process.chdir(clientappPath);
    try {
    console.log("Installing Dependencies");
    const npmInstallOut = execSync("npm install");
    console.log(`npm install Out: ${npmInstallOut.toString()}`);
    } catch (error) {
    console.error(`Error executing command: ${error.message}`);
    }
}

const addCustomNPMCommand = (projectName) => {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = {
    name: projectName,
    version: "1.0.0",
    description: "",
    scripts: {
        "dev": `(cd clientapp && npm run dev -- --port 7016) & (cd api && dotnet watch run -- --urls "http://localhost:1999")`,
    },
    };

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

const addSwaggerUIPackage = (apiPath) => {
    process.chdir(apiPath);
    try {
    console.log("Now adding SwaggerUI to dotnet...");
    const swaggerUIOout = execSync("dotnet add package Swashbuckle.AspNetCore");
    console.log(`swaggerUI Out: ${swaggerUIOout.toString()}`);
    } catch (error) {
    console.error(`Error executing command: ${error.message}`);
    }
}

const overwriteProgramFile = (targetFilePath) => {
    console.log("Overwriting Program.cs file...");
    const currentWorkingDirectory = __dirname;
    const sourceFilePath = path.join(currentWorkingDirectory, "ezProgramTemplate.cs");
    try {
    // 1. Read the content from the source file
    // Use readFileSync for synchronous reading
    const fileContent = fs.readFileSync(sourceFilePath, 'utf8');
    console.log(`Successfully read content from: ${sourceFilePath}`);

    // 2. Write the content to the destination file
    // This overwrites the destination file entirely
    fs.writeFileSync(targetFilePath, fileContent, 'utf8');
    console.log(`Successfully replaced content in: ${targetFilePath}`);
    } catch (error) {
    console.error("An error occurred during file replacement:");
    console.error(error.message);
    }
}

module.exports = { createProjectFiles,addCustomNPMCommand,installClientappDependancies,addSwaggerUIPackage,overwriteProgramFile};