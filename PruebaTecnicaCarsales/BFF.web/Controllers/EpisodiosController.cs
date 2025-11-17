using BFF.web.Filters;
using BFF.web.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace BFF.web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EpisodiosController : ControllerBase
    {
        private readonly IEpisodiosService _episodiosService;

        public EpisodiosController(IEpisodiosService episodiosService)
        {
            _episodiosService = episodiosService;
        }


        [HttpGet(Name = "episodios")]
        public async Task<IActionResult> GetAsync([FromQuery] EpisodiosFilter filter)
        {
            var result = await _episodiosService.EpisodiosAsync(filter);

            if (!result.Success)
            {
                if (result.Code == (int)HttpStatusCode.NotFound)
                    return NotFound(result.ErrorMessage);

                return StatusCode(500, result.ErrorMessage);
            }

            return Ok(result.Data);
        }
    }
}
