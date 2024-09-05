#!/usr/bin/env node
import path from "path";
import fs from "fs";
import inquirer from "inquirer";

inquirer.prompt([
    {
        name: "name",
        message: "Name",
        type: "input",
        default: "react-re-type-sample",
        validate(value: string) {
            const regex = /^[a-zA-Z][a-zA-Z0-9]{0,255}$/;
            return regex.test(value)
        },
    },
]).then(answers => {
    const cwd: string = process.cwd();
    const projectPath: string = path.resolve(cwd, answers["name"]);
    fs.mkdirSync(projectPath, { recursive: true });
    const templatePath: string = path.resolve(path.dirname(__dirname), "template");
    fs.cpSync(templatePath, projectPath, { recursive: true });
    try {
        const packageJsonLocation = path.resolve(projectPath, "package.json");
        const packageJson = JSON.parse(fs.readFileSync(packageJsonLocation, 'utf-8'));
        packageJson['name'] = answers["name"];
        fs.writeFileSync(packageJsonLocation, JSON.stringify(packageJson, null, 2));
        const rescriptJsonLocation = path.resolve(projectPath, "rescript.json");
        const rescriptJson = JSON.parse(fs.readFileSync(rescriptJsonLocation, 'utf-8'));
        rescriptJson['name'] = answers["name"];
        fs.writeFileSync(rescriptJsonLocation, JSON.stringify(rescriptJson, null, 2));
    } catch (ex) {
        console.log(`An error occured while editing the contents of project : ${ex}`)
    }
}).catch((exception) => {
    if (exception.isTtyError) {
        console.log("Failed to render prompt");
    } else {
        console.log("Error");
    }
})