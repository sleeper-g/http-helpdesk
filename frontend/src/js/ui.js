import { baseURL, requestCallback, formatDate } from './api/createRequest';

export function createTicketElement(ticket, expandedTickets, loadTickets, form, showModal, setEditingTicketId) {
  const ticketEl = document.createElement('div');
  ticketEl.classList.add('ticket');

  const statusCheckbox = document.createElement('input');
  statusCheckbox.type = 'checkbox';
  statusCheckbox.checked = ticket.status;
  statusCheckbox.addEventListener('change', async () => {
    await requestCallback(baseURL, 'updateById', 'PUT', ticket.id, {
      name: ticket.name,
      description: ticket.description,
      status: statusCheckbox.checked
    });
    await loadTickets();
  });

  const contentWrapper = document.createElement('div');
  contentWrapper.style.flex = '1';
  contentWrapper.style.cursor = 'pointer';

  const nameEl = document.createElement('span');
  nameEl.textContent = ticket.name;

  const descriptionEl = document.createElement('div');
  descriptionEl.textContent = ticket.description;
  descriptionEl.style.marginTop = '5px';
  descriptionEl.style.color = '#444';
  descriptionEl.style.fontSize = '14px';
  descriptionEl.style.display = expandedTickets.has(ticket.id) ? 'block' : 'none';

  contentWrapper.appendChild(nameEl);
  contentWrapper.appendChild(descriptionEl);

  contentWrapper.addEventListener('click', () => {
    if (expandedTickets.has(ticket.id)) {
      expandedTickets.delete(ticket.id);
      descriptionEl.style.display = 'none';
    } else {
      expandedTickets.add(ticket.id);
      descriptionEl.style.display = 'block';
    }
  });

  const dateEl = document.createElement('span');
  dateEl.classList.add('ticket-date');
  dateEl.textContent = formatDate(ticket.created);

  const actionsEl = document.createElement('div');
  actionsEl.classList.add('ticket-actions');

  const editBtn = document.createElement('button');
  editBtn.textContent = '✏️';
  editBtn.classList.add('btn-edit');
  editBtn.addEventListener('click', () => {
    setEditingTicketId(ticket.id);
    form.querySelector('[name="short-description"]').value = ticket.name;
    form.querySelector('[name="full-description"]').value = ticket.description;
    showModal();
  });

  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = '🗑️';
  deleteBtn.classList.add('btn-delete');
  deleteBtn.addEventListener('click', async () => {
    await requestCallback(baseURL, 'deleteById', 'GET', ticket.id);
    await loadTickets();
  });

  actionsEl.appendChild(editBtn);
  actionsEl.appendChild(deleteBtn);

  ticketEl.appendChild(statusCheckbox);
  ticketEl.appendChild(contentWrapper);
  ticketEl.appendChild(dateEl);
  ticketEl.appendChild(actionsEl);

  return ticketEl;
}
