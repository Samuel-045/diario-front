import './index.css'
import { AiOutlineRollback } from "react-icons/ai";

import axios from "axios"
import {useNavigate} from 'react-router-dom'

import Cards from '../../components/cards'
import { useEffect, useState } from 'react'

export default function LerNotas(){
    let[lista,setLista]=useState([])
    const navigate = useNavigate()

    const voltarLogin = () => { navigate('/') }
    const mudarPaginaCriar = () => { navigate('/nota/criar')  }
    const mudarPaginaLer = (id) => { navigate(`/nota/ler/${id}`) }
    const mudarPaginaEditar = (id) => { 
        let acao = 'a'
        navigate(`/nota/atualizar/${acao}/${id}`) 
    }
    
    async function excluirNota(id) {
        let resp = await axios.delete(`http://localhost:3010/notas/excluir/${id}`)

        lerDadosNotas()
    }

    async function lerDadosNotas(){
        let resp = await axios.get("http://localhost:3010/notas")
        setLista(resp.data)
    }

    useEffect(() =>{
        lerDadosNotas()
    }, [])

    return(
        <div className="lerNotas-geral">
            <header> 
                <h1>Notas</h1>
                <AiOutlineRollback className='icone-voltar' title='Logoff' onClick={voltarLogin}/>
            </header>

            <main>
                <Cards titulo={"CRIAR"} cliqueCriar={mudarPaginaCriar}></Cards>

                {lista.map( item =>
                    <Cards key={item.id} titulo={item.titulo} data={new Date(item.dt_inclusao).toLocaleDateString()} cliqueLer={() => mudarPaginaLer(item.id_relatos)} cliqueEdt={() => mudarPaginaEditar(item.id_relatos)}
                    cliqueExc={() => excluirNota(item.id_relatos)}></Cards>
                )}
            </main>
        </div>
    )
}