import { computed, Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GeneralStateService {
  public showHome = signal<boolean>(false);
  private windowHeight = signal<number>(0);
  private navbarHeight = signal<number>(0);
  private footerHeight = signal<number>(0);
  private isSearching = signal<boolean>(false);
  private displaySearch = signal<boolean>(false);
  private remainingHeight = computed(() => {
    return this.windowHeight() - this.navbarHeight() - 10;
  });
  public actualSong = signal(0);

  private remainingHeightWithFooter = computed(() => {
    return this.windowHeight() - this.navbarHeight() - this.footerHeight();
  });

  constructor() {}

  /*
   * Getter y setter para "navbarHeight"
   * navbarHeight: Altura de la barra de navegación.
   */
  getNavbarHeight() {
    return this.navbarHeight();
  }
  setNavbarHeight(state: number) {
    this.navbarHeight.set(state);
  }

  /*
   * Getter y setter para "footerHeight"
   * footerHeight: Altura del pie de página.
   */
  getFooterHeight() {
    return this.footerHeight();
  }
  setFooterHeight(state: number) {
    this.footerHeight.set(state);
  }

  /*
   * Getter y setter para "isSearching"
   * isSearching: Indica si se está realizando una búsqueda.
   */
  getIsSearching() {
    return this.isSearching();
  }
  setIsSearching(state: boolean) {
    this.isSearching.set(state);
  }

  /*
   * Getter y setter para "displaySearch"
   * displaySearch: Controla la visualización del componente de búsqueda.
   */
  getDisplaySearch() {
    return this.displaySearch();
  }
  setDisplaySearch(state: boolean) {
    this.displaySearch.set(state);
  }

  /*
   * Computado: "remainingHeight"
   * remainingHeight: Calcula la altura restante para el contenido principal
   * considerando la altura de la ventana, la barra de navegación y un margen fijo.
   */
  getRemainingHeight(): string {
    return `${this.remainingHeight()}px`;
  }

  getRemainingHeightWithFooter(): string {
    return `${this.remainingHeightWithFooter()}px`;
  }

  /*
   * Setter para "windowHeight"
   * windowHeight: Actualiza la altura de la ventana.
   */
  public setWindowHeight(height: number) {
    this.windowHeight.set(height);
  }
}
