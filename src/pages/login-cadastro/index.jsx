import './index.css';
import axios from "axios"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'

import Campo from '../../components/camposElabel';

export default function Login() {
  let [dadosLogin,setDadosLogin] = useState({})
  let [userName, setUserName] = useState("")
  let [userPassword, setPassword] = useState("")
  const navigate = useNavigate()

  async function lerDadosLogin() {
    let body = {
      "nome": userName,
      "senha": userPassword
    }

    let resp = await axios.post('http://localhost:3010/', body)
    setDadosLogin(resp)
  }

  useEffect(() => {
    if (dadosLogin.data === true) {
      navigate('/todasNotas')
    }
  },[dadosLogin])

  return (
    <div className="login-geral">
      <header>
        <h1>login</h1>
      </header>

      <div className='conteudo'>

        <main className='campos'>
          <Campo id={"CmNomeUsuario"} textoLabel={"Usuário"} tipo={"text"} funcaoSet={setUserName} />
          <Campo id={"CmSenha"} textoLabel={"Senha"} tipo={"password"} funcaoSet={setPassword} />

          <p><a href=''> CRIAR LOGIN</a>  |  <a href=''>ESQUECI MINHA SENHA</a></p>
        </main>

        <button onClick={lerDadosLogin}> Logar </button>

      </div>
    </div>
  );
}
