# Zustand in Action: Building a Todo List Application

The goal of this concept page is to guide you through the development of a Todo List application using React for the user interface and Zustand for efficient state management. This project is designed to provide a practical understanding of building interactive web applications using modern tools and practices.

#### Concept Overview:

Develop a Todo List application with basic functionalities like adding, deleting, and toggling tasks as done or not done using Zustand and React.

Topics:

* Setting up the project environment  
* Setting up your React project with Tailwindcss  
* Creating and managing a Zustand store  
* Building React components  
* Integrating Zustand with React

Learning Objectives:

* Implement features in a Todo List application such as adding, deleting, and toggling todos as done or not done.  
* Set up tailwindcss in a new React project  
* Connect Zustand state management to React components effectively.

#### Detailed Explanation

##### Setting Up Your Project

Create a new React project and install necessary packages:

npm create vite@latest task-tracker \-- \--template react  
cd task-tracker

Install TailwindCSS then generate your tailwind.config.js and postcss.config.js files

npm install \-D tailwindcss postcss autoprefixer  
npx tailwindcss init \-p

Open tailwind.config.js and add the paths to your template files

/\*\* @type {import('tailwindcss').Config} \*/  
export default {  
  content: \[  
    "./index.html",  
    "./src/\*\*/\*.{js,ts,jsx,tsx}",  
  \],  
  theme: {  
    extend: {},  
  },  
  plugins: \[\],  
}

Add the tailwind directives to your css. Replace all the code inside index.css with the following:

@tailwind base;  
@tailwind components;  
@tailwind utilities;

Install Zustand

npm install zustand

Run your application:

npm run dev

##### Setting Up Zustand Store

* Create a file named useTaskStore.js in the src/store folder to manage the state of tasks.  
* Create a file named useMessageStore.js in the src/store folder to manage success and error messages.

##### Message Store (useMessageStore.js)

Manages messages for user notifications. This includes setting success and error messages based on different actions.

import { create } from 'zustand';

const useMessageStore \= create((set) \=\> ({  
  message: '',  
  messageType: '', // 'success' or 'error'  
  setMessage: (message, type \= 'success') \=\> set({ message, messageType: type }),  
  clearMessage: () \=\> set({ message: '', messageType: '' }),  
}));

export default useMessageStore;

#### Role of useMessageStore

1. Separation of Concerns when handling error, it might be an error when a fetch fails or unexpected input is inserted.  
2. Centralized Message Management for handling messages both success and error messages  
3. Simplifies Debugging and Maintenance:

##### Creating your Snackbar Component

Create a file in src/components and name it Snackbar.jsx

This component provides visual feedback through messages. It listens to the message state in the store and displays notifications accordingly.

import { useEffect, useState } from 'react';  
import useMessageStore from '../store/messageStore';

function Snackbar() {  
  const \[message, setMessage\] \= useState('');  
  const \[messageType, setMessageType\] \= useState('');

  useEffect(() \=\> {  
    const unsubscribe \= useMessageStore.subscribe(  
      ({ message, messageType }) \=\> {  
        setMessage(message);  
        setMessageType(messageType);  
        const timer \= setTimeout(() \=\> {  
          setMessage('');  
          setMessageType('');  
        }, 3000);  
        return () \=\> clearTimeout(timer);  
      },  
      state \=\> \[state.message, state.messageType\]  
    );

    return () \=\> unsubscribe();  
  }, \[\]);

  return (  
    \<div className={\`fixed bottom-4 left-1/2 transform \-translate-x-1/2 ${messageType \=== 'success' ? 'bg-green-700' : 'bg-red-700'} bg-opacity-70 p-4 rounded text-white\`}\>  
      {message && \<p\>{message}\</p\>}  
    \</div\>  
  );  
}

export default Snackbar;

#### Task Store (useTaskStore.js)

The useTaskStore utilizes useMessageStore for setting messages related to task operations. Here’s a breakdown of how messages are integrated into task operations:

* Adding a Task:  
  * If the task title is empty, it sets an error message indicating that the task title cannot be empty.  
  * On successful addition of a task, it sets a success message.  
* Removing a Task:  
  * Sets a success message once a task is successfully removed.  
  * Toggling a Task:  
  * While the toggling the status of a task  
* Fetching Tasks:  
  * Sets a success message when tasks are fetched successfully.  
  * Sets an error message if there is an issue during the fetch operation.

import create from 'zustand';  
import useMessageStore from './messageStore';

const useTaskStore \= create((set) \=\> ({  
  tasks: \[\],  
  addTask: (task) \=\> {  
    set((state) \=\> ({ tasks: \[...state.tasks, task\] }));  
  },  
  removeTask: (id) \=\> {  
    set((state) \=\> ({ tasks: state.tasks.filter(task \=\> task.id \!== id) }));  
  },  
  toggleTask: (id) \=\> {  
    set((state) \=\> ({  
      tasks: state.tasks.map(task \=\>  
        task.id \=== id ? { ...task, completed: \!task.completed } : task  
      )  
    }));  
  },  
  fetchTasks: async () \=\> {  
    try {  
      const response \= await fetch('https://jsonplaceholder.typicode.com/todos');  
      const data \= await response.json();  
      set({ tasks: data.slice(0, 5\) });  
      useMessageStore.getState().setMessage('Tasks fetched successfully', 'success');  
    } catch (error) {  
      console.error('Error fetching tasks:', error);  
      useMessageStore.getState().setMessage('Error fetching tasks', 'error');  
    }  
  },  
}));

export default useTaskStore;

#### TaskForm Component (TaskForm.jsx)

The TaskForm component is a functional React component that allows users to input and submit new tasks. It uses the useState hook to manage the text input and the useTaskStore hook from Zustand to add tasks to the global state. Here’s a brief overview of its functionality:

* useState Hook: Initializes and updates the input field’s text.  
* useTaskStore: Accesses the addTask function from Zustand to handle adding new tasks.  
* Form Handling: Uses handleSubmit to prevent default form behavior, add the task, and reset the input field on submission.

Create a file called TaskForm.jsx inside src/components

import { useState } from 'react';  
import useTaskStore from '../store/useTaskStore';

const TaskForm \= () \=\> {  
  const \[text, setText\] \= useState('');  
  const addTask \= useTaskStore(state \=\> state.addTask);

  const handleSubmit \= (e) \=\> {  
    e.preventDefault();  
    addTask({ id: Date.now(), title: text, completed: false });  
    setText('');  
  };

  return (  
    \<form onSubmit={handleSubmit} className="mb-4"\>  
      \<input   
        type="text"   
        value={text}   
        onChange={(e) \=\> setText(e.target.value)}   
        placeholder="Enter task..."   
        className="p-2 mr-2 w-60 border rounded-md border-gray-300"  
      /\>  
      \<button type="submit" className="p-2 rounded-md bg-green-500 text-white"\>  
        Add Task  
      \</button\>  
    \</form\>  
  );  
}

export default TaskForm;

### TaskList Component (TaskList.jsx)

The TaskList component is a React component that uses the Zustand store to display and manage a list of tasks. It allows users to toggle completion status and remove tasks via interactive elements:

* Integration with Zustand: Accesses tasks, removeTask, and toggleTask from the Zustand store to manage the tasks list.  
* List Rendering: Tasks are listed with checkboxes to toggle completion and buttons to remove them.  
* Styling: Uses Tailwind CSS for styling, applying a line-through decoration for completed tasks.

Create a component called TaskList.jsx inside src/components

import useTaskStore from '../store/useTaskStore';

const TaskList \= () \=\> {  
  const { tasks, removeTask, toggleTask } \= useTaskStore();

  return (  
    \<div\>  
      \<h2 className="text-lg font-semibold mb-4 text-gray-700"\>Task List\</h2\>  
      \<ul className="list-none p-0"\>  
        {tasks.map(task \=\> (  
          \<li key={task.id} className={\`flex items-center mb-2 p-2 rounded-md bg-gray-100\`}\>  
            \<span className={\`flex-grow mr-4 ${task.completed ? 'line-through' : ''}\`}\>  
              {task.title}  
            \</span\>  
            \<input  
              type="checkbox"  
              checked={task.completed}  
              onChange={() \=\> toggleTask(task.id)}  
              className="mr-2 h-4 w-4 text-green-500 cursor-pointer"  
            /\>  
            \<button  
              onClick={() \=\> removeTask(task.id)}  
              className="bg-red-500 text-white rounded-md py-1 px-2 cursor-pointer"  
            \>  
              Remove  
            \</button\>  
          \</li\>  
        ))}  
      \</ul\>  
    \</div\>  
  );  
}

export default TaskList;

### Main App Component (App.jsx)

The App component in the code provided acts as the main container for a Task Tracker application built using React. Here’s a brief overview of its structure and functionality:

1. Structure:  
   a. The App component organizes the user interface into a centralized container, using CSS classes from Tailwind CSS for layout and styling. This ensures the app is visually centered on the screen and has a clean, modern look.  
2. Components Included:  
   a. TaskForm: A component where users can input and submit new tasks.  
   b. TaskList: A component that displays the current list of tasks with options to toggle their completion status and delete them.  
   c. Snackbar: A component used for displaying notifications or messages to the user, enhancing the interactivity and responsiveness of the application.

import TaskList from './components/TaskList';  
import TaskForm from './components/TaskForm';  
import Snackbar from './components/snackbar';

const App \= () \=\> {  
  return (  
    \<div className="flex justify-center items-center h-screen"\>  
      \<div className="w-96 p-6 rounded-lg shadow-md bg-white text-center"\>  
        \<div className="mb-6"\>  
          \<h1 className="text-2xl font-semibold"\>Task Tracker\</h1\>  
        \</div\>  
        \<div className="mb-4"\>  
          \<TaskForm /\>  
          \<TaskList /\>  
        \</div\>  
         \<Snackbar /\>  
      \</div\>  
    \</div\>  
  );  
}

export default App;

#### Practice Exercise

1. Update the TaskList component to display incomplete tasks at the top and completed tasks at the bottom. Hint: Sort the tasks array based on completion status within the useTaskStore whenever a toggle occurs.  
2.  Implement Exception Handling and Validation. Enhance the Todo List application with  
   a. Validation: Check if the task name is empty before adding a task. Show an error message if it is.  
   b. Exception Handling: Wrap task operations (add, delete, toggle) with try-catch blocks. Display appropriate error messages if an operation fails.  
3. Implement Data Persistence

