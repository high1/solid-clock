import 'virtual:uno.css';
import { render } from 'solid-js/web';
import { Clock } from 'Clock';

render(() => <Clock />, document.querySelector<HTMLDivElement>('#root'));