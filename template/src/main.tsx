import React from 'react';
import ReactDOM from 'react-dom/client';
import * as RSM from './rescriptmod.res.js';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <p>Hello from main.tsx</p>
    <RSM.make />
  </React.StrictMode>
)