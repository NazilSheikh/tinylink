import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Stats from './pages/Stats';

export default function App(){
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow p-4">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-xl font-semibold">TinyLink</h1>
          </div>
        </header>
        <main className="container mx-auto max-w-4xl p-4">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/code/:code" element={<Stats />} />
          </Routes>
        </main>
        <footer className="text-center p-4 text-sm text-gray-500">
          Built with MERN + Tailwind
        </footer>
      </div>
    </BrowserRouter>
  );
}
