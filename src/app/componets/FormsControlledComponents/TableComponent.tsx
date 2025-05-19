"use client";
import {
  Container,
  Grid,
  Typography,
  CssBaseline,
  Paper,
  Pagination,
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button,
} from "@mui/material";
import React, { useState, ChangeEvent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import UpdateIcon from "@mui/icons-material/Update";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import * as XLSX from "xlsx";
import FeedIcon from "@mui/icons-material/Feed";

// Styled components for table cells and rows
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1E90FF",
    color: theme.palette.common.white,
    fontWeight: "bold",
    fontSize: "0.75rem",
    position: "sticky",
    padding: "4px 8px",
    top: 0,
    zIndex: 1,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "0.75rem",
    paddingTop: 0,
    paddingBottom: 0,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface TableParameters {
  tableName: string | null;
  tableSchema: { name: string; value: string }[];
  tableRows: any[];
  handleRowAction?: (action: string, data: any, index: number) => void | null;
  onPaginationChange?: (page: number) => void;
  currentPage: number;
  pageSize: number;
  totalItems: number;
  pageCount: number;
  onPageSizeChange?: (page: number) => void;
  tableActions?:
    | {
        buttonElement: React.ReactNode;
        handlebButtonClick: (index: number, data: any) => void;
      }[]
    | [];
}
export default function TableComponent({
  tableName,
  tableSchema,
  tableRows,
  handleRowAction,
  onPaginationChange,
  currentPage,
  pageSize,
  totalItems,
  pageCount,
  onPageSizeChange,
  tableActions,
  ...props
}: TableParameters) {
  const handleChangePage = (event: ChangeEvent<unknown>, newPage: any) => {
    if (onPaginationChange) {
      onPaginationChange(newPage);
    }
  };
  const filteredRows = tableRows.filter((row) => row);

  const handlepageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPage = event.target.value as number;
    if (onPageSizeChange) {
      onPageSizeChange(newPage);
    }
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(tableRows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, tableName || "Table");
    XLSX.writeFile(workbook, `${tableName || "Table"}.xlsx`);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">{tableName}</Typography>
      </Grid>
      <Grid item xs={12}>
        {/* Page Size and Export Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 1,
          }}
        >
          <div>
            <FormControl sx={{ s: 0, minWidth: 25 }}>
              <Select
                value={pageSize}
                onChange={handlepageSizeChange}
                size="small"
                displayEmpty
                inputProps={{ "aria-label": "Without label" }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={50}>50</MenuItem>
                <MenuItem value={100}>100</MenuItem>
                <MenuItem value={500}>500</MenuItem>
              </Select>
            </FormControl>
          </div>
          <Typography>
            {`${(currentPage - 1) * pageSize + 1}-${Math.min(pageSize * currentPage, totalItems)} of ${totalItems}`}
          </Typography>
          {/* Export Button */}
          <Button
            onClick={handleExport}
            sx={{ display: "flex", alignItems: "center", marginLeft: 2 }}
          >
            <FeedIcon sx={{ marginLeft: 1 }} titleAccess="Export to excel" />
          </Button>
        </Box>

        {/* Table Component */}
        <TableContainer component={Paper}>
          <Table size="small" aria-label="customized table">
            <TableHead>
              <TableRow>
                {tableSchema?.map((column: any, index: number) => (
                  <StyledTableCell key={index} sx={{ fontSize: "0.75rem" }}>
                    {column.name}
                  </StyledTableCell>
                ))}
                {tableActions && tableActions?.length > 0 && (
                  <StyledTableCell>Action</StyledTableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, rowIndex) => (
                  <StyledTableRow key={rowIndex}>
                    {tableSchema?.map((column: any, colIndex: number) => (
                      <StyledTableCell key={colIndex}>
                        {column.value === "sn" ? (
                          rowIndex + 1 + (currentPage - 1) * pageSize
                        ) : column.type === "doc" ? (
                          <img
                            src={row[column.value]}
                            alt="Document"
                            style={{
                              width: "4rem",
                              height: "4rem",
                              objectFit: "contain",
                            }}
                          />
                        ) : (
                          row[column.value]
                        )}
                      </StyledTableCell>
                    ))}
                    {tableActions && tableActions?.length > 0 && (
                      <StyledTableCell style={{ display: "flex" }}>
                        {tableActions.map((button, buttonIndex) => (
                          <Button
                            key={buttonIndex}
                            type="button"
                            onClick={() =>
                              button.handlebButtonClick(rowIndex, row)
                            }
                          >
                            {button.buttonElement}
                          </Button>
                        ))}
                      </StyledTableCell>
                    )}
                  </StyledTableRow>
                ))
              ) : (
                <StyledTableRow>
                  <StyledTableCell
                    colSpan={10}
                    sx={{
                      color: "red",
                      textAlign: "center",
                      verticalAlign: "middle",
                      display: "table-cell",
                      width: "100%",
                    }}
                  >
                    No data found
                  </StyledTableCell>
                </StyledTableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        {pageCount > 0 && (
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={handleChangePage}
            style={{ marginTop: 10 }}
          />
        )}
      </Grid>
    </Grid>
  );
}