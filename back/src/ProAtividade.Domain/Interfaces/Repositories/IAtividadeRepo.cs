using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ProAtividade.Domain.Entities;

namespace ProAtividade.Domain.Interfaces.Repositories
{
    public interface IAtividadeRepo : IGeralRepo
    {
        Task<Atividade[]> PegaTodasAsync();
        Task<Atividade> PegaPorIdAsync(int id);
        Task<Atividade> PegaPorTituloAsync(string titulo);
    }
    /*public interface IAtividadeRepo : IGeralRepo
    {
        Para o meu projeto
        
        Task<Cliente[]> PegaTodasAsync();
        Task<Cliente> PegaPorIdAsync(int id);
        Task<Cliente> PegaPorTituloAsync(string titulo);
    }*/
}