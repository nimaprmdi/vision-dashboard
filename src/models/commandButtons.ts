import { Dispatch } from "@reduxjs/toolkit";

interface ICommandButtons {
    title: string;
    color: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined;
    handler: (dispatch: Dispatch) => void;
}

export type { ICommandButtons };
