import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function ColorProvider({ color, children } : { color: string, children: React.ReactNode }) {
    const theme = createTheme({
        palette: {
            primary: {
                main: color
            }
        },
    });

    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    );
}