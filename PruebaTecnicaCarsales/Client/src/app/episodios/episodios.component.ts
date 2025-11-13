
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para ngIf, ngFor
import { EpisodiosService } from './episodios.service';
import { IEpisodiosFilter } from '../model/EpisodiosFilter';
import { IEpisodio } from '../model/Episodio';

// Interfaz para la estructura de datos
interface ItemTabla {
  id: number;
  nombre: string;
  emitidoEn: string;
  temporadaConNumeroEpisodio: string;
}

@Component({
  selector: 'app-episodios',
  standalone: true,
  imports: [CommonModule], // Importamos CommonModule
  templateUrl: './episodios.component.html',
  styleUrl: './episodios.component.css'
})
export class EpisodiosComponent implements OnInit {
  // Fuente de datos completa
  public episodiosService = inject(EpisodiosService);

  // Datos mostrados en la página actual
  public paginatedData: IEpisodio[] = [];

  // Control de la paginación
  public pageSize: number = 20;
  public currentPage: number = 1;
  public totalItems: number = 0;
  public totalPages: number = 0;

  // --- Selección de Ítem ---
  public selectedEpisodio: IEpisodio | null = null;

  ngOnInit() {
    // if (!this.episodiosService.isLoading())
    //   this.cargarEpisodios({});
    this.updatePagination();

    if (!this.episodiosService.isLoading() && this.episodiosService.episodiosPaginated()?.count! > 0 ) {
      this.totalItems = this.episodiosService.episodiosPaginated()?.count!;
      this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    }
  }

  cargarEpisodios(filter: IEpisodiosFilter): void {
    this.episodiosService.getEpisodios(filter);
  }

  /**
   * Actualiza el subconjunto de datos a mostrar según la página actual.
   */
  updatePagination(): void {
    this.episodiosService.getEpisodios({PageIndex: this.currentPage});
    this.paginatedData = this.episodiosService.episodiosPaginated()?.data as IEpisodio[];
    this.selectedEpisodio = null; // Limpiar selección al cambiar de página
  }

  /**
   * Cambia a una nueva página y actualiza los datos.
   * @param newPage El número de la página a la que se desea ir.
   */
  goToPage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.updatePagination();
    }
  }

  /**
   * Establece el ítem seleccionado para mostrarlo en la card de detalle.
   * @param item El ítem de la tabla seleccionado.
   */
  selectEpisodio(episodio: IEpisodio): void {
    // Si se hace clic en el mismo ítem, se deselecciona.
    this.selectedEpisodio = this.selectedEpisodio === episodio ? null : episodio;
  }

  /**
   * Genera un array de números de página para mostrar en el paginador.
   */
  get pageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}
