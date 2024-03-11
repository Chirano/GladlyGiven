
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
            string connectionString = NeonStaticConnectionStringBuilder.GetNpgsqlConnectionString();
            builder.Services.AddDbContext<ApplicationContextDb>(options =>
                options.UseNpgsql(connectionString));

            // Add CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", builder =>
                {
                    builder.WithOrigins("http://localhost:4200") // Replace with your actual frontend URL
                           .AllowAnyHeader()
                           .AllowAnyMethod();
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

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
