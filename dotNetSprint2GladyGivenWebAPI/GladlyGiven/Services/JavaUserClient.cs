using System;
using System.Runtime.CompilerServices;
using System.Text.Json;
using Backup.Exceptions;
using GladlyGiven.Dtos;
using Microsoft.AspNetCore.Mvc;
namespace GladlyGiven.Services
{
    //Author: Sónia Ribeiro

    /// <summary>
    /// This class communicates with the Java Spring Boot API for the purpouse of donor related operations
    /// </summary>

	public class JavaUserClient
	{
        /// <summary>
        /// The url of the java spring boot api
        /// </summary>
		private string url;


        /// <summary>
        /// The constructor that initializes a new instance of the JavaUserClient with the specified url
        /// </summary>
        /// <param name="url">The url of the java spring boot api</param>
        public JavaUserClient(string url)
        {

            this.url = url;

        }

        /// <summary>
        /// Retrieves donor information by donor ID from the Java Spring Boot API.
        /// </summary>
        /// <param name="id">The ID of the donor to retrieve</param>
        /// <returns>The donor information as a DonorDTO object</returns>

        public async Task<DonorDTO> GetDonorById(long id)
        {
            HttpResponseMessage response;
            string json;
            DonorDTO donor;

            using HttpClient client = new HttpClient();

  
            try
            {
                // Send GET request to retrieve donor information

                response = await client.GetAsync($"{url}/donor/{id.ToString().Trim()}");

                // Check if the response status code indicates success

                if (response.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    // Throw an exception if the response status code indicates an error

                    throw new ExternalConnectionException($"Spring boot api status code {response.StatusCode}: {response.Content.ToString()}");
                }

                // Read the response content as JSON

                json = await response.Content.ReadAsStringAsync();

                // Deserialize the JSON response into a DonorDTO object

                donor = JsonSerializer.Deserialize<DonorDTO>(json)!;

                return donor;

            }catch (Exception)
            {
                throw;
            }
        }

    }
}

