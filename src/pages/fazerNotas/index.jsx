import './index.css'
import axios from "axios"

import Campo from '../../components/camposElabel'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'


export default function FazerNotas() {
    let [tituloNota, setTituloNota] = useState("")
    let [conteudoNota, setConteudoNota] = useState("")
    let [dataNota, setDataNota] = useState("")

    const navigate = useNavigate()
    const voltarTodasNotas = () => { navigate('/todasNotas') }

    const { acao, id } = useParams();

    function notificacao(erro){
        toast.error(erro.message)
    }

    function tratarData(data){ //função destinada a tratar a data inserida a fim de comparar com a data atual
        var dataSeparada = data.split("-") // sepera a data inserida
        var dataOrganizada = new Date(dataSeparada[0], dataSeparada[1]-1, dataSeparada[2]) // gera uma data com base na data separada
        var dataTraduzida = dataOrganizada.toLocaleDateString() // converte a dataOrganizada para o padrão de data utilizado no Brasil
        return dataTraduzida
    }

    async function salvar() {
        try {
            let idUsuario = localStorage.getItem("ID")
            let body = {
                "titulo": tituloNota,
                "conteudo": conteudoNota,
                "data": dataNota,
                "id": idUsuario
            }

            let rxData = /^[0-9]{5,}-[0-9]{2}-[0-9]{2}$/
            let condData = rxData.test(body.data)

            var dataFormatoMaquina = Date.now() // data em milisegundos
            var dataAtual = new Date(dataFormatoMaquina) // gera uma data com base nos milisegundos
            var dataAtualFormatada = dataAtual.toLocaleDateString() // converte a dataAtual para o padrão de data utilizado no Brasil
            
            var dataNotaOrganizada = tratarData(dataNota)

            if(dataNotaOrganizada > dataAtualFormatada){
                condData=true
            }

            if(body.titulo==="" || body.conteudo==="" || body.data===""){
                throw new Error("Todos os campos devem ser preenchidos")
            }
            else if(condData){
                throw new Error("Digite uma data válida")
            }

            let resp = await axios.post(`http://localhost:3010/notas/criar`, body);

            voltarTodasNotas()
        }
        catch (erro) {
            notificacao(erro)
        }

    }

    async function buscarPorId(id) {
        try {
            let resp = await axios.get(`http://127.0.0.1:3010/notas/ler/${id}`)

            setTituloNota(resp.data[0].titulo)
            setConteudoNota(resp.data[0].conteudo)
            let dataFormatada = resp.data[0].dt_inclusao.split('T')[0];
            setDataNota(dataFormatada)
        }
        catch(erro){
            notificacao(erro)
        }      

    }

    async function atualizar() {
        try {
            let body = {
                "titulo": tituloNota,
                "conteudo": conteudoNota,
                "data": dataNota
            }

            let rxData = /^[0-9]{5,}-[0-9]{2}-[0-9]{2}$/
            let condData = rxData.test(body.data)

            var dataFormatoMaquina = Date.now() // data em milisegundos
            var dataAtual = new Date(dataFormatoMaquina) // gera uma data com base nos milisegundos
            var dataAtualFormatada = dataAtual.toLocaleDateString() // converte a dataAtual para o padrão de data utilizado no Brasil
            
            var dataNotaOrganizada = tratarData(dataNota)

            if(dataNotaOrganizada > dataAtualFormatada){
                condData=true
            }

            if(body.titulo==="" || body.conteudo==="" || body.data===""){
                throw new Error("Todos os campos devem ser preenchidos")
            }
            else if(condData){
                throw new Error("Digite uma data válida")
            }

            let resp = await axios.post(`http://localhost:3010/atualizar/${id}`, body);

            voltarTodasNotas()
        }
        catch (erro) {
            notificacao(erro)
        }

    }

    let [camposHabilitados, setCamposHabilitados] = useState(false)
    useEffect(() => {
        if (id !== undefined && acao !== undefined) {
            buscarPorId(id)
            setCamposHabilitados(false)
        } else if (id !== undefined && acao === undefined) {
            buscarPorId(id)
            setCamposHabilitados(true)
        }

    }, [])

    return (
        <div className='fazerNotas-geral'>
        <Toaster></Toaster>
            <header>
                <button className='botaoSair' onClick={voltarTodasNotas}></button>

                <h1>{id === undefined ? "Criar nota" :
                    id !== undefined && acao !== undefined ? "Atualizar nota" :
                        "Ler nota"
                }</h1>

                <p>................</p>
            </header>

            <main>
                <Campo id={"tituloNota"} textoCampo={"Digite o título da nota"} tipo={"text"} textoLabel={"Titulo da nota"} dadosCampo={tituloNota} funcaoSet={setTituloNota} habilitados={camposHabilitados} />
                <Campo id={"conteudoNota"} textoCampo={"Digite o conteúdo da nota"} tipo={"textarea"} textoLabel={"Conteúdo da nota"} dadosCampo={conteudoNota} funcaoSet={setConteudoNota} habilitados={camposHabilitados} />
                <Campo id={"dataNota"} tipo={"date"} textoLabel={"Data da nota"} textoCampo={dataNota} funcaoSet={setDataNota} habilitados={camposHabilitados} />

                {id === undefined ?
                    <button onClick={salvar} title='Salvar'>Salvar</button> :
                    id !== undefined && acao === undefined ?
                        <button onClick={voltarTodasNotas} title='Voltar'>Voltar</button> :
                        <button onClick={atualizar} title='Atualizar'>Atualizar</button>
                }

            </main>

        </div>
    )
}