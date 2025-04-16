import HelpDesk from "./HelpDesk";
import TicketService from "./TicketService";
import createRequest from "./api/createRequest";

const root = document.getElementById("root");

const ticketService = new TicketService("192.168.99.144", "7070");

const app = new HelpDesk(root, ticketService);

app.init();
