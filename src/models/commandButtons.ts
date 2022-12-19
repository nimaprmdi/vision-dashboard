import { Dispatch } from "@reduxjs/toolkit";
import { RootState } from "../store/rootReducer";

interface ICommandButtons {
    title: string;
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
    handler: (dispatch: Dispatch, getState: () => RootState) => void;
}

export type { ICommandButtons };
