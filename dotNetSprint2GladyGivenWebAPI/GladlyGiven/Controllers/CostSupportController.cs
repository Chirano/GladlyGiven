using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GladlyGiven.Models;
using GladlyGiven.Services;
using GladyGivenWebAPI.Data;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace GladlyGiven.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class CostSupportController : ControllerBase
    {
        private readonly CostSupportService costService;

        public CostSupportController(ApplicationContextDb context)
        {
            costService = new CostSupportService(context);
        }

        [HttpGet("/costsupports")]
        public async Task<ActionResult<IEnumerable<CostSupportDTO>>> GetAllCostSupports()
        {
            List<CostSupportDTO> costSupports = await costService.FindAllCostSupports();

            if (costSupports != null && costSupports.Count > 0)
                return Ok(costSupports);

            return NoContent();
        }

        [HttpGet("mycostsupports/{id}")]
        public async Task<ActionResult<IEnumerable<CostSupportDTO>>> GetAllCostSupportsById(int userId)
        {
            List<CostSupportDTO> costSupports = await costService.FindAllCostSupports();

            if (costSupports != null && costSupports.Count > 0)
                return Ok(costSupports);

            return NoContent();
        }

        [HttpGet("costsupport/id")]
        public async Task<ActionResult<CostSupport>> GetCostSupport(int id)
        {
            CostSupportDTO costSupport = await costService.FindCostSupport(id);

            if (costSupport != null)
                return Ok(costSupport);

            return NoContent();
        }

        [HttpPost("/costsupport")]
        public async Task<ActionResult<CostSupportDTO>> CreateCostSupport(CostSupportDTO cost)
        {
            CostSupportDTO costSupport = await costService.CreateCostSupport(cost);

            if (costSupport != null)
                return Ok(costSupport);

            return NoContent();
        }

        /*
        [HttpPut("/costsupport/id")]
        public async Task<ActionResult<CostSupportDTO>> UpdateCostSupport(int id, CostSupportDTO cost)
        {
            if (cost.Id != id)
            {
                return BadRequest();
            }

            CostSupportDTO updatedCost = await costService.UpdateCostSupport(cost);

            return Ok();
        }*/
    }
}

