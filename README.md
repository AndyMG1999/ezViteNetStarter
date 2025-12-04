# 🍰 EZ Vite Net (EZVN) (⚠️WIP)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

EZ Vite Net is an npm package that runs a series of scripts that help you quickly start a Vite frontend with an ASP Net API backend!

This allows you to create a template without the need of Visual Studio and allows the flexibility to use the latest versions of both Vite and .Net (something that .Net's built-in templates struggle with).
## Requirements
EZVN requires that you have two things installed:
- [**Node.js**](https://nodejs.org/en)
- [**NET SDK**](https://dotnet.microsoft.com/en-us/download)
## Getting Started

Creating a project is as easy as one command!

```bash
  npm create ezvn@latest project-name
```
EZVN will then create a project in the current directory using the default frontend framework **(ReactJS)**.\
\
To specify which Vite template to create the project in, declare template **AFTER** project name:

```bash
  npm create ezvn@latest project-name react-ts
```
This will make a **React+Typescript** Vite template with an ASP NET api!
## Run Project

Running your project is as easy as one line in the project directory!
```bash
  cd project-name    #...change directory into project
  npm run dev
```
EZVN will even automatically open the browser windows for the frontend and backend (SwaggerUI)!
## Installed Tools
EZVN creates a new project with the following tools installed:
- [**Vite (client app and dev server)**](https://vite.dev)
- [**ASP NET Web API (api and dev server)**](https://dotnet.microsoft.com/en-us/apps/aspnet/apis)
- [**SwaggerUI (UI for web api)**](https://swagger.io/tools/swagger-ui/)
- [**Concurrently (npm package used to run multiple commands in a single terminal)**](https://www.npmjs.com/package/concurrently)