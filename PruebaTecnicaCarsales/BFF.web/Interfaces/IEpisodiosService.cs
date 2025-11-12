using BFF.web.Dtos;
using BFF.web.Filters;
using BFF.web.Helpers;

namespace BFF.web.Interfaces
{
    public interface IEpisodiosService
    {
        public Task<ResultPagination<EpisodioDto>> EpisodiosAsync(EpisodiosFilter filter);
    }
}
