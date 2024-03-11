using System;
using GladlyGiven.Exceptions;
using GladlyGiven.Models;
using GladyGivenWebAPI.Data;
using GladyGivenWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GladlyGiven.Services
{
   public class CostSupportService
   {
       private readonly ApplicationContextDb context;

       public CostSupportService(ApplicationContextDb context)
       {
           this.context = context;
       }

       // <summary>
       /// Administrator views all cost supports requested
       /// </summary>
       /// <returns>List of all cost supports requested</returns>
       public async Task<List<CostSupportDTO>> FindAllCostSupports()
       {
           List<CostSupport> costSupports = await context.CostSupports.ToListAsync();

           if (costSupports == null)
           {
                throw new EntityDoesntExistException("Table CostSupports is empty", "CostSupport", "FindAllCostSupports()");
           }

           List<CostSupportDTO> costSupportDTOs = new List<CostSupportDTO>();

           foreach (CostSupport cost in costSupports)
           {
               CostSupportDTO costSupportDTO = new CostSupportDTO(cost);
               costSupportDTOs.Add(costSupportDTO);
           }

           return costSupportDTOs;
       }

       /// <summary>
       /// Service provider views all cost supports requested by him.
       /// </summary>
       /// <param name="userId">Service provider id</param>
       /// <returns>List of all cost supports requested by a service provider</returns>
       public async Task<List<CostSupportDTO>> FindAllCostSupportsByUserId(int userId)
       {
               List<CostSupport> costSupports = await context.CostSupports
                   .Where(sp => sp.Id == userId)
                   .ToListAsync();

               if (costSupports == null)
               {
                    throw new EntityDoesntExistException("There's no CostSupports for this user", "CostSupport", "FindAllCostSupportsByUserId()");
                }

               List<CostSupportDTO> costSupportDTOs = new List<CostSupportDTO>();

               foreach (CostSupport cost in costSupports)
               {
                   CostSupportDTO costSupportDTO = new CostSupportDTO(cost);
                   costSupportDTOs.Add(costSupportDTO);
               }

               return costSupportDTOs;
           }

        /// <summary>
        /// Retrieves a list of cost supports with the specified <paramref name="costSupportStatus"/>.
        /// </summary>
        /// <param name="costSupportStatus">The status of the cost supports to be retrieved.</param>
        /// <returns>
        /// Returns a Task<List<CostSupportDTO>" representing the asynchronous operation.
        /// The task result is a list of CostSupportDTO representing the cost supports with the specified status.
        /// Throws an <see cref="EntityDoesntExistException"/> if no cost supports are found for the given status.
        /// </returns>
        public async Task<List<CostSupportDTO>> FindAllCostSupportsByStatus(int costSupportStatus)
            {
               List<CostSupport> costSupports = await context.CostSupports
                   .Where(sp => (int)sp.Status == costSupportStatus)
                   .ToListAsync();

               if (costSupports == null)
               {
                    throw new EntityDoesntExistException("There's no CostSupports for this status", "CostSupport", "FindAllCostSupportsByStatus()");
                }

               List<CostSupportDTO> costSupportDTOs = new List<CostSupportDTO>();

               foreach (CostSupport cost in costSupports)
               {
                   CostSupportDTO costSupportDTO = new CostSupportDTO(cost);
                   costSupportDTOs.Add(costSupportDTO);
               }

               return costSupportDTOs;
            }

           /// <summary>
           /// Find a specific cost support by its id
           /// </summary>
           /// <param name="id">Cost support id</param>
           /// <returns>Cost support</returns>
           public async Task<CostSupportDTO> FindCostSupport(int id)
           {
               var costSupport = await context.CostSupports.FirstOrDefaultAsync(cs => cs.Id == id);
               if (costSupport == null)
               {
                   throw new EntityDoesntExistException("Table CostSupports is empty", "CostSupport", "FindCostSupport()");
               }

               CostSupportDTO costSupportDTO = new CostSupportDTO(costSupport);

               return costSupportDTO;
           }

           /// <summary>
           /// Service provider requests a cost support.
           /// </summary>
           /// <param name="cost">Cost support DTO</param>
           /// <returns>costSupportDTO created</returns>
           public async Task<CostSupportDTO> CreateCostSupport(CostSupportDTO cost)
           {
               var costSupport = await context.CostSupports.FirstOrDefaultAsync(cs => cs.Id == cost.Id);

               if (costSupport == null)
               {
                   costSupport = new CostSupport
                   {
                       Amount = cost.Amount,
                       Description = cost.Description,
                       AppointmentId = cost.AppointmentId,
                       ServiceProviderId = cost.ServiceProviderId,
                       Type = cost.Type,
                       DateRequest = cost.DateRequest,
                       Status = Enums.CostSupportStatus.PENDING,
                   };
                   context.CostSupports.Add(costSupport);
                   context.SaveChanges();
               }

               CostSupportDTO costSupportDTO = new CostSupportDTO(costSupport);

               return costSupportDTO;
           }



        /// <summary>
        /// Administrator validates (approves or rejects) a cost support requested.
        /// </summary>
        /// <param name="cost">Cost support to be validated</param>
        /// <returns>Cost support status updated</returns>
        public async Task<CostSupportDTO> UpdateCostSupport(CostSupportDTO cost, int costSupportStatus)
        {
            var costSupport = await context.CostSupports.FirstOrDefaultAsync(cs => cs.Id == cost.Id);

            if(costSupport == null)
            {
                throw new EntityDoesntExistException("CostSupport was not found", "CostSupport", "UpdateCostSupport()");
            }

            if (costSupportStatus == 1)
            {
                costSupport.Status = Enums.CostSupportStatus.APPROVED;
                context.CostSupports.Entry(costSupport).State = EntityState.Modified;
            }

            if (costSupportStatus == 2)
            {
                costSupport.Status = Enums.CostSupportStatus.REJECTED;
                context.CostSupports.Entry(costSupport).State = EntityState.Modified;
            }

            await context.SaveChangesAsync();

            CostSupportDTO dTO = new CostSupportDTO(costSupport);

            return dTO;
        }
   }
}

