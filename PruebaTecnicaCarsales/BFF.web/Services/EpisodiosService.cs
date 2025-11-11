using BFF.web.Dtos;
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

        public async Task<List<EpisodioDto>> EpisodiosAsync()
        {
            // Realiza la solicitud GET de forma asíncrona
            HttpResponseMessage? response = await _httpClient.GetAsync("episode");
            response.EnsureSuccessStatusCode();

            string? json = await response.Content.ReadAsStringAsync();

            // Deserializar el JSON a una paginacion
            Pagination? episodiosPagination = JsonSerializer.Deserialize<Pagination>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            // Deserializar el resultado a una lista de episodios
            IEnumerable<Episode?>? episodios = episodiosPagination?.results?.Select(e => 
            JsonSerializer.Deserialize<Episode>(e.ToString() ?? "", new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            }));

            if (episodios == null && episodios?.Count() > 0) return new List<EpisodioDto>();

            // Transforma el resultado extraido del servicio a un DTO para el frontend
            return [.. Transformations.TransformEpisodiosToDto(episodios!)];
        }

    }
}
