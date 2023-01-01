import { Typography, TableRow, TableCell, Avatar, Chip, Link as MUILink, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IRequest } from "../../../models/request";

const TableRowRequests = (): JSX.Element => {
    const requestsState = useSelector((state: RootState) => state.requests);
    const currentAccount = useSelector((state: RootState) => state.accounts.currentAccount);
    const [requests, setRequests] = useState<IRequest[]>();

    useEffect(() => {
        if (currentAccount.isAdmin) {
            setRequests(requestsState.requests);
        } else {
            const userRequests = requestsState.requests.filter((request) => request.account?.userName === currentAccount.userName);
            setRequests(userRequests);
        }
    }, [currentAccount]);

    return (
        <>
            {requests && requests.length ? (
                requests.map((request) => (
                    <TableRow className="c-table__row  u-opacity-0 u-fadein " key={request.itemId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                        <TableCell sx={{ color: "white", display: "flex", alignItems: "center", gap: 2 }} component="th" scope="row">
                            <Avatar alt="image" sx={{ bgcolor: request.account && request.account.color ? request.account.color.hex : "gray.light" }}>
                                {request.account && request.account.profileImage ? (
                                    <img src={request.account && request.account.profileImage.url} />
                                ) : (
                                    <Typography variant="h4" textTransform="capitalize" color="white">
                                        {request.name ? request.name.charAt(0) : "👻"}
                                    </Typography>
                                )}
                            </Avatar>

                            <Box>
                                <Typography variant="h6" textTransform="capitalize" className="u-text-small" color="white">
                                    {`${request.name} ${request.lastName}`}
                                </Typography>

                                <Typography variant="h6" className="u-text-small" color="gray.light">
                                    {request.mobile}
                                </Typography>
                            </Box>
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="left">
                            <Typography textTransform="capitalize" variant="h6" className="u-text-small" color="white">
                                {request.service}
                            </Typography>
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="left">
                            {request.itemStatus === "solved" ? (
                                <Chip label="Solved" color="success" />
                            ) : (
                                <Chip label="Pending" color="primary" variant="outlined" />
                            )}
                        </TableCell>

                        <TableCell sx={{ color: "white" }} align="left">
                            {request.date && new Date(request.date).toISOString().split("T")[0]}
                        </TableCell>

                        <TableCell>
                            <Link className="u-link-primary" to={`/request/${request.itemId}`}>
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

export default TableRowRequests;
