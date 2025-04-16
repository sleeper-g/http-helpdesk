/**
 *  Основной класс приложения
 * */
import TicketService from "./TicketService";
import createRequest from "./api/createRequest";

export default class HelpDesk {
  constructor(container, ticketService) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("This is not HTML element!");
    }
    this.container = container;
    this.ticketService = ticketService;
  }

  async renderPage() {
    const serverAnswer = await this.ticketService.list(createRequest);
    serverAnswer.forEach(el => {
      const ticketStatus = el.status ? "ticket-active" : "ticket-inactive"; // if cheked
      const newEl = document.createElement("div");
      newEl.innerHTML = `
      <div class="ticket-body">
        <label class="ticket-status">
          <input type="checkbox">
          <div class="ticket-status-body"></div>
        </label>
        <div class="ticket-name"></div>
        <div class="ticket-created"></div>
        <button class="ticket-edit">✎</button>
        <button class="ticket-delete">X</button>
        <div class="ticket-deskription ticket-hidden"></div>
      </div>
      `;
      newEl.querySelector(".ticket-name").textContent = el.name;
      newEl.querySelector(".ticket-created").textContent = el.created;
      newEl.querySelector(".ticket-deskription").textContent = el.description;
      this.ticketList.append(newEl);
    });
  }
  init() {
    this.container.innerHTML = `
    <div class="ticket-add-container">
    <div class="ticket-add">Добавить тикет</div>
    </div>
    <div class="ticket-list"></div>
    `;
    this.ticketList = this.container.querySelector(".ticket-list")
    this.renderPage();
  }
}
