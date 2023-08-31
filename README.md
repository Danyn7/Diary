# Diary

Личный дневник - Diary - web – приложение, в котором можно добавлять, редактировать, удалять записи с форматированным текстом. 
Реализована возможность прикрепления к записи изображения. 

- Изображения отправляются и хранятся в хранилище firebase.
- Текстовая информация хранится в localStorage.
- Используется editor.js и primeng.

## Ссылка на деплой на firebase: https://diary-f0e2f.web.app/


## Действия для сборки

1. Перейдите по ссылке: https://github.com/Danyn7/Diary/tree/master
2. Нажмите зеленую кнопку Code и выберите Download ZIP.
3. Распакуйте архив и откройте в программе vscode.
4. С помощью терминала перейдите в папку с проектом.
5. Наберите в терминале команду npm i
6. Подождите пока установятся зависимости.
7. Убедитесь, что у вас установлен AngularCli.
8. Чтобы запустить приложение в браузере наберите npm start и перейдите по ссылке: http://localhost:4200/
9. Если хотите собрать проект, наберите команду ng build
    
## Ссылка на деплой на firebase: https://diary-f0e2f.web.app/

## По управлению в приложении:

1. Чтобы прикрепить картинку к записи:
- Нажмите "Выбрать картинку", выберите нужную. После чего нажмите на кнопку "Прикрепить".
- Напишите свою заметку. После появления надписи "Картинка отправлена" желательно подождать 4-5 секунду, чтобы картинка успела загрузиться в хранилище firebase.
- Нажмите на кнопку "Создать".
2. Чтобы отредактировать запись:
- Выберите запись из списка.
- Нажмите "Выбрать для редактирования".
- Вернитесь к окну ввода текста и нажмите "Отредактировать выбранную заметку".
- Отредактируйте текст и нажмите "Сохранить отредактированное".

## Возможные проблемы:

- Во время написания заметки перевод каретки с помощью клавиши "Enter" приводит к тому, что текст после перевода строки не будет сохранен. Для перевода строки пожалуйста используйте "Shift+Enter".


