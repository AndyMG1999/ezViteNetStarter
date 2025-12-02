# 🍰 EZ Vite Net Starter (EZVN) (⚠️WIP)

EZ Vite Net Starter is an npm package that runs a series of scripts that help you quickly start an Vite frontend with a ASP Net backend API!

This allows you to create a template without the need of Visual Studio and allows the flexibility to use the latest versions of both Vite and .Net (something that .Net's built-in templates struggle with).



## Requirements
EZVN requires that you have two things installed:
- [**Node.js**](https://nodejs.org/en)
- [**NET SDK**](https://dotnet.microsoft.com/en-us/download)
## Installation

Creating a project is as easy as one command!

```bash
  npm create ezvn project-name
```
EZVN will then create a project in the current directory using the default frontend framework **(ReactJS)**.\
\
You can also specify which Vite template you want by specifying AFTER the project name

```bash
  npm create ezvn project-name react-ts
```
This will make an **React+Typescript** Vite template with an ASP NET api!
## Run Project

Running your project is as easy as one line in the project directory!
```bash
  cd project-name    #...change directory into project
  npm run dev
```
EZVN will even automatically open the windows for your frontend and backend (SwaggerUI) on run!