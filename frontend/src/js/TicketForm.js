export default class TicketForm {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }
  addForm() {
    this.newEl = document.createElement("div");
    this.newEl.className = "add-ticket-form ticket-form";
    this.newEl.innerHTML = `
    <h2>Добавить тикет</h2>
    <form>
    <label for="short-description">Краткое описание</label>
    <input type="text" id="short-description" name="short-description" required>
    <label for="full-description">Подробное описание</label>
    <input type="text" id="full-description" name="full-description" required>    
    <button type="submit" class="buttonCancel">Отмена</button>
    <button type="submit" class="buttonOk">Ок</button>
    </form>`
    this.parentEl.append(this.newEl);
    const buttonCancel = this.newEl.querySelector(".buttonCancel");
    buttonCancel.addEventListener( "click", () => this.newEl.remove());
  };
  render() {
    
  };
  deleteForm() {
    this.newEl.remove();
  }
}
