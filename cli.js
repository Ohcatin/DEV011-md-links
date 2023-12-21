#!/usr/bin/env node

const mdLinks = require("./index");

// Obtener argumentos desde la línea de comandos
const [archive, ...args] = process.argv.slice(2);
const options = {
  validate: args.includes('--validate'),
  stats: args.includes('--stats')
};

mdLinks(archive, options)
  .then((result) => {
    console.log(result);
  })
  .catch(error => console.error(error.message));
