using GladyGivenWebAPI.Data;
using GladyGivenWebAPI;
using Microsoft.EntityFrameworkCore;
using GladyGivenWebAPI.Models;

namespace GladlyGiven
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddDbContext<ApplicationContextDb>(options =>
                options.UseOracle(builder.Configuration.GetConnectionString("CarStandDb")
                )
              );
            //string connectionString = NeonStaticConnectionStringBuilder.GetNpgsqlConnectionString();
            //builder.Services.AddDbContext<ApplicationContextDb>(options =>
            //    options.UseNpgsql(connectionString));

            // Add CORS services
            builder.Services.AddCors(options =>
            {
                options.AddDefaultPolicy(builder =>
                {
                    builder.AllowAnyOrigin()
                           .AllowAnyMethod()
                           .AllowAnyHeader();
                });
            });

            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors();
            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
