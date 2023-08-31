import { Component, OnInit } from '@angular/core';
import { UserNote } from 'src/app/models/usernote';
import { usernotes } from 'src/app/data/usernotes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
  title = 'Diary';
  usernots: UserNote[] = usernotes;

  objFromLocalStorage: any = {};
  arrFromLocalStorage: any = [];
  keys: any;

  constructor() {}

  ngOnInit() {
    Object.assign(this.objFromLocalStorage, localStorage);   //обновляю данные в localstorage
    this.keys = Object.keys(this.objFromLocalStorage);
    for (let key of this.keys) {
      if (key !== 'sumCount') {
        this.arrFromLocalStorage.push(`${this.objFromLocalStorage[key]}`);
      }
    }

    this.arrFromLocalStorage.reverse();      //reverse для того, чтобы выводить от свежих к старым
    for (let el of this.arrFromLocalStorage) {
      usernotes.push(JSON.parse(el));            //добавляю из localstorage в массив usernotes
    }                                            //из данных массива usernotes заполняются данные на странице (см.html)
  }
}
