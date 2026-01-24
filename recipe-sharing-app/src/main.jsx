import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import useTaskStore from './store/useTaskStore';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

function TaskList() {
  // Use selectors for better performance
  const tasks = useTaskStore((state) => state.tasks);
  const toggleTask = useTaskStore((state) => state.toggleTask);

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id} onClick={() => toggleTask(task.id)}>
          {task.title} {task.completed ? '✅' : '❌'}
        </li>
      ))}
    </ul>
  );
}
