import "./index.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import toast, { Toaster } from 'react-hot-toast'

import Campo from "../../components/camposElabel"

export default function Cadastro() {
    let [dadosLogin,setDadosLogin] = useState({})
    let [userEmail, setUserEmail] = useState("")
    let [userName, setUserName] = useState("")
    let [userPassword, setUserPassword] = useState("")
    let [userPassword_confirm, setUserPassword_confirm] = useState("")
    
    const rxNome = /^[A-Za-z0-9]+$/
    let condNome
    const rxEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    let condEmail

    const telaNotas = () => { navigate('/todasNotas')}

    const navigate = useNavigate()

    function notificacaoErro(erro) {
        toast.error(erro.message)
      }

    async function cadastro(){
        try{
            let body = {
                "email":userEmail,
                "nome":userName,
                "senha":userPassword
            }

            if(body.email==="" || body.nome==="" || body.senha===""){
                throw new Error("Todos os campos devem ser preenchidos")
            }

            condEmail = rxEmail.test(userEmail)
            condNome = rxNome.test(userName)
            if(userPassword !== userPassword_confirm || !condEmail || !condNome){
                throw new Error("Digite dados válidos")
            }
            
            let resp = await axios.post('http://localhost:3010/cadastro', body)
            setDadosLogin(resp.data)
            telaNotas()
        }
        catch(erro){
            notificacaoErro(erro)
        }
    }

    useEffect(() => {
        if(userPassword === userPassword_confirm && condEmail && condNome){
            if (dadosLogin.condicao === true) {
                localStorage.setItem("ID",dadosLogin.id)
                navigate('/todasNotas')
            }
        }
      },[dadosLogin, navigate])

    return (
        <div className="cadastro-geral">
            <Toaster></Toaster>

            <header>
                <h1> Cadastro </h1>
            </header>

            <div className="conteudo">

                <main className="campos">

                    <Campo id={"CmUserEmail"} textoCampo={"Digite seu email"} textoLabel={"Email"} tipo={"email"} funcaoSet={setUserEmail} />
                    <Campo id={"CmUserName"} textoCampo={"Digite o nome que deseja colocar na sua conta"} textoLabel={"Usuário"} tipo={"text"} funcaoSet={setUserName} />
                    <Campo id={"CmUserPassword"} textoCampo={"Digite a senha"} textoLabel={"Senha"} tipo={"password"} funcaoSet={setUserPassword} />
                    <Campo id={"CmUserPasswordConfir"} textoCampo={"Confirme a senha"} textoLabel={"Confirmação da Senha"} tipo={"password"} funcaoSet={setUserPassword_confirm} />

                    <p>Já tem conta? <a href="/">REALIZAR LOGIN</a></p>
                    
                </main>

                <button onClick={cadastro}> Criar Login </button> 

            </div>

        </div>
    )
}