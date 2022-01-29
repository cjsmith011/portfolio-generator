const inquirer = require(`inquirer`);
const promptUser = () => {
    return inquirer.prompt([
        {
            type: `input`,
            name: `name`,
            message: `What is your name?`,
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please share your name!');
                    return false;
                }
            }
        },
        {
            type: `input`,
            name: `github`,
            message: `Enter your GitHub username`,
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log('Please share your GitHub username!');
                    return false;
                }
            }
        },
        {
            type: `confirm`,
            name: `confirmAbout`,
            message: `Would you ike to share some information about yourself to include for readers?`,
            default: true
        },
        {
            type: `input`,
            name: `about`,
            message: `Provide some info about you!`,
            when: ({ confirmAbout }) => {
                if (confirmAbout) {
                    return true;
                } else {
                    return false;
                }
            }
        }
    ]);
};

const promptProject = portfolioData => {
    console.log(`
===========================
    Add a New Project     
===========================    
    `);
    //if there is no 'projects' array property, then create one
    if (!portfolioData.projects) {
        portfolioData.projects = [];
        }
    return inquirer
    .prompt([
        {
            type: 'input',
            name: `name`,
            message: `What is the name of your project?`,
            validate: projectnameInput => {
                if (projectnameInput) {
                    return true;
                } else {
                    console.log('Please share your project name!');
                    return false;
                }
            }
        },
        {
            type: `input`,
            name: `description`,
            message: `Share a brief description of your project.`
        },
        {
            type: `checkbox`,
            name: `languages`,
            message: `What languages did you use on this project? (Check all that apply)`,
            choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
        },
        {
            type: `input`,
            name: `link`,
            message: `Enter the GitHub link for your project. (Required)`,
            validate: linkInput => {
                if (linkInput) {
                    return true;
                } else {
                    console.log('Please share your GitHub link!');
                    return false;
                }
            }
        },
        {
            type: `confirm`,
            name: `feature`,
            message: `Would you like to feature this project?`,
            default: false
        },
        {
            type: `confirm`,
            name: `confirmAddProject`,
            message: `Would you like to enter another project?`,
            default: false
        }
    ])
        .then(projectData => {
            portfolioData.projects.push(projectData);
            if (projectData.confirmAddProject) {
                return promptProject(portfolioData);
            } else {
                return portfolioData;
            }
        });
};
    

// const fs = require('fs');
// const generatePage = require(`./src/page-template`);

// const pageHTML = generatePage(username, github);


// fs.writeFile('./index.html', pageHTML, err => {
//     if (err) throw err;
//     console.log('Portfolio complete! Check out index.html to see the output')
// });
promptUser()
    .then(promptProject)
    .then(portfolioData => {
        console.log(portfolioData);
    });
