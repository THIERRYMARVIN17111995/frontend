import { baseApi } from "@/app/baseApi";
import { FilteredTicket, Ticket, TicketResponse } from "./interfaces/ticket";

export const ticketsSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTickets: builder.query<Ticket[], void>({
            query: () => "/ticket/all",
        }),
        filterTickets: builder.mutation<TicketResponse, FilteredTicket>({
            query: (filteredTicket) => {
                console.log("Filtered Ticket", filteredTicket);
                return {
                    url: "/ticket/filter",
                    method: "POST",
                    body: filteredTicket,
                }
            },
        })
    }),
})
export const { useGetTicketsQuery,useFilterTicketsMutation } = ticketsSlice;