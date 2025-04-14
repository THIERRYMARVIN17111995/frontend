import { baseApi } from "@/app/baseApi";
import { Ticket } from "./interfaces/ticket";

export const ticketsSlice = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTickets: builder.query<Ticket[], void>({
            query: () => "/ticket/all",
        }),
    }),
})
export const { useGetTicketsQuery } = ticketsSlice;