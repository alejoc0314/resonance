import { Component, effect, input, output } from '@angular/core';
import { TrackItem } from '../../../../interfaces/songs';
import { AlbumItem } from '../../../../interfaces/albums';
import { ArtistItem } from '../../../../interfaces/artists';

@Component({
  selector: 'app-pager-conditioner',
  standalone: true,
  templateUrl: './pager-conditioner.component.html',
  styleUrls: ['./pager-conditioner.component.scss'],
})
export class PagerConditionerComponent {
  public itemList = input.required<
    TrackItem[] | AlbumItem[] | ArtistItem[] | undefined
  >();
  protected originalItemList:
    | TrackItem[]
    | AlbumItem[]
    | ArtistItem[]
    | undefined = undefined;

  public slicedItemList = output<
    TrackItem[] | AlbumItem[] | ArtistItem[] | undefined
  >();

  protected currentPage: number = 1;
  protected itemsPerPage: number = 4;
  protected isItemListSliced: boolean = false;

  constructor() {
    effect(() => {
      this.pagedTrackList();
    });
  }

  // Método de paginación
  protected pagedTrackList() {
    this.originalItemList = this.itemList();
    if (this.originalItemList) {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      this.slicedItemList.emit(this.originalItemList.slice(start, end));
      this.isItemListSliced = true;
    }
  }

  // Función para avanzar a la siguiente página
  protected nextPage() {
    if (this.currentPage * this.itemsPerPage < this.originalItemList!.length) {
      this.currentPage++;
      this.pagedTrackList();
    }
  }

  // Función para retroceder a la página anterior
  protected prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pagedTrackList();
    }
  }
}
