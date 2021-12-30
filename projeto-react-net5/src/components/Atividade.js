import React from 'react'

function prioridadeLabel(param) {
    switch(param){
      case '1':
        return 'Baixa'
      case '2':
        return 'Normal'
      case '3':
        return 'Alta'
      default:
        return 'Não definido';
    }
  }
  
function prioridadeStyle(param, icone) {
    switch(param){
      case '1':
        return icone ? 'smile' : 'success';
      case '2':
        return icone ? 'meh' : 'dark';
      case '3':
        return icone ? 'frown' : 'warning';
      default:
        return 'Não definido';
    }
}

export default function Atividade(props) {
    return (
        <div className={"card mb-2 shadow border-" + prioridadeStyle(props.ativ.prioridade)} style={{width: "100%"}}>
            <div className="card-body">
                <div className='d-flex justify-content-between'>
                    <h5 className='card-tittle'>
                    <span className="badge bg-secondary me-1">{props.ativ.id}</span>
                         - {props.ativ.titulo}
                    </h5>
                    <h6>
                      Prioridade:
                      <span className={"ms-1 text-" + prioridadeStyle(props.ativ.prioridade)}>
                        <i className={'me-1 far fa-' + prioridadeStyle(props.ativ.prioridade, true)}></i>
                         {prioridadeLabel(props.ativ.prioridade)}
                      </span>
                    </h6>
                </div>
                  <p className="card-text">{props.ativ.descricao}</p>
                <div className='d-flex justify-content-end pt-2 m-0 border-top'>
                    <div className='btn btn-outline-primary me-2 btn-sm' onClick={ ()=>props.editarAtividade(props.ativ.id)}>
                        <i className="fas fa-pen me-2"/>Editar
                    </div>
                    <div className='btn btn-outline-danger btn-sm' onClick={ () => props.eliminarAtividade(props.ativ.id)}>
                        <i className="fas fa-trash me-2"/>Eliminar
                    </div>
                </div>
            </div>
        </div>
    )
}
