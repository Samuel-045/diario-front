import './index.css'

import axios from "axios"
import { useNavigate } from 'react-router-dom'

import Cards from '../../components/cards'
import { useEffect, useState } from 'react'

export default function LerNotas() {
    let [lista, setLista] = useState([])
    const navigate = useNavigate()

    const voltarLogin = () => {
        navigate('/')
        localStorage.removeItem("ID")
    }
    const mudarPaginaCriar = () => { navigate('/nota/criar') }
    const mudarPaginaLer = (id) => { navigate(`/nota/ler/${id}`) }
    const mudarPaginaEditar = (id) => {
        let acao = 'a'
        navigate(`/nota/atualizar/${acao}/${id}`)
    }

    async function excluirNota(id) {
        try {
            let resp = await axios.delete(`http://localhost:3010/notas/excluir/${id}`)

            lerDadosNotas()
        }
        catch(erro){
            alert(erro.message)
        }
        
    }

    async function lerDadosNotas() {
        try {
            let idUsuario = localStorage.getItem("ID")
            let resp = await axios.get(`http://localhost:3010/notas/${idUsuario}`)
            setLista(resp.data)
        }
        catch (erro) {
            alert(erro.message)
        }

    }

    useEffect(() => {
        lerDadosNotas()
    }, [])

    return (
        <div className="lerNotas-geral">
            <header>
                <button className='botaoSair' onClick={voltarLogin}></button>
                <h1>Notas</h1>
                <button className='botaoCriar' onClick={mudarPaginaCriar}></button>
            </header>

            <main>
                {lista.map(item =>
                    <Cards key={item.id} titulo={item.titulo} data={new Date(item.dt_inclusao).toLocaleDateString()} cliqueLer={() => mudarPaginaLer(item.id_relatos)} cliqueEdt={() => mudarPaginaEditar(item.id_relatos)}
                        cliqueExc={() => excluirNota(item.id_relatos)}></Cards>
                )}
            </main>
        </div>
    )
}