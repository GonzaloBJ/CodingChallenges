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

        public async Task<List<Episodio>> EpisodiosAsync()
        {
            // Realiza la solicitud GET de forma asíncrona
            var response = await _httpClient.GetAsync("episode");
            response.EnsureSuccessStatusCode();

            var json = await response.Content.ReadAsStringAsync();

            // Deserializar el JSON a una paginacion
            var episodiosPagination = JsonSerializer.Deserialize<Pagination>(json, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            // Deserializar el resultado a una lista de episodios
            var episodios = episodiosPagination?.results?.Select(e => JsonSerializer.Deserialize<Episodio>(e.ToString() ?? "", new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            })).ToList();


            return episodios?? new List<Episodio>();
        }
    }
}
