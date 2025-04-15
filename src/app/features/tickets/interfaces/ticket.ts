export interface Ticket {
    id: number;
    agence: string;
    prix: number;
    destination: string;
}
export interface FilteredTicket {
    agence?: string;
    priceMin?: number;
    priceMax?: number;
    page?: number;
    limit?: number;
}

export interface TicketResponse {
    data: Ticket[];
    total: number;
    currentPage: number;
    totalPages: number;
}