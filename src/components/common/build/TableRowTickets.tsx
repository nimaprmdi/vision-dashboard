import { Typography, TableRow, TableCell, Avatar, Chip, Link, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import user from "../../../assets/img/user.png";

const TableRowTickets = () => {
    const ticketsState = useSelector((state: RootState) => state.tickets);

    return (
        <>
            {ticketsState.tickets.map((ticket) => (
                <TableRow key={ticket.itemId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell
                        sx={{ color: "white", display: "flex", alignItems: "center", gap: 2 }}
                        component="th"
                        scope="row"
                    >
                        <Avatar alt="image" sx={{ bgcolor: ticket.accounts.color.hex }}>
                            {/* {row.userImage ? <img src={row.userImage} /> : row.name.charAt(0)} */}

                            <Typography variant="h4" textTransform="capitalize" color="white">
                                {ticket.subject.charAt(0)}

                                {/** @todo : charat by account name  */}
                            </Typography>
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
                            {/* {ticket.service} */}

                            {/** @todo: account name  + email   */}
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="left">
                        {ticket.isClose ? (
                            <Chip label="Solved" color="success" />
                        ) : (
                            <Chip label="Pending" color="primary" variant="outlined" />
                        )}
                    </TableCell>

                    <TableCell sx={{ color: "white" }} align="left">
                        {new Date(ticket.date).toISOString().split("T")[0]}
                    </TableCell>

                    <TableCell>
                        <Link href="#" underline="none" color="gray.light" variant="h6">
                            Edit
                        </Link>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default TableRowTickets;
