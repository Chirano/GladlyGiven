using GladlyGiven.Models;
using GladyGivenWebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace GladyGivenWebAPI.Data
{
    public class ApplicationContextDb : DbContext 
    {
        public ApplicationContextDb(DbContextOptions<ApplicationContextDb> options) : base(options)
        {

        }

        public DbSet<Category> Category { get; set; }

        public DbSet<Service> Service { get; set; }


        public DbSet<CostSupport> CostSupports { get; set; }

        public DbSet<ServiceRequest> ServiceRequest { get; set; }

    }
}
