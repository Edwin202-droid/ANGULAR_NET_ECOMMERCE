using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface IGenericRepository<T> where T : BaseEntity
    {
        Task<T> GetByAsync(int id);
        Task<IReadOnlyList<T>> ListAllAsync();

        //Specification -> consulta incluyendo objetos - foreing key
        Task<T> GetEntityWithSpec(ISpecification<T> spec);
        Task<IReadOnlyList<T>> ListAsync(ISpecification <T> spec);
        Task<int> CountAsync(ISpecification<T> spec);
    }
}