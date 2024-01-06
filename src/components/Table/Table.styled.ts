import { styled } from "@mui/material";

export const TableContainer = styled("table")({
  fontSize: 14,
  width: "100%",
  isolation: "isolate",
  margin: "auto",
  borderCollapse: "collapse",
});

export const TableBody = styled("tbody")({});

export const TableHead = styled("thead")({
  position: "sticky",
  zIndex: 120,
});

export const TableTh = styled("th")(({ theme }) => ({
  padding: `${theme.spacing(2)} 0`,
  fontWeight: 700,
  borderTop: `1px solid ${theme.palette.divider}`,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const TableTd = styled("td")(({ theme }) => ({
  padding: `${theme.spacing(1.25)} 0`,
  borderBottom: `1px solid ${theme.palette.divider}`,
  fontWeight: 500,
}));
