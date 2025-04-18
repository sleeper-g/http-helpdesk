import HelpDesk from "./HelpDesk";
import TicketService from "./TicketService";

const root = document.getElementById("root");
const ticketService = new TicketService("127.0.0.1", "7070");
const app = new HelpDesk(root, ticketService);
app.init();
