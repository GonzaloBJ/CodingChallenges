using BFF.web.Dtos;
using BFF.web.Model;

namespace BFF.web.Helpers
{
    public static class Transformations
    {
        public static IEnumerable<EpisodioDto> TransformEpisodiosToDto(IEnumerable<Episode> episodios)
        {
            IEnumerable<EpisodioDto> episodiosDto = episodios.Select(e => new EpisodioDto
            {
                Id = e.id,
                Nombre = e.name,
                EmitidoEn = e.air_date,
                TemporadaConNumeroEpisodio = e.episode
            });

            return episodiosDto;
        }
    }
}
