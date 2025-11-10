using BFF.web.Interfaces;
using BFF.web.Model;
using BFF.web.Services;
using Microsoft.AspNetCore.Http;
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
        public List<Episodio> Get()
        {
            var episodios = _episodiosService.EpisodiosAsync();

            return episodios.Result;
        }
    }
}
