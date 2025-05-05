import React from 'react';
import './index.css';
import Pitch from './components/Pitch';
export default function App() {
  return (
   <div>
      <h1 className="text-3xl font-bold underline text-center">
        Football Dashboard
      </h1>
      <div className="flex justify-center items-center h-screen">
        <Pitch />
      </div>
   </div>
  )
}
