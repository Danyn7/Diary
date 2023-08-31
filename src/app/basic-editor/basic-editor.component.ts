import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, inject, Input, } from '@angular/core';
import EditorJS from '@editorjs/editorjs';
import Underline from '@editorjs/underline';
import { usernotes } from '../data/usernotes';
import { Storage, ref, uploadBytesResumable, getDownloadURL, } from '@angular/fire/storage';
import { appCheckInstance$ } from '@angular/fire/app-check';
import { AppComponent } from '../app.component';
import { SomeDataService } from 'src/app/services/some.service';

@Component({
  selector: 'app-basic-editor',
  templateUrl: './basic-editor.component.html',
  styleUrls: ['./basic-editor.component.css'],
})

export class BasicEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editor', { read: ElementRef })
  editorElement: ElementRef;

  private editor: EditorJS;

  elTextareaFather: any = document.getElementsByClassName('ce-paragraph');
  edit = true;  // установка значения по умолчанию
  sendEdit = false; // установка значения по умолчанию

  public constructor(private someServ: SomeDataService) {  //данные из сервиса
    this.someServ.data;
    this.someServ.EditNumber;
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initializeEditor();
  }

  private initializeEditor(): void {
                                           //конфигурация для EditorJs
    this.editor = new EditorJS({
      placeholder: 'Самое время что-нибудь написать',
      autofocus: true,
      tools: {
        underline: Underline, //дополнительно установка инструмента "подчеркивание"
      },
      minHeight: 100,
      holder: this.editorElement.nativeElement,
    });
  }

  sum: number = 0; //значение по умолчанию

  showEditorData() {
    this.editor.save().then((data) => {
      if (data.blocks[0].data.text.length) {   //из editor.js получаю data и проверяю есть ли там введенный текст(проверка на пустоту)
        if (localStorage.length > 0) {
          let amountEl = localStorage.getItem('sumCount');  //sumCount отражает сколько пар ключ-значение добавлено в localstorage(не считая sumCount)
          this.sum = Number(amountEl); 
        }
        this.sum++;
        data.blocks[0].data.image = this.urlImage;  //полученному объекту data добавляю ключ image и кладу в него url прикрепленного изображения(url получаем в функции getDownloadURL(см.ниже))

        setTimeout(() => {
          localStorage.setItem(`sumCount`, `${this.sum}`); //в localstorage обновляю значение sumCount
          localStorage.setItem(`${this.sum}`, `${JSON.stringify(data)}`); //и добавляю data c новым полем image 
          location.reload(); //перезагрузка страницы
          this.editor.clear(); //очищение поля ввода текста
        }, 1000);
      }
    });
  }

  editjson: any; // данные о заметке, которую хочу отредактировать из localstorage
  editobj: any; //обьект основанный на старой заметке, но с новым текстом(см.ниже)
  editNotes() {  //получаем в textarea текст той заметки, которую хотим отредактировать
    this.elTextareaFather[0].insertAdjacentHTML(   //использую insertAdjacentHTML, чтобы вставлять текст с учетом тегов
      'beforeend',
      this.someServ.data  //использую сервис, чтобы получить данные из другого компонента
    );
    this.edit = false;  
    this.sendEdit = true;
  }

  sendEditNotes() { //отправляем в localstorage то, что отредактировали
    this.editjson = localStorage.getItem(this.someServ.EditNumber); //получаю с помощью сервиса ключ к данным заметки, которую хочу отредактировать
    this.editobj = JSON.parse(this.editjson); //парсим в объект this.editobj данные из localstorage
    this.editor.save().then((data) => {
      this.editobj.blocks[0].data.text = data.blocks[0].data.text; //редактируем в this.editobj поле text на новый из textarea
      console.log(this.editobj);
      localStorage.setItem(           //и теперь кладем обратно в local storage по ключу 
        this.someServ.EditNumber,
        JSON.stringify(this.editobj)
      );
    });
    this.editor.clear();  //очищаем textarea
    location.reload();  //перезагружаем страницу
    this.edit = true;
    this.sendEdit = false;
  }

  infoFile: string = 'Прикрепить';
  sendFile: string = 'Добавьте картинку, если хотите :)';
  urlImage: any;
  private readonly storage: Storage = inject(Storage);

  @ViewChild('fileUpload') fileUpload: any;

  uploadFile(event: any) {   
    if (!event.files) return;

    const files: FileList = event.files;

    const file = files[0];
    if (file) {
      const storageRef = ref(this.storage, `images/${file.name}`);
      uploadBytesResumable(storageRef, file); //загрузка картинки на firebase storage
      this.fileUpload.clear();   //очистка поля прикрепленных фото
      this.sendFile = 'Картинка отправлена';

      setTimeout(() => {
        getDownloadURL(ref(this.storage, `images/${file.name}`))  //получение url прикрепленной картинки
          .then((url) => {
            const xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = (event) => {
              const blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.send();
            console.log(url.toString());  
            this.urlImage = url.toString(); //присваиваю полученный url в this.urlImage (мы используем его выше)
          })
          .catch((error) => {});
      }, 3000); //с небольшой отсрочкой, потому что файлу нужно время, чтобы загрузиться на облако firebase
    }
  }
}
