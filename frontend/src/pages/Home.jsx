import React, { useState, useEffect } from 'react';
import axios from 'axios';
import trash from "../assets/trash-svgrepo-com.svg"
import complete from "../assets/complete.svg"
import "../style.css"
import { Link } from 'react-router-dom';

function Home() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');


  useEffect(() => {
    axios.get('http://localhost:3001/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error(error));
  }, []);

 
  const addTask = () => {
    if (newTask.trim()) {
      axios.post('http://localhost:3001/tasks', { title: newTask })
        .then(response => setTasks([...tasks, response.data]))
        .catch(error => console.error(error));
      setNewTask('');
    }
  };

  
  const toggleTask = (id, completed) => {
    axios.put(`http://localhost:3001/tasks/${id}`, { completed: !completed })
      .then(response => {
        setTasks(tasks.map(task => task._id === id ? response.data : task));
      })
      .catch(error => console.error(error));
  };


  const deleteTask = (id) => {
    axios.delete(`http://localhost:3001/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error(error));
  };

  return (
    <div className="d-flex justify-content-center align-items-center vw-100 vh-100 bg-secondary">
      <div className='h-75 w-50 p-3 border d-flex flex-column justify-content-center align-items-center gap-2 bg-white rounded overflow-y-scroll shadow-lg'>
          <h1>Tarefas</h1>
          <input
            className='form-control w-50 text-center'
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Adicionar uma tarefa"
          />
          <button className="btn btn-primary" onClick={addTask}>Adicionar</button>
          <ul className='d-flex flex-column list-style-none w-75 gap-2 list-group'>
              {tasks.map(task => (
                <li key={task._id} className='w-100 d-flex justify-content-between list-group-item shadow'>
                  <span
                    style={{ textDecoration: task.completed ? 'line-through' : 'none', cursor: 'pointer' }}
                  >
                    {task.title}
                  </span>
                  <div>
                    <button onClick={() => toggleTask(task._id, task.completed)} className='btn btn-success p-0 mx-1'><img src={complete} alt="" /></button>
                    <button onClick={() => deleteTask(task._id)} className='btn btn-danger p-0'><img src={trash} alt="" /></button>
                  </div>
                </li>
              ))}
            </ul>
        <Link to="/Admin">Gerenciar usuários</Link>
        </div>
      </div>
  );
}

export default Home;