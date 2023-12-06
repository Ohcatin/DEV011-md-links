const fs = require('fs').promises;
const path = require('path');
const {
  isAbsolutePath,
  convertAbsolutePath,
  verifyExistence,
  isArchiveMarkdown,
  readFiles,
  findLinks,
} = require("../src/functions.js");

const mdLinks = require('../src/index.js');
describe('mdLinks', () => {
    it('Deberia devolver una promesa', () => {
      const result = mdLinks('prueba.md');
      expect(result).toBeInstanceOf(Promise);
    });
  
  });

describe('convertAbsolutePath', () =>{
  it('Si la ruta es absoluta, devolver la ruta sin cambios',() =>{
      const absolutePath = path.normalize('C:/Users/Catita/Documents/DEV011-md-links/archivos/prueba.md');
      expect(convertAbsolutePath(absolutePath)).toBe(absolutePath);
  })
  it('Si la ruta no es absoluta, devolver la ruta relativa y retornarla', () =>{
      const relativePath = 'archivos/prueba.md';
      const expectedAbsolutePath = path.resolve(relativePath);
      expect(convertAbsolutePath(relativePath)).toBe(expectedAbsolutePath);
  })
})

describe('isArchiveMarkdown', () => {
  it('Debería devolver true para una ruta de archivo Markdown', () => {
    const markdownFilePath = '../archivos/prueba.md';
    expect(isArchiveMarkdown(markdownFilePath)).toBe(true);
  });


  it('Debería devolver false para una ruta sin extensión', () => {
    const noExtensionPath = '../src/functions.js';
    expect(isArchiveMarkdown(noExtensionPath)).toBe(false);
  });
});
