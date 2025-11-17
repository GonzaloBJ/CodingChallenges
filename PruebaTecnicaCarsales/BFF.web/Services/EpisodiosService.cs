using BFF.web.Dtos;
using BFF.web.Filters;
using BFF.web.Helpers;
using BFF.web.Interfaces;
using BFF.web.Model;
using System.Net;
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

        public async Task<ServiceResult<ResultPagination<EpisodioDto>>> EpisodiosAsync(EpisodiosFilter filter)
        {

            try
            {
                string queryString = "episode";

                // Agrega los parámetros de consulta según el filtro proporcionado
                if (filter.PageIndex > 1)
                    queryString += $"?page={filter.PageIndex}";

                if (filter.PageIndex == 1 && filter.Id.HasValue)
                    queryString += $"/{filter.Id.Value}";

                // Realiza la solicitud GET de forma asíncrona
                HttpResponseMessage? response = await _httpClient.GetAsync(queryString);

                // En caso de no encontrar resultados no arroje error
                if (response.StatusCode == HttpStatusCode.NotFound)
                    return ServiceResult<ResultPagination<EpisodioDto>>.Fail("No encontrado.", (int)HttpStatusCode.NotFound);

                // Valida que el resultado sea correcto 
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
                        return ServiceResult<ResultPagination<EpisodioDto>>.Fail("No encontrado.", (int)HttpStatusCode.NotFound);

                    // Transforma el resultado extraido del servicio a un DTO para el frontend
                    return ServiceResult<ResultPagination<EpisodioDto>>.Ok(Transformations.TransformSingleEpisodeToResultPagination(episodio));
                }
                else
                {
                    Pagination? episodiosPagination = JsonSerializer.Deserialize<Pagination>(json, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    if (episodiosPagination == null)
                        return ServiceResult<ResultPagination<EpisodioDto>>.Fail("No encontrado.", (int)HttpStatusCode.NotFound);

                    // Transforma el resultado extraido del servicio a un DTO para el frontend
                    return ServiceResult<ResultPagination<EpisodioDto>>.Ok(Transformations.TransformEpisodePaginationToResultPagination(episodiosPagination!, filter.PageIndex));
                }
            }
            catch (Exception ex)
            {
                return ServiceResult<ResultPagination<EpisodioDto>>.Fail($"Error al obtener los episodios: {ex.Message}", (int)HttpStatusCode.InternalServerError);
            }
        }

    }
}
