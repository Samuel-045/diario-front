import "./index.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useState } from "react"

import Campo from "../../components/camposElabel"

export default function Cadastro() {
    let [userEmail, setUserEmail] = useState("")
    let [userName, setUserName] = useState("")
    let [userPassword, setUserPassword] = useState("")
    let [userPassword_confirm, setUserPassword_confirm] = useState("")
    const navigate = useNavigate()

    const mudarPaginaLogin = () => { navigate('/') }

    return (
        <div className="cadastro-geral">

            <header>
                <h1> Cadastro </h1>
            </header>

            <div className="conteudo">

                <main className="campos">

                    <Campo id={"CmUserEmail"} textoLabel={"Email"} tipo={"email"} funcaoSet={setUserEmail} />
                    <Campo id={"CmUserName"} textoLabel={"Usuário"} tipo={"text"} funcaoSet={setUserEmail} />
                    <Campo id={"CmUserPassword"} textoLabel={"Senha"} tipo={"password"} funcaoSet={setUserPassword} />
                    <Campo id={"CmUserPasswordConfir"} textoLabel={"Confirmação da Senha"} tipo={"password"} funcaoSet={setUserPassword_confirm} />

                    <p>Já tem conta? <a href="/">REALIZAR LOGIN</a></p>
                    
                </main>

                <button> Criar Login </button> 

            </div>
            
        </div>
    )
}