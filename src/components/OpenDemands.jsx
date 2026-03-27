import React, { useMemo, useState } from "react";
import { 
  Box, Typography, Button, TextField, InputAdornment,
  Dialog, DialogTitle, DialogContent, DialogActions, IconButton 
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Icon } from "@iconify/react";
import Bbox from "../../../components/UiComponents/Bbox";

const OpenDemands = () => {
  const [currentTab, setCurrentTab] = useState("open");
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });

  const rows = [
    { id: 1, requisitionId: "D100190", requestDate: "8 Jan 2026", count: 4, roles: "Developer", project: "Burberry", status: "1/3 Fulfilled" },
    { id: 2, requisitionId: "D100191", requestDate: "8 Jan 2026", count: 4, roles: "Developer", project: "Burberry", status: "0/3 Fulfilled" },
    { id: 3, requisitionId: "D100192", requestDate: "8 Jan 2026", count: 4, roles: "Developer", project: "Burberry", status: "Fulfilled" },
    { id: 4, requisitionId: "D100193", requestDate: "9 Jan 2026", count: 5, roles: "QA Engineer", project: "Nike", status: "Fulfilled" },
    { id: 5, requisitionId: "D100194", requestDate: "9 Jan 2026", count: 3, roles: "Product Manager", project: "Adidas", status: "1/3 Fulfilled" },
  ];

  const filteredRows = useMemo(() => {
    const byTab = rows.filter(r => (currentTab === "open" ? r.status !== "Fulfilled" : r.status === "Fulfilled"));
    if (!searchValue) return byTab;
    const q = searchValue.toLowerCase();
    return byTab.filter(r => `${r.requisitionId} ${r.project}`.toLowerCase().includes(q));
  }, [rows, searchValue, currentTab]);

  const columns = [
    { 
      field: "requisitionId", headerName: "Requisition ID", flex: 1,
      renderCell: (p) => <Typography sx={{ color: "#3B98C4", fontSize: "13px", fontWeight: "600" }}>{p.value}</Typography> 
    },
    { field: "requestDate", headerName: "Request Date", flex: 1, renderCell: (p) => <Typography sx={{ fontSize: "13px", color: "#475569" }}>{p.value}</Typography> },
    { field: "count", headerName: "Requirement Count", flex: 1, renderCell: (p) => <Typography sx={{ fontSize: "13px", color: "#475569" }}>{p.value}</Typography> },
    { field: "roles", headerName: "Primary Roles", flex: 1, renderCell: (p) => <Typography sx={{ fontSize: "13px", color: "#475569" }}>{p.value}</Typography> },
    { field: "project", headerName: "Department/Project Name", flex: 1.5, renderCell: (p) => <Typography sx={{ fontSize: "13px", color: "#475569" }}>{p.value}</Typography> },
    {
      field: "status",
      headerName: "Fulfilment Status",
      flex: 1.2,
      renderCell: (params) => {
        const val = params.value;
        const isRed = val.includes("0/3");
        const isYellow = val.includes("1/3");
        
        let bg = "#DCFCE7"; let text = "#15803D";
        if (isRed) { bg = "#FEE2E2"; text = "#991B1B"; }
        else if (isYellow) { bg = "#FEF9C3"; text = "#854D0E"; }

        return (
          <Box sx={{ 
            bgcolor: bg, color: text,
            px: "12px", py: "2px", 
            borderRadius: "100px",
            fontSize: "11px", fontWeight: "700",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            height: "22px", mt: "14px"
          }}>
            {val}
          </Box>
        );
      }
    },
  ];

  return (
    <Box sx={{ width: "100%", mt: 2 }}>
      <Bbox sx={{ borderRadius: "12px", border: "none", overflow: "hidden" }}>
        
        {/* Tabs Section */}
        <Box sx={{ display: "flex", borderBottom: "1px solid #E2E8F0", bgcolor: "#FFF", px: "24px" }}>
          <Box onClick={() => { setCurrentTab("open"); setSelectedRowId(null); }} sx={{ py: 2, borderBottom: currentTab === "open" ? "2px solid #3B98C4" : "none", cursor: "pointer" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: "700", color: currentTab === "open" ? "#3B98C4" : "#64748B" }}>Open Demands</Typography>
          </Box>
          <Box onClick={() => { setCurrentTab("closed"); setSelectedRowId(null); }} sx={{ py: 2, px: 4, borderBottom: currentTab === "closed" ? "2px solid #3B98C4" : "none", cursor: "pointer" }}>
            <Typography sx={{ fontSize: "14px", fontWeight: currentTab === "closed" ? "700" : "500", color: currentTab === "closed" ? "#3B98C4" : "#64748B" }}>Closed Demands</Typography>
          </Box>
        </Box>

        {/* Search Bar */}
        <Box sx={{ p: "20px 24px", bgcolor: "#FFF", borderBottom: "1px solid #E2E8F0" }}>
          <TextField
            placeholder="Search by Employee Name or ID"
            size="small"
            variant="outlined"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            sx={{
              width: 320,
              height: 38,
              borderRadius: "8px",
              fontSize: "13px",
              bgcolor: "#FAFBFC",
              '& .MuiOutlinedInput-root': {
                height: 38,
                borderRadius: '8px',
                border: '1px solid #D1D5DB',
                '& fieldset': { border: 'none' },
              },
              '& .MuiInputBase-input': { padding: '8px 12px', fontSize: 13 },
            }}
            InputProps={{
              endAdornment: <InputAdornment position="end"><ArrowDropDownIcon sx={{ fontSize: 20, color: '#64748B' }} /></InputAdornment>
            }}
          />
        </Box>

        {/* Table */}
        <Box sx={{ width: "100%", bgcolor: "#FFF", px: "12px" }}>
          <DataGrid
            rows={filteredRows}
            columns={columns}
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            pageSizeOptions={[3, 5, 10, 25]}
            disableRowSelectionOnClick
            onRowClick={(p) => setSelectedRowId(p.id)}
            sx={{
              border: "none",
              "& .MuiDataGrid-columnHeaders": { 
                bgcolor: "#FBFCFD", 
                borderBottom: "1px solid #E2E8F0",
              },
              "& .MuiDataGrid-columnHeaderTitle": { fontWeight: "700", color: "#475569", fontSize: "12px" },
              "& .MuiDataGrid-cell": { 
                borderBottom: "none !important",
                display: "flex", alignItems: "center" 
              },
              "& .MuiDataGrid-row:hover": { bgcolor: "#F8FAFC" },
              "& .MuiDataGrid-row.Mui-selected": { bgcolor: "#F0F9FF !important" },
              "& .MuiDataGrid-columnSeparator": { display: "none" },
              "& .MuiDataGrid-footerContainer": { borderTop: "1px solid #E2E8F0", fontSize: 12 },
            }}
          />
        </Box>

        {/* Buttons Section - Only show in Open Demands */}
        {currentTab === "open" && (
          <Box sx={{ p: "32px 24px", display: "flex", justifyContent: "flex-end", gap: "24px", bgcolor: "#FFF", borderTop: "1px solid #E2E8F0" }}>
            <Button 
              variant="contained" 
              disabled={!selectedRowId}
              onClick={() => setOpen(true)}
              sx={{ 
                bgcolor: !selectedRowId ? "#E0E0E0" : "#3B98C4", 
                color: !selectedRowId ? "#999" : "#FFF",
                width: "163px", height: "36px", 
                borderRadius: "8px", textTransform: "none", fontWeight: "700", boxShadow: "none",
                cursor: !selectedRowId ? "not-allowed" : "pointer"
              }}
            >
              Manage
            </Button>
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: "#C4673B", color: "#FFF",
                width: "184px", height: "36px", 
                borderRadius: "8px", textTransform: "none", fontWeight: "700", boxShadow: "none"
              }}
            >
              Close Demand
            </Button>
          </Box>
        )}
      </Bbox>

      {/* Dialog/Popup */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle sx={{ fontWeight: 700, display: "flex", justifyContent: "space-between", alignItems: 'center' }}>
          Manage Demand
          <IconButton onClick={() => setOpen(false)} size="small"><Icon icon="ic:round-close" /></IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <Typography sx={{ fontSize: "14px", color: "#475569" }}>Update status details here.</Typography>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpen(false)} variant="contained" fullWidth sx={{ bgcolor: "#3B98C4", textTransform: 'none', fontWeight: 700, color: "#FFF" }}>Save Changes</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default OpenDemands;
