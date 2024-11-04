import 'index.css';
import { render } from 'solid-js/web';
import { ClockFace } from 'ClockFace';

const root = document.querySelector('#root');
if (root) render(() => <ClockFace />, root);
else throw new Error('#root element not found!');
