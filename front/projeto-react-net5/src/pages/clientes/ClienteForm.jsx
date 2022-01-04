import React from 'react'
import TittlePage from '../../components/TittlePage'
import { Button } from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

export default function ClienteForm() {
    const history = useHistory();
    const voltar = () => {
        history.push('/cliente/lista');
    }
    let {id} = useParams();
    return (
        <>
    <TittlePage title={'Cliente Detalhes ' + (id !== undefined ? id : '')}>
            <Button variant="outline-secondary" onClick={voltar}>
                <i className="fa fa-backward me-2"></i>
                Voltar
            </Button>
        </TittlePage>
        </>
        
    )
}
