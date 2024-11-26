import { createRoot } from 'react-dom/client';
import { ToDoWall } from './components/ToDoWall/ToDoWall';

const container = document.getElementById('root');
if (!container) throw new Error('Root container is missing!');

const root = createRoot(container);
root.render(
	<ToDoWall/>
);