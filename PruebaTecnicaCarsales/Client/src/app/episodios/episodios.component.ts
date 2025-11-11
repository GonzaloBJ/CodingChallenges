
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para ngIf, ngFor

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

  // --- Paginación ---

  // Fuente de datos completa
  private initialData: ItemTabla[] = [
    { id: 1, nombre: 'Episodio Piloto', emitidoEn: 'HBO', temporadaConNumeroEpisodio: 'T01E01' },
    { id: 2, nombre: 'El Misterio', emitidoEn: 'Netflix', temporadaConNumeroEpisodio: 'T02E05' },
    { id: 3, nombre: 'Un Nuevo Día', emitidoEn: 'Disney+', temporadaConNumeroEpisodio: 'T03E10' },
    { id: 4, nombre: 'La Confrontación', emitidoEn: 'HBO', temporadaConNumeroEpisodio: 'T01E02' },
    { id: 5, nombre: 'Secretos Revelados', emitidoEn: 'Netflix', temporadaConNumeroEpisodio: 'T02E06' },
    { id: 6, nombre: 'El Final', emitidoEn: 'Disney+', temporadaConNumeroEpisodio: 'T03E11' },
    { id: 7, nombre: 'Otro Comienzo', emitidoEn: 'HBO', temporadaConNumeroEpisodio: 'T01E03' },
    { id: 8, nombre: 'Falsa Calma', emitidoEn: 'Netflix', temporadaConNumeroEpisodio: 'T02E07' },
    { id: 9, nombre: 'Viaje a Casa', emitidoEn: 'Disney+', temporadaConNumeroEpisodio: 'T03E12' },
    { id: 10, nombre: 'El Desafío', emitidoEn: 'HBO', temporadaConNumeroEpisodio: 'T01E04' },
    { id: 11, nombre: 'La Luz', emitidoEn: 'Netflix', temporadaConNumeroEpisodio: 'T02E08' },
    { id: 12, nombre: 'Regreso', emitidoEn: 'Disney+', temporadaConNumeroEpisodio: 'T03E13' },
    { id: 13, nombre: 'El Reencuentro', emitidoEn: 'Hulu', temporadaConNumeroEpisodio: 'T04E01' },
    { id: 14, nombre: 'Crisis', emitidoEn: 'Amazon', temporadaConNumeroEpisodio: 'T04E02' },
    { id: 15, nombre: 'Renacer', emitidoEn: 'Netflix', temporadaConNumeroEpisodio: 'T05E01' }
  ];

  // Datos mostrados en la página actual
  public paginatedData: ItemTabla[] = [];

  // Control de la paginación
  public pageSize: number = 5;
  public currentPage: number = 1;
  public totalItems: number = 0;
  public totalPages: number = 0;

  // --- Selección de Ítem ---
  public selectedItem: ItemTabla | null = null;

  ngOnInit() {
    this.totalItems = this.initialData.length;
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.updatePagination();
  }

  /**
   * Actualiza el subconjunto de datos a mostrar según la página actual.
   */
  updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedData = this.initialData.slice(startIndex, endIndex);
    this.selectedItem = null; // Limpiar selección al cambiar de página
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
  selectItem(item: ItemTabla): void {
    // Si se hace clic en el mismo ítem, se deselecciona.
    this.selectedItem = this.selectedItem === item ? null : item;
  }

  /**
   * Genera un array de números de página para mostrar en el paginador.
   */
  get pageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}
