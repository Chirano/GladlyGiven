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

        /// <summary>
        /// Gets or sets the DbSet representing the collection of Donation entities.
        /// This property provides access to the database table or collection
        /// containing donation records, allowing querying, insertion, updating, and deletion
        /// operations on donation data. 
        /// </summary>
        public DbSet<Donation> Donations { get; set; }

        public DbSet<CostSupportPayment> CostSupportPayment { get; set; }

    }
}
