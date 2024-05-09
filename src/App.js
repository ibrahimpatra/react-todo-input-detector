import React, { useState } from 'react';
import './App.css';
import { FaEdit, FaTrash } from 'react-icons/fa';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ label: '', description: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value
    });
  };

  const handleAddTodo = () => {
    if (newTodo.label.trim() === '') {
      alert('Please enter a label for the todo.');
      return; 
    }
    setTodos([...todos, { ...newTodo, showDescription: false }]);
    setNewTodo({ label: '', description: '' });
  };

  const detectDirection = (text) => {
    const arabicRegex = /[\u0600-\u06FF]/;
    return arabicRegex.test(text) ? 'rtl' : 'ltr';
  };

  const handleToggleDescription = (index) => {
    const updatedTodos = [...todos];
    updatedTodos[index].showDescription = !updatedTodos[index].showDescription;
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const handleEditTodo = (index) => {
    const todoToEdit = todos[index];
    setNewTodo({ label: todoToEdit.label, description: todoToEdit.description });
    handleDeleteTodo(index);
  };

  return (
    <div className="app">
      <h1>To-Do List</h1>
      <div className="todo-input">
        <input
          type="text"
          name="label"
          value={newTodo.label}
          placeholder="Label"
          onChange={handleInputChange}
          style={{ direction: detectDirection(newTodo.label) }}
        />
        <textarea
          name="description"
          value={newTodo.description}
          placeholder="Description"
          onChange={handleInputChange}
          style={{ direction: detectDirection(newTodo.description) }}
        ></textarea>
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo, index) => (
          <li
            key={index}
            style={{ direction: detectDirection(todo.label) }}
            onClick={() => handleToggleDescription(index)}
          >
            <span>{todo.label}</span>
            <div className="todo-actions" style={{ left: (detectDirection(todo.label) === 'rtl') ? '5px' : 'unset', right: (detectDirection(todo.label) === 'rtl') ? 'unset' : '5px' }}>
              <button className="todo-actions-edit" onClick={(e) => {
                e.stopPropagation();
                handleEditTodo(index);
              }}><FaEdit /></button>
              <button onClick={(e) => {
                e.stopPropagation();
                handleDeleteTodo(index);
              }}><FaTrash /></button>
            </div>
            {todo.showDescription && (
              <p className="todo-description">{todo.description}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
