import React from 'react';
import TodoList from '../components/TodoList';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-lg sm:max-w-xl w-full p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">Persoonlijke Hub - Takenlijst</h1>
        <TodoList />
      </div>
    </div>
  );
};

export default HomePage;
