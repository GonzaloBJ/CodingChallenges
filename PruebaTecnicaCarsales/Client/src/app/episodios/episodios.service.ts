import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from "@angular/core";
import { finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { IEpisodio } from '../model/Episodio';
import { IEpisodiosFilter } from '../model/EpisodiosFilter';
import { IResultPagination } from "../model/ResultPagination";

@Injectable({
  providedIn: 'root'
})
export class EpisodiosService {
  private http: HttpClient = inject(HttpClient);
  private readonly baseUrl: string = environment.BFFUrl;

  // Utilizamos un Signal para almacenar los episodios
  private _episodiosPaginated: WritableSignal<IResultPagination<IEpisodio> | null> = signal(null);

  // Exponemos el estado como un Signal de solo lectura
  public readonly episodiosPaginated = this._episodiosPaginated.asReadonly();

  // Signal para el estado de carga
  public isLoading: WritableSignal<boolean> = signal(false);

  constructor() { }

  // Función refactorizada para obtener los episodios y actualizar el Signal
  getEpisodios(filter: IEpisodiosFilter): void {
    this.isLoading.set(true); // Activar el indicador de carga

    // Construye los query parameters
    let queryParams = new HttpParams();
    if (filter.PageIndex && filter.PageIndex > 1)
      queryParams = queryParams.set('PageIndex', filter.PageIndex);
    if (filter.Id)
      queryParams = queryParams.set('Id', filter.Id);

    this.http.get<IResultPagination<IEpisodio>>(`${this.baseUrl}episodios/`, { params: queryParams })
      .pipe(
        // El operador finalize se ejecuta cuando el Observable termina (éxito o error)
        finalize(() => this.isLoading.set(false))
      )
      .subscribe({
        next: (episodios) => {
          // Actualizar el Signal con el nuevo valor
          this._episodiosPaginated.set(episodios);
        },
        error: (err) => {
          console.error('Error al obtener los episodios:', err);
          this._episodiosPaginated.set(null); // Limpiar la cesta en caso de error
        }
      });
  }
}
