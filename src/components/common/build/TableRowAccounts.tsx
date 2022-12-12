import { Typography, TableRow, TableCell, Avatar, Chip, Link, Box } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/rootReducer";

const TableRowAccounts = () => {
    const accountsState = useSelector((state: RootState) => state.accounts);

    return (
        <>
            {accountsState.accounts.map((account) => (
                <TableRow
                    key={account.itemid}
                    className="c-table__row"
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                    <TableCell
                        sx={{ color: "white", display: "flex", alignItems: "center", gap: 2 }}
                        component="th"
                        scope="row"
                    >
                        <Avatar alt="image" sx={{ bgcolor: account.color.hex || "gray.light" }}>
                            {account.profileImage ? (
                                <img src={account.profileImage.url} />
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
                        {account.isAdmin ? (
                            <Chip label="Admin" color="success" />
                        ) : (
                            <Chip label="User" color="primary" variant="outlined" />
                        )}
                    </TableCell>

                    <TableCell sx={{ color: "white" }} align="left">
                        {new Date(account.createdAt).toISOString().split("T")[0]}
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

export default TableRowAccounts;
