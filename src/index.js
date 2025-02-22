import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import './index.css';

import Home from './pages/login-cadastro';
import Ler from './pages/lerNotas';
import CLE from './pages/fazerNotas';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Home}></Route>
        <Route path='/todasNotas' Component={Ler}></Route>
        <Route path='/nota/criar' Component={CLE}></Route>{/*Criar, Ler e Editar*/}
        <Route path='/nota/ler/:id' Component={CLE}></Route>
        <Route path='/nota/atualizar/:acao/:id' Component={CLE}></Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);


