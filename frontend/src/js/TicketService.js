export default class TicketService {
  constructor(url, port) {
    this.url = url,
    this.port = port
  }
  async list(callback) { 
    const options = {
      methodName: "allTickets",
      method: "GET"
    }
    try {
      const serverAnswer = await callback(
        this.url,
        this.port,
        options.methodName,
        options.method);
      return serverAnswer;
    } catch(error) {
      console.error("error in TicketService list: ", error);
    }
  }

  async get(id, callback) {
    const options = {
      methodName: "ticketById",
      method: "GET",
      id
    }
    try {
      const serverAnswer = await callback(
        this.url,
        this.port,
        options.methodName,
        options.method,
        options.id);
      return serverAnswer;
    } catch(error) {
      console.error("error in TicketService get: ", error);
    } 
  }

  async create(data, callback) {
    const options = {
      methodName: "createTicket",
      method: "POST",
      id: null,
      data,
    }
    try {
      const serverAnswer = await callback(
        this.url,
        this.port,
        this.methodName,
        this.method,
        options.id,
        options.data,
      )
      return serverAnswer;
    } catch(error) {
      console.error("error in TicketService create: ", error)
    }
  }

  update(id, data, callback) {}

  async delete(id, callback) {
    const options = {
      methodName: "deleteById",
      method: "GET",
      id
    }
    try {
      const serverAnswer = await callback(
        this.url,
        this.port,
        options.methodName,
        options.method,
        options.id
      );
      return serverAnswer
    } catch(error) {
      console.error("error in TicketService delete: ", error);
    }
  }
}
