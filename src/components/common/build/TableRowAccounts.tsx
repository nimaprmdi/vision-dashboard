import { Typography, TableRow, TableCell, Avatar, Chip, Link as MUILink, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";
import { Link } from "react-router-dom";
import { IAccount } from "../../../models/account";
import { useState, useEffect } from "react";

const TableRowAccounts = () => {
    const accountsState = useSelector((state: RootState) => state.accounts);
    const [accounts, setAccounts] = useState<IAccount[]>();

    useEffect(() => {
        if (accountsState.currentAccount.isAdmin) {
            setAccounts(accountsState.accounts);
        } else {
            const userAccount = accountsState.accounts.filter((account) => account.itemId === accountsState.currentAccount.itemId);
            console.log(userAccount);
            setAccounts(userAccount);
        }
    }, [accountsState.currentAccount]);

    return (
        <>
            {accounts && accounts.length ? (
                accounts.map((account) => (
                    <TableRow
                        key={`account-item-${account.itemId}`}
                        className="c-table__row u-opacity-0 u-fadein"
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                        <TableCell sx={{ color: "white" }} component="th" scope="row">
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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

export default TableRowAccounts;
