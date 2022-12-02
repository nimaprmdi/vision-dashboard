import { createTheme } from "@mui/material/styles";

export const dashboardTheme = createTheme({
    palette: {
        mainPrimary: {
            main: "#0075FF",
            light: "#1A1F37",
            medium: "#0C1E81",
            dark: "#060B28",
            heavy: "#060B26",
        },

        accent: {
            main: "#05CD99",
            light: "#2CD9FF",
        },

        gray: {
            light: "#A0AEC0",
            dark: "#1A1F37",
        },

        purple: "#2C0C72",

        white: "#fff",
        black: " #000",

        success: {
            main: "#01B574",
            light: "#158354",
        },

        error: {
            main: "#C22C2C",
        },

        warning: {
            main: "#AF8415",
        },
    },

    typography: {
        h1: {
            fontSize: "2.25rem",
        },
        h2: {
            fontSize: "1.75rem",
        },
        h3: {
            fontSize: "1.5rem",
        },
        h4: {
            fontSize: "1.25rem",
        },
        h5: {
            fontSize: "1.125rem",
        },
        h6: {
            fontSize: "1rem",
        },
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: "12px",
                },
                colorInherit: {
                    backgroundColor: "#0075FF",
                },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                input: { color: "#fff" },
                notchedOutline: {
                    border: "1px solid transparent",
                    borderImage: "linear-gradient(154deg, #ffffff0f 0%,  white 40%, #ffffff0f 100%) 1",
                    color: "#fff",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    color: "#fff !important",
                },
            },
        },
    },
});
