using System;
using System.Runtime.CompilerServices;
using System.Text.Json;
using Backup.Exceptions;
using GladlyGiven.Dtos;
using Microsoft.AspNetCore.Mvc;
namespace GladlyGiven.Services
{
	public class JavaUserClient
	{
		private string url;

        public JavaUserClient(string url)
        {

            url = url;

        }

        public async Task<DonorDTO> GetDonorById(long id)
        {
            HttpResponseMessage response;
            string json;
            DonorDTO donor;

            using HttpClient client = new HttpClient();

  
            try
            {
                response = await client.GetAsync($"{url}/donor/{id.ToString().Trim()}");
                if (response.StatusCode != System.Net.HttpStatusCode.OK)
                {
                    throw new ExternalConnectionException($"Spring boot api status code {response.StatusCode}: {response.Content.ToString()}");
                }

                json = await response.Content.ReadAsStringAsync();
                donor = JsonSerializer.Deserialize<DonorDTO>(json)!;

                return donor;

            }catch (Exception)
            {
                throw;
            }
        }

    }
}

