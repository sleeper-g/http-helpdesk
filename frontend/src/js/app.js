import { baseURL, requestCallback } from './api/createRequest.js';
import { createTicketElement } from './ui.js';

document.addEventListener('DOMContentLoaded', () => {
  const ticketList = document.querySelector('.ticket-list');
  const addBtn = document.querySelector('.btn-add');
  const modal = document.querySelector('.ticket-add');
  const form = modal.querySelector('.ticket-form');
  const cancelBtn = modal.querySelector('.btn-cancel');
  const deleteModal = document.querySelector('.ticket-delete');
  const confirmDeleteBtn = deleteModal.querySelector('.btn-ok');
  const cancelDeleteBtn = deleteModal.querySelector('.btn-cancel');

  let editingTicketId = null;
  let ticketIdToDelete = null;
  const expandedTickets = new Set();

  const setEditingTicketId = (id) => editingTicketId = id;

  const showModal = () => modal.classList.remove('hidden');
  const hideModal = () => {
    modal.classList.add('hidden');
    editingTicketId = null;
  };

  const showDeleteConfirm = (id) => {
    ticketIdToDelete = id;
    deleteModal.classList.remove('hidden');
  };

  const hideDeleteConfirm = () => {
    ticketIdToDelete = null;
    deleteModal.classList.add('hidden');
  };

  const loadTickets = async () => {
    ticketList.innerHTML = '';
    const tickets = await requestCallback(baseURL, 'allTickets', 'GET');
    tickets.forEach(ticket => {
      const ticketEl = createTicketElement(ticket, expandedTickets, loadTickets, form, showModal, setEditingTicketId, showDeleteConfirm);
      ticketList.appendChild(ticketEl);
    });
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: form.querySelector('[name="short-description"]').value,
      description: form.querySelector('[name="full-description"]').value,
      status: false
    };

    if (editingTicketId) {
      await requestCallback(baseURL, 'updateById', 'PUT', editingTicketId, formData);
    } else {
      await requestCallback(baseURL, 'createTicket', 'POST', null, formData);
    }

    form.reset();
    hideModal();
    await loadTickets();
  });

  confirmDeleteBtn.addEventListener('click', async () => {
    if (ticketIdToDelete) {
      await requestCallback(baseURL, 'deleteById', 'GET', ticketIdToDelete);
      hideDeleteConfirm();
      await loadTickets();
    }
  });

  cancelDeleteBtn.addEventListener('click', hideDeleteConfirm);

  addBtn.addEventListener('click', showModal);
  cancelBtn.addEventListener('click', () => {
    form.reset();
    hideModal();
  });

  loadTickets();
});
