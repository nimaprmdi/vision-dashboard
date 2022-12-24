import { Typography, TableRow, TableCell, Avatar, Chip, Link as MUILink, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { Link } from "react-router-dom";

const TableRowAccounts = () => {
    const accountsState = useSelector((state: RootState) => state.accounts);

    return (
        <>
            {accountsState.accounts.map((account) => (
                <TableRow key={`account-item-${account.itemId}`} className="c-table__row" sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell sx={{ color: "white", display: "flex", alignItems: "center", gap: 2 }} component="th" scope="row">
                        <Avatar alt="image" sx={{ bgcolor: account.color ? account.color.hex : "gray.light" }}>
                            {account.profileImage ? (
                                <img src={account.profileImage.url} style={{ objectFit: "cover", width: "100%", height: "100%" }} />
                            ) : (
                                <Typography variant="h4" textTransform="capitalize" color="white">
                                    {account.name.charAt(0)}
                                </Typography>
                            )}
                        </Avatar>

                        <Box>
                            <Typography variant="h6" textTransform="capitalize" className="u-text-small" color="white">
                                {`${account.name} ${account.lastName}`}
                            </Typography>

                            <Typography variant="h6" className="u-text-small" color="gray.light">
                                {account.userName}
                            </Typography>
                        </Box>
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="left">
                        <Typography textTransform="capitalize" variant="h6" className="u-text-small" color="white">
                            {account.email}
                        </Typography>
                    </TableCell>
                    <TableCell sx={{ color: "white" }} align="left">
                        {account.isAdmin ? <Chip label="Admin" color="success" /> : <Chip label="User" color="primary" variant="outlined" />}
                    </TableCell>

                    <TableCell sx={{ color: "white" }} align="left">
                        {new Date(account.createdAt).toISOString().split("T")[0]}
                    </TableCell>

                    <TableCell>
                        <Link className="u-link-primary" to={`/user/${account.itemId}`}>
                            <MUILink className="u-link-primary" component="div" href="#" underline="none" color="gray.light" variant="h6">
                                Edit
                            </MUILink>
                        </Link>
                    </TableCell>
                </TableRow>
            ))}
        </>
    );
};

export default TableRowAccounts;
