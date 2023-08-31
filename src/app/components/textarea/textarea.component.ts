import { Component, Input, inject } from '@angular/core';
import { UserNote } from 'src/app/models/usernote';
import { Database } from '@angular/fire/database';
import { SomeDataService } from 'src/app/services/some.service';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.css'],
})

export class TextareaComponent {
  @Input() usernot: UserNote; //это массив с типом UserNote от родителя AppComponent

  public constructor(private someServ: SomeDataService) {
    this.someServ.data;   //данные в сервисе для обмена данными с компонентом эдитора
    this.someServ.EditNumber;
  }

  @Input() arrFromLocalStorageCh: any; //массив из local storage
  @Input() indexComp: any; //индекс версии компонента

  objFromLocalStorage: any = {};
  arrFromLocalStorage: any = [];

  deleteNote(event: any) {   //удаление заметки 
    if (event.target.tagName === 'SPAN') { //отслеживаем клик
      localStorage.removeItem(event.target.parentNode.parentNode.id); //удаляем данные из local storage по ключу
      localStorage.setItem(    //обновляем значение sumCount(сколько всего заметок)
        'sumCount',
        String(Number(localStorage.getItem('sumCount')) - 1)
      );
      Object.assign(this.objFromLocalStorage, localStorage);  
      let keys = Object.keys(this.objFromLocalStorage); 
      for (let key of keys) {
        if (key !== 'sumCount') {
          this.arrFromLocalStorage.push(`${this.objFromLocalStorage[key]}`); //помещаю в массив данные из localstorage
        }
      }
      localStorage.clear(); //очищаю localstorage
      for (let i = 0; i < this.arrFromLocalStorage.length; i++) {
        localStorage.setItem(`${i + 1}`, `${this.arrFromLocalStorage[i]}`); //и теперь заново добавляю данные в localstorage(так как ключи у них изменятся)
      }
      localStorage.setItem('sumCount', `${this.arrFromLocalStorage.length}`); //обновляю sumCount
      location.reload(); //перезагружаю страницу
    } else if (event.target.tagName === 'BUTTON') {  //ниже тоже самое, но если клик был не по тексту кнопки
      localStorage.removeItem(event.target.parentNode.id);
      localStorage.setItem(
        'sumCount',
        String(Number(localStorage.getItem('sumCount')) - 1)
      );
      Object.assign(this.objFromLocalStorage, localStorage);
      let keys = Object.keys(this.objFromLocalStorage);
      for (let key of keys) {
        if (key !== 'sumCount') {
          this.arrFromLocalStorage.push(`${this.objFromLocalStorage[key]}`);
        }
      }
      localStorage.clear();
      for (let i = 0; i < this.arrFromLocalStorage.length; i++) {
        localStorage.setItem(`${i + 1}`, `${this.arrFromLocalStorage[i]}`);
      }
      localStorage.setItem('sumCount', `${this.arrFromLocalStorage.length}`);
      location.reload();
    }
  }

  editNow: any;
  parseEditNow: any;
  textEditNow: any;
  keyEditNow: any;

  editNote(event: any) {
    if (event.target.tagName === 'SPAN') { //проверяем клик по элементу
      this.editNow = localStorage.getItem(
        String(Number(event.target.parentNode.parentNode.id) - 10)  //узнаю номер ключа в local storage заметки, которую хочу отредактировать и получаю данные
      );
      this.parseEditNow = JSON.parse(this.editNow); //парсим в объект this.parseEditNow 
      this.textEditNow = this.parseEditNow.blocks[0].data.text; //достаем из объекта текст заметки
      this.keyEditNow = String(                                  //узнаем ключ
        Number(event.target.parentNode.parentNode.id) - 10        //это нам нужно, чтобы поместить ключ и текст в сервис, чтобы компонент эдитора мог получить к этим данным доступ
      );

      this.someServ.data = this.textEditNow; //с помощью сервиса делаю доступным для компонента эдитора текст заметки
      this.someServ.EditNumber = this.keyEditNow; //тоже для номера ключа
    } else if (event.target.tagName === 'BUTTON') { //проверяем клик по элементу
      this.editNow = localStorage.getItem(
        String(Number(event.target.parentNode.id) - 10)
      );
      this.parseEditNow = JSON.parse(this.editNow);
      this.textEditNow = this.parseEditNow.blocks[0].data.text;
      this.keyEditNow = String(
        Number(event.target.parentNode.parentNode.id) - 10
      );

      this.someServ.data = this.textEditNow; //с помощью сервиса делаю доступным для компонента эдитора текст заметки
      this.someServ.EditNumber = this.keyEditNow; //тоже для номера ключа
    }
  }
}
