import './index.scss'

export default function cards({ titulo, data, cliqueLer, cliqueEdt, cliqueExc}) {

  return (
    <div className="cards-geral">

      <div className="conteudo ler" onClick={cliqueLer}>
        <h3>{titulo}</h3>
        <h3>{data}</h3>
      </div>

      <div className='opcoes'>
        <button className='botaoDel' onClick={cliqueExc}></button>
        <button  className='botaoAlt' onClick={cliqueEdt}></button>
      </div>

    </div>
  )
}