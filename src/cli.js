const mdLinks = require("./index.js");

const args = process.argv.slice(2);
const archive = args[0];
const options = {
  validate: args.includes('--validate'),
  stats: args.includes('--stats')
};

mdLinks(archive, options)
  .then((result) => {
    console.log(result);
  })
  .catch(error => console.error(error.message));
