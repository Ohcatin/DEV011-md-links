const fs = require('fs').promises;
const path = require('path');
const {
  convertAbsolutePath,
  verifyExistence,
  isArchiveMarkdown,
  readFiles,
  findLinks,
  validateLinks,
  statsLinks,
} = require("../functions.js");
const axios = require('axios');

jest.mock('axios');

const mdLinks = require('../index.js');
describe('mdLinks', () => {
    it('Deberia devolver una promesa', () => {
      const result = mdLinks('prueba.md');
      expect(result).toBeInstanceOf(Promise);
    });
  
  });

describe('convertAbsolutePath', () =>{
  it('Si la ruta es absoluta, devolver la ruta sin cambios',() =>{
      const absolutePath = 'C:/Users/Catita/Documents/DEV011-md-links/archivos/prueba.md';
      expect(convertAbsolutePath(absolutePath)).toBe(absolutePath);
  })
  it('Si la ruta no es absoluta, devolver la ruta relativa y retornarla', () =>{
      const relativePath = 'archivos/prueba.md';
      const expectedAbsolutePath = path.resolve(relativePath);
      expect(convertAbsolutePath(relativePath)).toBe(expectedAbsolutePath);
  })
})
describe("verifyExistence", () => {
  it("Debería devolver true para una ruta que existe", () => {
    const pathExists = verifyExistence('docs/03-milestone.md');
    expect(pathExists).toBe(true);
  });

  it("Debería devolver false para una ruta que no existe", async () => {
    const pathExists = await verifyExistence('docs/archivo_inexistente.md');
    expect(pathExists).toBe(false);
  });
});
describe('isArchiveMarkdown', () => {
  it('Debería devolver true para una ruta de archivo Markdown', () => {
    const markdownFilePath = 'archivos/prueba.md';
    expect(isArchiveMarkdown(markdownFilePath)).toBe(true);
  });


  it('Debería devolver false para una ruta sin extensión', () => {
    const noExtensionPath = 'src/functions.js';
    expect(isArchiveMarkdown(noExtensionPath)).toBe(false);
  });
});

describe("findLinks", () => {
  it("crea un objeto", () => {
    const links = findLinks("archivos/pruebauno.md");
    const result = [];
    expect(links).toEqual(result);
  });
  it("extrae los links", () => {
    const data =
    "[Modules: CommonJS modules - Node.js Docs](https://nodejs.org/docs/latest/api/modules.html)";
    const route =
      "C:/Users/Catita/Documents/DEV011-md-links/archivos/pruebauno.md";
    const links = findLinks(data, route);
    const result = [
      {
        href: "https://nodejs.org/docs/latest/api/modules.html",
        text: "Modules: CommonJS modules - Node.js Docs",
        file: "C:/Users/Catita/Documents/DEV011-md-links/archivos/pruebauno.md",
      },
    ];
    expect(links).toEqual(result);
  });
});

describe("validateLink", () => {
  it("valida los link con status y ok", async () => {
    axios.get.mockResolvedValue({ status: 200, ok: "ok" });
    const links = [
      {
        href: "https://nodejs.org/docs/latest/api/modules.html",
        text: "Modules: CommonJS modules - Node.js Docs",
        file: "C:/Users/Catita/Documents/DEV011-md-links/archivos/pruebauno.md",
      }
    ];
    const validate = await validateLinks(links);
    const result = [
      {
        href: "https://nodejs.org/docs/latest/api/modules.html",
        text: "Modules: CommonJS modules - Node.js Docs",
        file: "C:/Users/Catita/Documents/DEV011-md-links/archivos/pruebauno.md",
        status: 200,
        ok: "ok",
      }
    ];
    expect(validate).toEqual(result);
  });
});

describe("validateLink", () => {
  it("error en la solicitud", async () => {
    axios.get.mockRejectedValue({response: { status: 404 }});
    const links = [
      {
      href: "https://www.ejemploenlacefuera.com",
      text: "[Ejemplo enlace fuera de servicio",
      file: "C:/Users/Catita/Documents/DEV011-md-links/archivos/pruebauno.md",
      }
    ];
    const validate = await validateLinks(links);
    const result = [
      {
        href: "https://www.ejemploenlacefuera.com",
        text: "[Ejemplo enlace fuera de servicio",
        file: "C:/Users/Catita/Documents/DEV011-md-links/archivos/pruebauno.md",
        status: 404,
        ok: 'fail'
      }
    ];
    expect(validate).toEqual(result);
  });
});

describe('statsLinks', () =>{
  it ('muestra las estadisticas', async () =>{
    const data = [
      {
        href: "https://www.ejemploenlacefuera.com",
        text: "[Ejemplo enlace fuera de servicio",
        file: "C:/Users/Catita/Documents/DEV011-md-links/archivos/pruebauno.md",
        status: 404,
        ok: 'fail'
      }
    ]
    const links = await statsLinks(data);
    const result = { Total: 1, Unique: 1, Broken: 1 };
    expect(links).toEqual(result);


  })


})