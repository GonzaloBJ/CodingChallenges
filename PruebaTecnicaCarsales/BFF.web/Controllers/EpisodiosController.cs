using BFF.web.Dtos;
using BFF.web.Filters;
using BFF.web.Helpers;
using BFF.web.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
        public async Task<ResultPagination<EpisodioDto>> GetAsync([FromQuery] EpisodiosFilter filter)
        {
            ResultPagination<EpisodioDto> episodios = await _episodiosService.EpisodiosAsync(filter);

            return episodios;
        }
    }
}
