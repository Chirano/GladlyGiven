// Author: Tiago Barracha
// ti.barracha@gmail.com



using GladyGivenWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GladyGivenWebAPI.Data
{
    public class ServiceRequestDBContext : DbContext
    {
        public DbSet<ServiceRequest> ServiceRequest { get; set; } // repository in Java Spring

        public ServiceRequestDBContext(DbContextOptions options) : base(options)
        {

        }
    }
}
