import "@testing-library/jest-dom";
import 'isomorphic-fetch';
global.fetch = require('node-fetch');
global.window = new URL('http://localhost/');
jest.setTimeout(30000);
