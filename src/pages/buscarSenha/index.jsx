import "./index.css"
import Campo from "../../components/camposElabel"
import { useState } from "react"

export default function BuscarSenha(){
    let [userEmail, setUserEmail] = useState("")

    const rxEmail = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/
    let condEmail

    return(
        <div className="buscarSenha-geral">

            <header>
                <h1> RECUPERAÇÃO DO LOGIN </h1>
            </header>

            <div className="conteudo">

                <main className="campos">

                    <div className="campoEmail">

                        <Campo id={"CmUserEmail"} textoLabel={"Email"} tipo={"email"} funcaoSet={setUserEmail} />
                        
                    </div>
                    <p>Sabe os dados do seu login? <a href="/"> REALIZAR LOGIN </a></p>
                    <p>Perdeu o acesso ao email cadastrado? <a href=""> ALTERAR EMAIL </a></p>
                    <p>Deseja criar um novo perfil? <a href="/cadastro"> CRIAR NOVO PERFIL </a></p>

                </main>

                <button> Enviar dados ao email </button> 

            </div>


        </div>
    )
}