import { Pipe, PipeTransform } from '@angular/core';
import {Movie} from "../../DataModel/Movie";

@Pipe({
  name: 'movieFilter'
})
export class MovieFilterPipe implements PipeTransform {

  transform(items: Movie[], searchText: string): Movie[] {
    if (!items) {
      return [];
    }
    if (!searchText) {
      return items;
    }
    searchText = searchText.toLocaleLowerCase();
    return items.filter(it => it.title.toLowerCase().includes(searchText));
  }

}
