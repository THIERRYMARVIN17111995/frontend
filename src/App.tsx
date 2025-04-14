
import React, { useEffect, useState } from "react";
import { useGetTicketsQuery } from "./app/features/tickets/ticketsSlice";

interface Ticket {
  id: number;
  agence: string;
  prix: number;
  destination: string;
}

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [agenceFilter, setAgenceFilter] = useState("");
  const [prixFilter, setPrixFilter] = useState(0);

  const {data, error, isLoading} = useGetTicketsQuery();
  console.log(error);

  

  useEffect(() => {
    if (data) {
      setTickets(data);
    }
  }, [data]);

  const filteredTickets = tickets.filter(
    (ticket) =>
      (agenceFilter === "" || ticket.agence === agenceFilter) &&
      (prixFilter === 0 || ticket.prix === prixFilter)
  );

  const agences = Array.from(new Set(tickets.map((t) => t.agence)));

  return (
    <div className="p-6 font-sans">
      <h1 className="mb-4 font-bold text-2xl text-center">Liste des billets de bus</h1>
      <div className="flex gap-4 mb-6">
        <select
          className="p-2 border rounded"
          onChange={(e) => setAgenceFilter(e.target.value)}
        >
          <option value="">Toutes les agences</option>
          {agences.map((a) => (
            <option key={a} value={a}>
              {a}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Prix"
          className="p-2 border rounded"
          onChange={(e) => setPrixFilter(Number(e.target.value))}
        />
      </div>

      <ul className="space-y-2">
        {filteredTickets.map((ticket) => (
          <li
            key={ticket.id}
            className="bg-white shadow-sm p-4 border rounded"
          >
            <p>
              <strong>Agence:</strong> {ticket.agence}
            </p>
            <p>
              <strong>Destination:</strong> {ticket.destination}
            </p>
            <p>
              <strong>Prix:</strong> {ticket.prix} FCFA
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;