import { useState, useEffect } from 'react';
import axios from 'axios';

// Set a base URL for all axios requests
const API_URL = 'http://localhost:3001/api';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // Fetch todos from the server when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${API_URL}/todos`, getAuthHeaders());
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return; // Prevent adding empty todos
    try {
      const response = await axios.post(`${API_URL}/todos`, { text: newTodo }, getAuthHeaders());
      setTodos([...todos, response.data]);
      setNewTodo(''); // Clear the input field
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const updateTodo = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/todos/${id}`, { completed }, getAuthHeaders());
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, completed: response.data.completed } : todo)));
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`${API_URL}/todos/${id}`, getAuthHeaders());
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  return (
    <div>
      <form onSubmit={addTodo} className="flex mb-4">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Voeg een nieuwe taak toe..."
          className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600">Toevoegen</button>
      </form>
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className={`flex items-center p-2 rounded-md ${todo.completed ? 'bg-gray-200' : 'bg-white'}`}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo.id, !todo.completed)}
              className="mr-2 h-4 w-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className={`flex-grow ${todo.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>{todo.text}</span>
            <button onClick={() => deleteTodo(todo.id)} className="text-red-500 hover:text-red-700">Verwijder</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
