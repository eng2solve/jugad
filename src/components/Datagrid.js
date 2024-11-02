import React, { useEffect, useState } from "react";
import { data } from "./Data";
import { Box, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Datagrid = () => {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [filters, setFilters] = useState({});
  const [filteredRows, setFilteredRows] = useState([]);
  useEffect(() => {
    try {
      setRows(data.column_value); // setting the initial rows

      const initialColumns = data.columns.map((field) => ({
        field: field.columnName, //field should be their while defining the column defination
        headerName: field.columnName.toUpperCase(),
        type: "",
        editable: field.editable ? field.editable : "false",
        minWidth: field.width,
        flex: 1,
        headerAlign: "left",

        renderHeader: () => (
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box sx={{ display:"flex",justifyContent:"center",alignItems:"Center"}}><strong>{field.columnName.toUpperCase()}</strong></Box>
            
            <TextField
              variant="outlined"
              size="small"
              label="Search"
              onChange={(e) =>
                handleMultiFilter(field.columnName, e.target.value)
              }
            />
          </Box>
        ),
      }));
      setColumns(initialColumns); // setting columns
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleMultiFilter = (column, value) => {
    setFilters((prevFilter) => ({
      ...prevFilter,
      [column]: value.toLowerCase(),
    }));
  };
  useEffect(() => {
    const filterRows = rows.filter((row) =>
      Object.entries(filters).every(([key, value]) => {
        if (value || row[key]) {
          return row[key]?.toString().toLowerCase().includes(value);
        }
        return true;
      })
    );
    setFilteredRows(filterRows);
  }, [filters, rows]);
  return (
    <DataGrid
      rows={filteredRows}
      columns={columns}
      disableRowSelectionOnClick
      pageSizeOptions={[10, 25, 100]}
      columnHeaderHeight={90}
      disableColumnSorting
      disableColumnMenu
      initialState={{
        pagination: {
          paginationModel: { pageSize: 10, page: 0 },
        },
      }}
      sx={{ height: 450 }}
    />
  );
};

export default Datagrid;
