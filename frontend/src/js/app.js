import HelpDesk from "./HelpDesk";
import TicketService from "./TicketService";

import createRequest from "./api/createRequest";
//const options = { url: "127.0.0.1:7070", };
//createRequest(options);

const root = document.getElementById("root");

const ticketService = new TicketService();
ticketService.list(createRequest);
//createRequest({url: "http://127.0.0.1", port: "7070"});
const app = new HelpDesk(root, ticketService);

app.init();
