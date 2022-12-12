import { useState } from "react";
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
    Theme,
} from "@mui/material";

import { useSelector } from "react-redux";
import { RootState } from "../../store/rootReducer";
import { SystemStyleObject } from "@mui/system";

interface TableProps {
    tableTitle?: string;
    data: "requests" | "tickets" | "accounts";
    sx?: SystemStyleObject<Theme>;
    children?: JSX.Element | JSX.Element[];
}

const Table = ({ tableTitle, data, sx, children }: TableProps) => {
    const tableState = useSelector((state: RootState) => state[data]);

    return (
        <TableContainer
            className="c-table"
            component={Paper}
            sx={{
                borderRadius: "20px",
                background: "linear-gradient(126.97deg, rgba(6, 11, 40, 0.74) 28.26%, rgba(10, 14, 35, 0.71) 91.2%)",
                backdropFilter: "blur(60px)",
                p: 2,
                mt: 3,
                ...sx,
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
                <TableBody>{children}</TableBody>
            </TableMUI>
        </TableContainer>
    );
};

export default Table;
