import './index.css';
import axios from "axios"
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

import Campo from '../../components/camposElabel';

export default function Login() {
  let [dadosLogin, setDadosLogin] = useState({})
  let [userName, setUserName] = useState("")
  let [userPassword, setPassword] = useState("")
  const navigate = useNavigate()

  const mudarPaginaCadastro = () => { navigate("/cadastro") }

  function notificacaoErro(erro) {
    toast.error(erro.message)
  }

  async function LerDadosLogin() {
    try {
      let body = {
        "nome": userName,
        "senha": userPassword
      }

      if (body.nome === "" || body.senha == "") {
        throw new Error("Todos os campos devem ser preenchidos")
      }

      let resp = await axios.post('http://localhost:3010/', body)
      setDadosLogin(resp.data)

      if (dadosLogin == false) {
        throw new Error("Cadastro não encontrado")
      }
    }
    catch (erro) {
      notificacaoErro(erro)
    }

  }

  useEffect(() => {
    if (dadosLogin.condicao === true) {
      localStorage.setItem("ID", dadosLogin.id)
      navigate('/todasNotas')
    }
  }, [dadosLogin, navigate])

  return (
    <div className="login-geral">
    <Toaster></Toaster>
      <header>
        <h1>login</h1>
      </header>

      <div className='conteudo'>

        <main className='campos'>
          <Campo id={"CmNomeUsuario"} textoCampo={"Digite o nome do seu perfil"} textoLabel={"Usuário"} tipo={"text"} funcaoSet={setUserName} />
          <Campo id={"CmSenha"} textoCampo={"Digite sua senha"} textoLabel={"Senha"} tipo={"password"} funcaoSet={setPassword} />

          <p><a href='/cadastro'> CRIAR LOGIN</a>  |  <a href='/recuperarsenha'>ESQUECI MINHA SENHA</a></p>
        </main>

        <button onClick={LerDadosLogin}> Logar </button>

      </div>
    </div>
  );
}
