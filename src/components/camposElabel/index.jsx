import './index.scss'

export default function CamposLabels({id, textoLabel, tipo, funcaoSet, textoCampo, dadosCampo, habilitados}){

    return(
        <div className='geral-camposLabels'>
            <label for={id}>
                {textoLabel}
            </label>
            <input type={tipo} id={id} onChange={e => funcaoSet(e.target.value)} placeholder={textoCampo} value={dadosCampo} disabled={habilitados}/>
        </div>
    )
}