using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Data.Repository;

namespace Infrastructure
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreContext _context;
        private Hashtable repositories;
        public UnitOfWork(StoreContext context)
        {
            _context = context;
            
        }
        public async Task<int> Complete()
        {
            return await _context.SaveChangesAsync();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IGenericRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity
        {
            if(repositories == null) repositories = new Hashtable();

            var type = typeof(TEntity).Name;

            if(!repositories.ContainsKey(type))
            {
                var repostiryType = typeof(GenericRepository<>);
                var repositoryInstance = Activator.CreateInstance(repostiryType.MakeGenericType
                    (typeof(TEntity)), _context);

                repositories.Add(type, repositoryInstance);
            }

            return (IGenericRepository<TEntity>) repositories[type];
        }
    }
}