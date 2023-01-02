import { Typography, TableRow, TableCell, Avatar, Chip, Link as MUILink, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ITicket } from "../../../models/tickets";

const TableRowTickets = () => {
    const ticketsState = useSelector((state: RootState) => state.tickets);
    const currentAccount = useSelector((state: RootState) => state.accounts.currentAccount);
    const [tickets, setTickets] = useState<ITicket[]>();

    useEffect(() => {
        if (currentAccount.isAdmin) {
            setTickets(ticketsState.tickets);
        } else {
            const accountTickets = ticketsState.tickets.filter((ticket) => ticket.accounts?.itemId !== currentAccount.itemId);
            accountTickets && setTickets(accountTickets);
        }
    }, [currentAccount]);

    return (
        <>
            {tickets && tickets.length ? (
                tickets.map((ticket) => (
                    <TableRow className="c-table__row u-opacity-0 u-fadein " key={ticket.itemId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell sx={{ color: "white" }} component="th" scope="row">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Avatar
                                    alt="image"
                                    sx={{
                                        bgcolor: ticket.accounts ? (ticket.accounts.color ? ticket.accounts.color.hex : "gray.light") : "gray.light",
                                    }}
                                >
                                    {ticket.accounts && ticket.accounts.profileImage ? (
                                        <img src={ticket.accounts.profileImage.url} />
                                    ) : (
                                        <Typography variant="h4" textTransform="capitalize" color="white">
                                            {ticket.accounts ? ticket.accounts.name.charAt(0) : "👻"}
                                        </Typography>
                                    )}
                                </Avatar>

                                <Box>
                                    <Typography variant="h6" textTransform="capitalize" className="u-text-small" color="white">
                                        {ticket.subject}
                                    </Typography>

                                    <Typography variant="h6" className="u-text-small" color="gray.light">
                                        {ticket.description.slice(0, 20)}
                                    </Typography>
                                </Box>
                            </Box>
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="left">
                            <Typography variant="h6" textTransform="capitalize" className="u-text-small" color="white">
                                {`${ticket.accounts && ticket.accounts.name} ${ticket.accounts && ticket.accounts.lastName}`}
                            </Typography>

                            <Typography variant="h6" className="u-text-small" color="gray.light">
                                {ticket.accounts ? ticket.accounts.email : "No Data Found"}
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="left">
                            {ticket.isClose ? <Chip label="Solved" color="success" /> : <Chip label="Pending" color="primary" variant="outlined" />}
                        </TableCell>

                        <TableCell sx={{ color: "white" }} align="left">
                            {ticket.date ? new Date(ticket.date).toISOString().split("T")[0] : ""}
                        </TableCell>

                        <TableCell>
                            <Link className="u-link-primary" to={`/ticket/${ticket.itemId}`}>
                                <MUILink className="u-link-primary" component="div" underline="none" color="gray.light" variant="h6">
                                    Edit
                                </MUILink>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow className="c-table__row u-opacity-0 u-fadein " sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell>
                        <Typography variant="h4" textTransform="capitalize" color="white" sx={{ mt: 2 }}>
                            No Data Found
                        </Typography>
                    </TableCell>
                </TableRow>
            )}
        </>
    );
};

export default TableRowTickets;
