import React from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap'
import TittlePage from '../../components/TittlePage'
import { useState } from 'react'
import { useHistory } from 'react-router-dom';

const clientes = [
    {
        id: 1, 
        nome: 'Microsoft', 
        responsável: 'Otto',
        contato: '923423842',
        situacao: 'Ativo'
    },
    {
        id: 2, 
        nome: 'Amazon', 
        responsável: 'Kelvin',
        contato: '4553223842',
        situacao: 'Desativado'
    },
    {
        id: 3, 
        nome: 'Instagram', 
        responsável: 'Bruno',
        contato: '234223842',
        situacao: 'Em análise'
    },
    {
        id: 4, 
        nome: 'Facebook', 
        responsável: 'Tiago',
        contato: '9237657542',
        situacao: 'Ativo'
    },
    {
        id: 5, 
        nome: 'Twitter', 
        responsável: 'Jack',
        contato: '925234842',
        situacao: 'Ativo'
    }
]

export default function ClienteLista() {
    const history = useHistory();
    const [termoBusca, setTermoBusca] = useState("");

    const handleInputChange = (e) => {
        setTermoBusca(e.target.value);
    }

    const clientesFiltrados = clientes.filter((cliente) => {
        return (
            Object.values(cliente).join(" ").toLocaleLowerCase().includes(termoBusca.toLowerCase())
        )    
    });

    const novoCliente = () => {
        history.push('/cliente/detalhe');
    }
    
    return (
        <>
        <TittlePage title='Cliente Lista'>
            <Button variant="outline-secondary" onClick={novoCliente}>
                <i className="fas fa-plus me-2"></i>
                Novo Cliente
            </Button>
        </TittlePage>
        <InputGroup className="mb-3 mt-3">
            <InputGroup.Text className="">Pesquisar:</InputGroup.Text>
            <FormControl onChange={handleInputChange} placeholder='Pesquisar por nome do cliente'/>
        </InputGroup>
        <table className="table table-striped table-hover">
            <thead className='table-dark mt-3'>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Nome</th>
                <th scope="col">Responsável</th>
                <th scope="col">Contacto</th>
                <th scope="col">Situação</th>
                <th scope="col">Opções</th>
                </tr>
            </thead>
            <tbody>
                {clientesFiltrados.map((cliente) => (
                    <tr key={cliente.id}>
                        <td>{cliente.id}</td>
                        <td>{cliente.nome}</td>
                        <td>{cliente.responsável}</td>
                        <td>{cliente.contato}</td>
                        <td>{cliente.situacao}</td>
                        <td>
                            <div>
                                <button className='btn btn-sm btn-outline-primary me-2' onClick={() => history.push(`/cliente/detalhe/${cliente.id}`)}>
                                    <i className='fas fa-user-edit me-2'></i>
                                    Editar</button>
                                <button className='btn btn-sm btn-outline-danger me-2'>
                                    <i className='fas fa-user-times me-2'></i>
                                    Desativar</button>

                            </div>
                        </td>
                    </tr>  
                ))}
            </tbody>
        </table>
        </>
        
    )
}
