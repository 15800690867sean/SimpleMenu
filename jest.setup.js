import "@testing-library/jest-dom";
global.fetch = require('node-fetch');
global.window = new URL('http://localhost/');
jest.setTimeout(30000);
