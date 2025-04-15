import React, { useEffect, useState } from "react";
import {
  useFilterTicketsMutation,
  useGetTicketsQuery,
} from "./app/features/tickets/ticketsSlice";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./components/ui/pagination";

interface Ticket {
  id: number;
  agence: string;
  prix: number;
  destination: string;
}

function App() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [agence, setAgence] = useState<string>("");
  const [prixMin, setPrixMin] = useState<number>(0);
  const [prixMax, setPrixMax] = useState<number>(0);
  const [filterTickets] = useFilterTicketsMutation();
  const { data, error, isLoading } = useGetTicketsQuery();
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchFiltered = async () => {
      try {
        if (agence || prixMin || prixMax) {
          const response = await filterTickets({
            agence,
            priceMin: prixMin,
            priceMax: prixMax,
            page: currentPage,
            limit: itemsPerPage,
          }).unwrap();

          setTickets(response.data);
          setTotalPages(response.totalPages);
        } else if (data) {
          const total = data.length;
          const startIndex = (currentPage - 1) * itemsPerPage;
          const endIndex = startIndex + itemsPerPage;
          setTickets(data.slice(startIndex, endIndex));
          setTotalPages(Math.ceil(total / itemsPerPage));
        }
      } catch (error) {
        console.error("Erreur de filtrage :", error);
      }
    };

    fetchFiltered();
  }, [agence, prixMin, prixMax, currentPage, data]);

  const agences = Array.from(new Set((data || []).map((t) => t.agence)));

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-6 font-sans">
      <h1 className="mb-4 font-bold text-2xl text-center">Liste des billets de bus</h1>

      {/* Filtres */}
      <div className="flex gap-4 mb-6">
        <select
          className="p-2 border rounded"
          value={agence}
          onChange={(e) => {
            setCurrentPage(1);
            setAgence(e.target.value);
          }}
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
          placeholder="Prix minimum"
          className="p-2 border rounded"
          onChange={(e) => {
            setCurrentPage(1);
            setPrixMin(Number(e.target.value));
          }}
        />

        <input
          type="number"
          placeholder="Prix maximum"
          className="p-2 border rounded"
          onChange={(e) => {
            setCurrentPage(1);
            setPrixMax(Number(e.target.value));
          }}
        />
      </div>

      {/* Tickets */}
      <ul className="space-y-2">
        {tickets.map((ticket) => (
          <li key={ticket.id} className="bg-white shadow-sm p-4 border rounded">
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

      {/* Pagination */}
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  isActive={currentPage === page}
                  onClick={() => setCurrentPage(page)}
                  className={currentPage === page ? "bg-primary text-white" : ""}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}

export default App;
