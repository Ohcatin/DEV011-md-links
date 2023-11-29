const mdLinks = require('../src/cli.js');
const fs = require('fs').promises;
const path = require('path');
const {
  isAbsolutePath,
  convertAbsolutePath,
  verifyExistence,
  isArchiveMarkdown,
  readFiles,
  findLinks,
} = require("../src/index.js");

describe("mdLinks", () => {
  it('debería retornar una promesa', () => {
    expect(typeof mdLinks).toBe(typeof Promise);
  });
});

describe('mdLinks', () => {
  it('debería convertir ruta relativa a absoluta ', () => {
    const file = './README.md';
    const functionMdLinks = convertAbsolutePath(file)
    return functionMdLinks.then((result)=> {
      expect(result).toEqual(path.resolve(file));
    });
  });
})