using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProAtividade.Domain.Interfaces.Repositories
{
    public interface IGeralRepo
    {
        void Adicionar <T> (T entity) where T : class;
        void Atualizar <T> (T entity) where T : class;
        void Eliminar <T> (T entity) where T : class;
        void EliminarVarias <T> (T[] entity) where T : class;
        Task<bool> SalvarMudancasAsync();

    }
}