import { useState, React, useEffect } from 'react';
import AtividadeLista from './AtividadeLista'
import AtividadeForm from './AtividadeForm'
import api from '../../api/atividade';
import {Button, Modal} from 'react-bootstrap';
import TittlePage from '../../components/TittlePage';

export default function Atividade() {
    const [showAtivModal, setShowAtivModal] = useState(false);
    const [smShowConfirmModal, setSmShowConfirmModal] = useState(false);

    const [atividades, setAtividades] = useState([])
    const [atividade, setAtividade] = useState({id: 0})

    
    const handleAtivModal = () => setShowAtivModal(!showAtivModal);

    const handleConfirmModal = (id) => {
      if(id !== 0 && id !== undefined){
        const atividade = atividades.filter((atividade) => atividade.id === id);
        setAtividade(atividade[0]);
      }else{
        setAtividade({id: 0})
      }
      setSmShowConfirmModal(!smShowConfirmModal);
    } 
    
    const pegaTodasAtividades = async () => {
      const response = await api.get('atividade');
      return response.data;
    }
  useEffect( () => {
    const getAtividades = async () => {
      const todasAtividades = await pegaTodasAtividades();
      if(todasAtividades) setAtividades(todasAtividades);
    };
    getAtividades();
  }, []);

  const addAtividade = async (ativ) =>{
    const response = await api.post('atividade', ativ);
    console.log(response.data);
    setAtividades([...atividades, response.data]);
    handleAtivModal();
  }

  const eliminarAtividade = async (id) =>{
    handleConfirmModal(0);
    if(await api.delete(`atividade/${id}`)){
      const atividadesFiltradas = atividades.filter(
      (atividade) => atividade.id !== id
    );
    setAtividades([...atividadesFiltradas]);
    }
  };

  function editarAtividade (id){
    const atividade = atividades.filter((atividade) => atividade.id === id);
    setAtividade(atividade[0]);
    handleAtivModal();
  }

  function cancelarAtividade (){
    setAtividade ({id:0});
    handleAtivModal();
  }

  function novaAtividade() {
    setAtividade ({id:0});
    handleAtivModal();
  }

  const atualizarAtividade = async (ativ) => {
    const response = await api.put(`atividade/${ativ.id}`, ativ);
    const { id } = response.data;
    setAtividades(
      atividades.map((item) => (item.id === id ? response.data : item))
    );
    setAtividade({id: 0})
    handleAtivModal();
  }

  return (
    <>
      <TittlePage title = {'Atividade' + (atividade.id !== 0 ? atividade.id : ' ')}
      > 
        <Button variant="outline-secondary" onClick={novaAtividade}>
          <i className='fas fa-plus'></i>
        </Button>
      </TittlePage>
      
      <AtividadeLista
        atividades={atividades}
        editarAtividade={editarAtividade}
        handleConfirmModal = {handleConfirmModal}
      />  

      <Modal show={showAtivModal} onHide={handleAtivModal}>
        <Modal.Header closeButton>
          <Modal.Title>Atividade {atividade.id !== 0 ? atividade.id : ' '}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AtividadeForm
          addAtividade={addAtividade}
          atualizarAtividade={atualizarAtividade}
          cancelarAtividade={cancelarAtividade}
          ativSelecionada={atividade}
          atividades={atividades}
        />
        </Modal.Body>
      </Modal>
      <Modal
        size='sm' 
        show={smShowConfirmModal}
        onHide={handleConfirmModal}       
      >
        <Modal.Header closeButton>
          <Modal.Title>Excluindo Atividade {' '} 
            {atividade.id !== 0 ? atividade.id : ' '}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem a certeza que deseja elminar a atividade {atividade.id} ?
        </Modal.Body>
        <Modal.Footer className='d-flex justify-content-between'>
          <div className='btn btn-outline-primary me-2' onClick={() => eliminarAtividade(atividade.id)}>
            <i className='fas fa-check me-2'></i>
            Sim
          </div>
          <div className='btn btn-danger me-2' onClick={ () => handleConfirmModal (0)}>
            <i className='fas fa-times me-2'></i>
            Não
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}