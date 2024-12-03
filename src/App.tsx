import { createRoot } from 'react-dom/client';
import { TodoList } from './components/TodoList/TodoList';

const container = document.getElementById('root');
if (!container) throw new Error('Root container is missing!');

const root = createRoot(container);
root.render(
	<TodoList/>
);