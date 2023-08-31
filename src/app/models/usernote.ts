export interface UserNote {  //создаем описание типа объекта, который будем получать из эдитора
  "time"?: any,
  "blocks": [
       {
          "id": string,
          "type": string,
          "data": {
             "text": string
          }
       }
    ] | any
}