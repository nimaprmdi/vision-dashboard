import { Typography, TableRow, TableCell, Avatar, Chip, Link, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import user from "../../../assets/img/user.png";

const TableRowRequests = (): JSX.Element => {
    const requestsState = useSelector((state: RootState) => state.requests);

    return (
        <>
            {requestsState.requests.map((request) => (
                <TableRow key={request.itemId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell
                        sx={{ color: "white", display: "flex", alignItems: "center", gap: 2 }}
                        component="th"
                        scope="row"
                    >
                        <Avatar alt="image" sx={{ bgcolor: "master.light" }}>
                            {/* {row.userImage ? <img src={row.userImage} /> : row.name.charAt(0)} */}

                            <Typography variant="h4" textTransform="capitalize" color="white">
                                {request.name.charAt(0)}
                            </Typography>
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
                        {new Date(request.date).toISOString().split("T")[0]}
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

export default TableRowRequests;
