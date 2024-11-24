import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // Buscar tarefas
  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

  // Adicionar tarefa
  const addTask = () => {
    if (newTask.trim()) {
      axios.post('http://localhost:3001/tasks', { title: newTask })
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error(error));
      setNewTask('');
    }
  };

  // Alternar status da tarefa
  const toggleTask = (id, completed) => {
    axios.put(`http://localhost:3001/tasks/${id}`, { completed: !completed })
      .then(response => {
        setTasks(tasks.map(task => task._id === id ? response.data : task));
      })
      .catch(error => console.error(error));
  };

  // Remover tarefa
  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="Home">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <span
              style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
              onClick={() => toggleTask(task._id, task.completed)}
            >
              {task.title}
            </span>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;