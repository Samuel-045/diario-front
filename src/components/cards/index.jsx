import './index.scss'

export default function cards({ titulo, data, cliqueLer, cliqueEdt, cliqueExc, cliqueCriar }) {
  let verificador1 = false
  if (titulo === "CRIAR")
    verificador1 = true

  return (
    <div className="cards-geral">
      {verificador1 ? 
      <div className="conteudo criar" onClick={cliqueCriar}>
        <h3>{titulo}</h3>
      </div> :
        <div className="conteudo ler" onClick={cliqueLer}>
          <h3>{titulo}</h3>
          <h6>{data}</h6>
        </div>
      }

      {verificador1 ? null :
        <div className='opcoes'>
          <button onClick={cliqueExc}>Excluir</button>
          <button onClick={cliqueEdt}>Alterar</button>
        </div>
      }

    </div>
  )
}