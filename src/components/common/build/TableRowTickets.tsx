import { Typography, TableRow, TableCell, Avatar, Chip, Link as MUILink, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { Link } from "react-router-dom";

const TableRowTickets = () => {
    const ticketsState = useSelector((state: RootState) => state.tickets);

    return (
        <>
            {ticketsState.tickets.map((ticket) => (
                <TableRow className="c-table__row" key={ticket.itemId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell sx={{ color: "white", display: "flex", alignItems: "center", gap: 2 }} component="th" scope="row">
                        <Avatar alt="image" sx={{ bgcolor: ticket.accounts ? ticket.accounts.color.hex : "gray.light" }}>
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
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="left">
                        <Typography textTransform="capitalize" variant="h6" className="u-text-small" color="white">
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
                        {new Date(ticket.date).toISOString().split("T")[0]}
                    </TableCell>

                    <TableCell>
                        <Link className="u-link-primary" to={`/ticket/${ticket.itemId}`}>
                            <MUILink className="u-link-primary" component="div" underline="none" color="gray.light" variant="h6">
                                Edit
                            </MUILink>
                        </Link>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default TableRowTickets;
