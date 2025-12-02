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

const editViteConfig = (clientappPath) => {
    process.chdir(clientappPath);
    const textToInsert = `\n  server: { \n    open: true,// This will open the browser automatically\n  },`;
    try {
    fs.readdir(clientappPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    const foundFile = files.find(file => file.includes("vite.config"));
    if (foundFile) {
        console.log(`File "${foundFile}" found in "${clientappPath}"`);
        const viteConfigPath = `${clientappPath}/${foundFile}`;
        // Edits Vite Config to automatically open window with frontend

        // 1. Read the content from the source file
        // Use readFileSync for synchronous reading
        const fileContent = fs.readFileSync(viteConfigPath, 'utf8');
        console.log(`Successfully read content from: ${viteConfigPath}`);

        // 2. Find the index of the first comma (",")
        const firstCommaIndex = fileContent.indexOf(',');
        if (firstCommaIndex === -1) {
        console.log('No comma found in the file. No changes made.');
        } else {
            // 3. Split the content into two parts: before and after the comma
            const partBefore = fileContent.substring(0, firstCommaIndex + 1); // +1 to include the comma itself
            const partAfter = fileContent.substring(firstCommaIndex + 1);

            // 4. Combine the parts with the new text inserted in the middle
            const newContent = partBefore + textToInsert + partAfter;

            // 5. Write the modified content back to the file (overwriting the original)
            fs.writeFileSync(viteConfigPath, newContent, 'utf8');
            console.log(`Successfully inserted text after the first comma in ${viteConfigPath}`);
        }
    } else {
        console.log(`File "${targetFileName}" not found in "${directoryPath}"`);
    }
    })
    } catch (error) {
    console.error("An error occurred during file modification:");
    console.error(error.message);
    }
}

const editNetLaunchSettings = (apiPath) => {
    process.chdir(apiPath);
    const netLaunchPath = `${apiPath}/Properties/launchSettings.json`;
    const textToInsert = `"launchBrowser": true,\n      "launchUrl": "swagger",`;
    try {
    // Edits .net launch settings to automatically open window with swagger page
    const fileContent = fs.readFileSync(netLaunchPath, 'utf8');
    console.log(`Successfully read content from: ${netLaunchPath}`);

    const newContent = fileContent.replaceAll(`"launchBrowser": false,`,textToInsert);

    fs.writeFileSync(netLaunchPath, newContent, 'utf8');
    console.log(`Successfully edited api launchsettings.json at: ${netLaunchPath}`);
    } catch (error) {
    console.error("An error occurred during file modification:");
    console.error(error.message);
    }
}

const editWelcomePage = (clientappPath) => {
    process.chdir(clientappPath);
    const srcPath = `${clientappPath}/src`;
    const textToInsert = `🟪 ASP NET + Vite`;
    try {
    fs.readdir(srcPath, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }
    
    const foundFile = files.find(file => file.includes("App") && !file.includes("App.css"));

    if (foundFile) {
        console.log(`File "${foundFile}" found in "${srcPath}"`);
        const appPath = `${srcPath}/${foundFile}`;
         // Edits .net launch settings to automatically open window with swagger page
        const fileContent = fs.readFileSync(appPath, 'utf8');
        console.log(`Successfully read content from: ${appPath}`);

        const newContent = fileContent.replaceAll(`Vite`,textToInsert);

        fs.writeFileSync(appPath, newContent, 'utf8');
        console.log(`Successfully edited App file at: ${appPath}`);
    } else {
        console.log(`File "${targetFileName}" not found in "${directoryPath}"`);
    }
    });
    } catch (error) {
    console.error("An error occurred during file modification:");
    console.error(error.message);
    }
}

module.exports = { createProjectFiles,addCustomNPMCommand,installClientappDependancies,addSwaggerUIPackage,overwriteProgramFile,editViteConfig,editNetLaunchSettings,editWelcomePage};