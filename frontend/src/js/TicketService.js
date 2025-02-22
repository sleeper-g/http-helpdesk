/**
 * Класс для связи с сервером.
 * Содержит методы для отправки запросов на сервер и получения ответов
 **/
export default class TicketService {
  list(callback) {
/*     return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("Synchronous data");
      }, 2000);
    });
 */  
    options = {
      url: "http://127.0.0.1",
      port: "7070",
      method: "allTickets",
    }
    callback(options)
  }

  get(id, callback) {}

  create(data, callback) {}

  update(id, data, callback) {}

  delete(id, callback) {}
}
