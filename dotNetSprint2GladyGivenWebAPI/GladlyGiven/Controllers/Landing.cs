﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace GladlyGiven.Controllers
{
    [ApiController]
    [Route("api/landing")]
    public class Landing : Controller
    {
        [HttpGet]
        public IActionResult GetHello()
        {
            return Ok("{ Hello from Dot Net }");
        }

        [HttpPost]
        public IActionResult PostHello(string message)
        {
            return Ok($"Hello from Dot Net!\nMessage: {message}");
        }
    }
}
