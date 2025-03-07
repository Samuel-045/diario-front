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

  const mudarPaginaCadastro = () => { navigate("/cadastro") }

  async function LerDadosLogin() {
    try{
      let body = {
        "nome": userName,
        "senha": userPassword
      }
  
      let resp = await axios.post('http://localhost:3010/', body)
      setDadosLogin(resp.data)
    }
    catch(erro){
      alert(erro)
    }
    
  }

  useEffect(() => {
    if (dadosLogin.condicao === true) {
      localStorage.setItem("ID",dadosLogin.id)
      navigate('/todasNotas')
    }
  },[dadosLogin, navigate])

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

        <button onClick={LerDadosLogin}> Logar </button>

      </div>
    </div>
  );
}
