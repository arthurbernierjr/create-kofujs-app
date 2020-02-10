#!/usr/bin/env node
const inquirer = require('inquirer');
const fs = require('fs');
const exec = require('child_process').exec;
const consola = require('consola');

const CHOICES = fs.readdirSync(`${__dirname}/templates`);

const QUESTIONS = [
    {
      name: 'project-choice',
      type: 'list',
      message: 'What project template would you like to generate?',
      choices: CHOICES
    },
    {
      name: 'project-name',
      type: 'input',
      message: 'Project name:',
      validate: function(input) {
        if (/^([A-Za-z\-\_\d])+$/.test(input)) {
        return true;
      } else {
          return 'Project name may only include letters, numbers, underscores and hashes.';
        }
      }
    }
  ];


  const CURR_DIR = process.cwd();

  inquirer.prompt(QUESTIONS)
    .then(answers => {
      const projectChoice = answers['project-choice'];
      const projectName = answers['project-name'];
      const templatePath = `${__dirname}/templates/${projectChoice}`;

      fs.mkdirSync(`${CURR_DIR}/${projectName}`);
      consola.info('Now building project just take a second to enjoy the process that is the kofu experience :)')
      consola.info('How is your day going by the way ? Think about how awesome it is that you live in a world full of computers and you can code')
      exec(`cd ${projectName } && npm install`, function (err, stdout, stderr ){
        if (err) {
          consola.error(`Dude heres your error: ${err}`)
          consola.info(`These are warnings but they could help you also : ${stderr}`)
          return;
        }else {
          consola.success(stdout);
          consola.success('Looks like we built your Kofu Project inside the directory you suggested, you can scroll up and see your output and any NPM Warnings :) ')
          consola.success(`It is finished.... well not really you still need to cd into the ${projectName} folder by running \n
            --------->   cd ${projectName}    <---------`)
          consola.success(`To help here is some useful info: \n
            you need to make sure you have gulp and yarn globally \n
            -----> npm i -g gulp-cli yarn <----- \n
            to start the app you can run \n
            ----> yarn watch <----- \n
            you can hack the project yourself by editing  \n
            ------------> .babelrc (controls babel), gulpfile.js (controls gulp), webpack.config.js (controls webpack) <--------------
            `)
            consola.success(`happy coding ....... `)
          return;
        }
      })
      createDirectoryContents(templatePath, projectName);
    });

    function createDirectoryContents (templatePath, newProjectPath) {
      const filesToCreate = fs.readdirSync(templatePath);

      filesToCreate.forEach(file => {
        const origFilePath = `${templatePath}/${file}`;

        // get stats about the current file
        const stats = fs.statSync(origFilePath);


        if (stats.isFile()) {
          const contents = fs.readFileSync(origFilePath, 'utf8');

          const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
          if (file === '.npmignore') {
            file = '.gitignore';
          }
          fs.writeFileSync(writePath, contents, 'utf8');

        } else if (stats.isDirectory()) {
          fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

          // recursive call
          createDirectoryContents(`${templatePath}/${file}`, `${newProjectPath}/${file}`);
        }
      });
    }
