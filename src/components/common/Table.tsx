import React from "react";
import {
    Table as TableMUI,
    Typography,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Avatar,
    Box,
    Chip,
    Link,
} from "@mui/material";
import user from "../../assets/img/user.png";

const Table = () => {
    function createData(
        name: string,
        email: string,
        position: string,
        status: boolean,
        date: number,
        userImage?: string
    ) {
        return { name, email, position, status, date, userImage };
    }

    const rows = [
        createData("Frozen yoghurt", "nimaprmdi@gmail.com", "Front-End", true, Date.now(), user),
        createData("Ice cream sandwich", "nimaprmdi@gmail.com", "Front-End", true, Date.now()),
        createData("Eclair", "nimaprmdi@gmail.com", "Front-End", false, Date.now()),
        createData("Cupcake", "nimaprmdi@gmail.com", "Front-End", true, Date.now()),
        createData("Gingerbread", "nimaprmdi@gmail.com", "Front-End", false, Date.now()),
    ];

    return (
        <TableContainer
            component={Paper}
            sx={{
                borderRadius: "20px",
                background: "linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
                backdropFilter: "blur(60px)",
                p: 2,
                mt: 3,
            }}
        >
            <Typography ml={1} my={3} variant="h5" color="white">
                Authors Table
            </Typography>

            <TableMUI sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ color: "white" }}>Dessert (100g serving)</TableCell>
                        <TableCell sx={{ color: "white" }} align="left">
                            Calories
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="left">
                            Fat&nbsp;(g)
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="left">
                            Carbs&nbsp;(g)
                        </TableCell>
                        <TableCell sx={{ color: "white" }} align="left">
                            Protein&nbsp;(g)
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell
                                sx={{ color: "white", display: "flex", alignItems: "center", gap: 2 }}
                                component="th"
                                scope="row"
                            >
                                <Avatar alt="image" sx={{ bgcolor: "master.light" }}>
                                    {row.userImage ? <img src={row.userImage} /> : row.name.charAt(0)}
                                </Avatar>

                                <Box>
                                    {row.name}

                                    <Typography variant="h6" className="u-text-small" color="gray.light">
                                        {row.email}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ color: "white" }} align="left">
                                {row.position}
                            </TableCell>
                            <TableCell sx={{ color: "white" }} align="left">
                                {row.status ? (
                                    <Chip label="online" color="success" />
                                ) : (
                                    <Chip label="offline" color="primary" variant="outlined" />
                                )}
                            </TableCell>

                            <TableCell sx={{ color: "white" }} align="left">
                                {new Date(row.date).toISOString().split("T")[0]}
                            </TableCell>

                            <TableCell>
                                <Link href="#" underline="none" color="gray.light" variant="h6">
                                    Edit
                                </Link>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </TableMUI>
        </TableContainer>
    );
};

export default Table;
