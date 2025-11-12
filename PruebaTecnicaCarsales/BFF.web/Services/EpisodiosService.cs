using BFF.web.Dtos;
using BFF.web.Filters;
using BFF.web.Helpers;
using BFF.web.Interfaces;
using BFF.web.Model;
using System.Text.Json;

namespace BFF.web.Services
{
    public class EpisodiosService: IEpisodiosService
    {
        private readonly HttpClient _httpClient = new HttpClient();

        public EpisodiosService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<ResultPagination<EpisodioDto>> EpisodiosAsync(EpisodiosFilter filter)
        {
            string queryString = "episode";

            // Agrega los parámetros de consulta según el filtro proporcionado
            if (filter.PageIndex > 1)
                queryString += $"?page={filter.PageIndex}";

            if (filter.PageIndex == 1 && filter.Id.HasValue)
                queryString += $"/{filter.Id.Value}";

            // Realiza la solicitud GET de forma asíncrona
            HttpResponseMessage? response = await _httpClient.GetAsync(queryString);
            response.EnsureSuccessStatusCode();

            string? json = await response.Content.ReadAsStringAsync();

            // Deserializar el JSON a una paginacion
            if (filter.Id.HasValue)
            {
                Episode? episodio = JsonSerializer.Deserialize<Episode>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (episodio == null)
                    return new ResultPagination<EpisodioDto>(0, 0, 0, new List<EpisodioDto>());

                // Transforma el resultado extraido del servicio a un DTO para el frontend
                return Transformations.TransformSingleEpisodeToResultPagination(episodio);
            }
            else
            {
                Pagination? episodiosPagination = JsonSerializer.Deserialize<Pagination>(json, new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                });

                if (episodiosPagination == null)
                    return new ResultPagination<EpisodioDto>(0, 0, 0, new List<EpisodioDto>());

                // Transforma el resultado extraido del servicio a un DTO para el frontend
                return Transformations.TransformEpisodePaginationToResultPagination(episodiosPagination!, filter.PageIndex);
            }
        }

    }
}
