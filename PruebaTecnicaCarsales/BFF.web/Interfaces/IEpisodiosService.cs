using BFF.web.Model;

namespace BFF.web.Interfaces
{
    public interface IEpisodiosService
    {
        public Task<List<Episodio>> EpisodiosAsync();
    }
}
