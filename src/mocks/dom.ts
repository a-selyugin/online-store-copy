import { JSDOM } from 'jsdom';
import { fakeBody } from './fakeBody';
const dom = new JSDOM();
dom.window.document.body.innerHTML = fakeBody;
global.document = dom.window.document;
