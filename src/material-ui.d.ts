import { PaletteOptions } from "@mui/material";

declare module "@mui/material/styles/createPalette" {
    export interface PaletteOptions {
        mainPrimary: {
            main: string;
            light: string;
            medium: string;
            dark: string;
            heavy: string;
        };

        accent: {
            main: string;
            light: string;
        };

        gray: {
            light: string;
            dark: string;
        };

        purple: string;

        white: string;
        black: string;

        success: {
            main: string;
            light: string;
        };

        error: {
            main: string;
        };

        warning: {
            main: string;
        };
    }
}
