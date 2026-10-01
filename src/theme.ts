import { createTheme } from '@mui/material'

// Visual language matched to the existing Data Switch Platform:
// navy primary buttons, soft gray page, white rounded panels, small gray secondary text.
export const theme = createTheme({
  palette: {
    primary: { main: '#0f172a' },
    background: { default: '#e9ecf1', paper: '#ffffff' },
    text: { primary: '#0f172a', secondary: '#64748b' },
    divider: '#e2e8f0',
  },
  shape: { borderRadius: 8 },
  typography: {
    fontFamily: 'Inter, "Segoe UI", Roboto, Arial, sans-serif',
    h5: { fontWeight: 700, fontSize: '1.25rem' },
    h6: { fontWeight: 700, fontSize: '1rem' },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: { defaultProps: { disableElevation: true } },
    MuiCard: {
      styleOverrides: {
        root: { border: '1px solid #e2e8f0', boxShadow: 'none', borderRadius: 12 },
      },
    },
  },
})
