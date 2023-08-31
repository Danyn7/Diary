import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SomeDataService {  //сервис для обмена данными между компонентами
data: any;                 //это текст редактируемой заметки
EditNumber: any;            //это ключ этой заметки в local storage
}






