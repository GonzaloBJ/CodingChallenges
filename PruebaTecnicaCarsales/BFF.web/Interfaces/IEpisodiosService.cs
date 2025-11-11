using BFF.web.Dtos;

namespace BFF.web.Interfaces
{
    public interface IEpisodiosService
    {
        public Task<List<EpisodioDto>> EpisodiosAsync();
    }
}
