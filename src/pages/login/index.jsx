import './index.css';
import axios from "axios"
import {useState } from 'react';
import { useNavigate } from 'react-router-dom'

import Campo from '../../components/camposElabel';

export default function Login() {
  let [dadosLogin, setDadosLogin] = useState({})
  let [userName, setUserName] = useState("")
  let [userPassword, setPassword] = useState("")
  const navigate = useNavigate()

  async function lerDadosLogin() {
    let body = {
      "nome":userName,
      "senha":userPassword
    }

    let resp = await axios.post('http://localhost:3010/', body)
    setDadosLogin(resp)
  }

  async function verificarLogin() {
    await lerDadosLogin()
    if(userName===dadosLogin.data[0].userName && userPassword===dadosLogin.data[0].senha){
      navigate('/todasNotas')
    }
  }


  return (
    <div className="login-geral">
      <div className='conteudo'>
        <header>
          <h1>login</h1>
        </header>

        <main className='campos'>
          <Campo id={"CmNomeUsuario"} textoLabel={"Nome de usuário"} tipo={"text"} funcaoSet={setUserName} />
          <Campo id={"CmSenha"} textoLabel={"Senha"} tipo={"password"} funcaoSet={setPassword} />
        </main>


        <button onClick={verificarLogin}> Logar </button>

      </div>
    </div>
  );
}
