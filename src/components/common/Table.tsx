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
import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";

interface TableProps {
    tableTitle?: string;
    data: "requests";
}

const Table = ({ tableTitle, data }: TableProps) => {
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

    const tableState = useSelector((state: RootState) => state[data]);

    console.log(tableState);

    const rows = [
        createData("Frozen yoghurt", "nimaprmdi@gmail.com", "Front-End", true, Date.now(), user),
        createData("Ice cream sandwich", "nimaprmdi@gmail.com", "Front-End", true, Date.now()),
        createData("Eclair", "nimaprmdi@gmail.com", "Front-End", false, Date.now()),
        createData("Cupcake", "nimaprmdi@gmail.com", "Front-End", true, Date.now()),
        createData("Gingerbread", "nimaprmdi@gmail.com", "Front-End", false, Date.now()),
        createData("Gingerbread2", "nimaprmdi@gmail.com", "Front-End", false, Date.now(), user),
        createData("Gingerbread3", "nimaprmdi@gmail.com", "Front-End", false, Date.now()),
        createData("Cupcake3", "nimaprmdi@gmail.com", "Front-End", true, Date.now()),
        createData("Cupcake4", "nimaprmdi@gmail.com", "Front-End", true, Date.now(), user),
        createData("Cupcake5", "nimaprmdi@gmail.com", "Front-End", true, Date.now()),
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
                {tableTitle}
            </Typography>

            <TableMUI sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ letterSpacing: 0.6, color: "white" }} align="left">
                            Name
                        </TableCell>
                        <TableCell sx={{ letterSpacing: 0.6, color: "white" }} align="left">
                            Services
                        </TableCell>
                        <TableCell sx={{ letterSpacing: 0.61, color: "white" }} align="left">
                            Status
                        </TableCell>
                        <TableCell sx={{ letterSpacing: 0.61, color: "white" }} align="left">
                            Request Date
                        </TableCell>
                        <TableCell sx={{ letterSpacing: 0.61, color: "white" }} align="left">
                            -----
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableState[data].map((tableItem) => (
                        <TableRow key={tableItem.requestId} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                            <TableCell
                                sx={{ color: "white", display: "flex", alignItems: "center", gap: 2 }}
                                component="th"
                                scope="row"
                            >
                                <Avatar alt="image" sx={{ bgcolor: "master.light" }}>
                                    {/* {row.userImage ? <img src={row.userImage} /> : row.name.charAt(0)} */}

                                    <Typography variant="h4" textTransform="capitalize" color="white">
                                        {tableItem.requestName.charAt(0)}
                                    </Typography>
                                </Avatar>

                                <Box>
                                    <Typography
                                        variant="h6"
                                        textTransform="capitalize"
                                        className="u-text-small"
                                        color="white"
                                    >
                                        {tableItem.requestName}
                                    </Typography>

                                    <Typography variant="h6" className="u-text-small" color="gray.light">
                                        {tableItem.requestMobile}
                                    </Typography>
                                </Box>
                            </TableCell>
                            <TableCell sx={{ color: "white" }} align="left">
                                <Typography
                                    textTransform="capitalize"
                                    variant="h6"
                                    className="u-text-small"
                                    color="white"
                                >
                                    {tableItem.requestService}
                                </Typography>
                            </TableCell>
                            <TableCell sx={{ color: "white" }} align="left">
                                {tableItem.requestStatus === "solved" ? (
                                    <Chip label="Solved" color="success" />
                                ) : (
                                    <Chip label="Pending" color="primary" variant="outlined" />
                                )}
                            </TableCell>

                            <TableCell sx={{ color: "white" }} align="left">
                                {new Date(tableItem.requestDate).toISOString().split("T")[0]}
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
