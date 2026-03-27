import React, { useMemo, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Avatar,
  Chip,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  DataGrid,
  GridColDef,
  GridRenderCellParams,
  GridPaginationModel,
} from "@mui/x-data-grid";
import StaffingPopup from "./StaffingPopup";

type Row = {
  id: number;
  requisitionId: string;
  requestDate: string;
  count: number;
  roles: string;
  project: string;
  requestorName: string;
  requestorId: string | number;
  status: string;
};

const demoRows: Row[] = [
  {
    id: 1,
    requisitionId: "D100190",
    requestDate: "8 Jan 2026",
    count: 4,
    roles: "Developer",
    project: "Burberry",
    requestorName: "Shlok Sharma",
    requestorId: 349892,
    status: "1/3 Fulfilled",
  },
  {
    id: 2,
    requisitionId: "D100191",
    requestDate: "8 Jan 2026",
    count: 4,
    roles: "Developer",
    project: "Burberry",
    requestorName: "Shlok Sharma",
    requestorId: 349892,
    status: "0/3 Fulfilled",
  },
  {
    id: 3,
    requisitionId: "D100193",
    requestDate: "8 Jan 2026",
    count: 4,
    roles: "Developer",
    project: "Burberry",
    requestorName: "Shlok Sharma",
    requestorId: 349892,
    status: "Fulfilled",
  },
];

const statusStyle = (val: string) => {
  const lower = String(val).toLowerCase();
  if (lower.includes("0/3")) return { bg: "#FEE2E2", color: "#991B1B" };
  if (lower.includes("1/3")) return { bg: "#FEF3C7", color: "#784E11" };
  if (lower.includes("fulfilled") || lower.includes("fulfil"))
    return { bg: "#D1FAE5", color: "#065F46" };
  return { bg: "#F0F4FF", color: "#2B3C5D" };
};

const OpenDemands: React.FC<{ rows?: Row[] }> = ({ rows = demoRows }) => {
  const [currentTab, setCurrentTab] = useState<"open" | "closed">("open");
  const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
  const [searchValue, setSearchValue] = useState("");
  const [popupOpen, setPopupOpen] = useState(false);
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const filteredRows = useMemo(() => {
    const byTab = rows.filter((r) =>
      currentTab === "open"
        ? r.status !== "Fulfilled"
        : r.status === "Fulfilled",
    );
    if (!searchValue) return byTab;
    const q = searchValue.toLowerCase();
    return byTab.filter((r) =>
      `${r.requisitionId} ${r.requestorName} ${r.requestorId}`
        .toLowerCase()
        .includes(q),
    );
  }, [rows, searchValue, currentTab]);

  const columns: GridColDef[] = [
    {
      field: "select",
      headerName: "",
      width: 64,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          <input
            type="radio"
            name="selected"
            checked={selectedRowId === params.row.id}
            onChange={() => setSelectedRowId(params.row.id)}
            style={{ width: 16, height: 16 }}
          />
        </Box>
      ),
    },
    {
      field: "requisitionId",
      headerName: "Requisition ID",
      minWidth: 140,
      flex: 1,
      renderCell: (p) => (
        <Typography sx={{ color: "#0B6EA6", fontWeight: 600 }}>
          {p.value}
        </Typography>
      ),
    },
    {
      field: "requestDate",
      headerName: "Request Date",
      minWidth: 120,
      flex: 1,
      renderCell: (p) => <Typography>{p.value}</Typography>,
    },
    {
      field: "count",
      headerName: "Requirement Count",
      minWidth: 120,
      flex: 0.8,
      align: "center",
      headerAlign: "center",
      renderCell: (p) => <Typography>{p.value}</Typography>,
    },
    {
      field: "project",
      headerName: "Department/ Project Name",
      minWidth: 200,
      flex: 1.4,
      renderCell: (p) => <Typography>{p.value}</Typography>,
    },
    {
      field: "roles",
      headerName: "Primary Roles",
      minWidth: 140,
      flex: 1.2,
      renderCell: (p) => <Typography>{p.value}</Typography>,
    },
    {
      field: "requestor",
      headerName: "Requestor",
      minWidth: 180,
      flex: 1.2,
      renderCell: (p: GridRenderCellParams) => (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Avatar
            sx={{
              width: 28,
              height: 28,
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            {String(p.row.requestorName || "?").slice(0, 1)}
          </Avatar>
          <Box>
            <Typography
              sx={{ fontSize: 13, fontWeight: 600, color: "#172554" }}
            >
              {p.row.requestorName}
            </Typography>
            <Typography sx={{ fontSize: 11, color: "#94A3B8" }}>
              ID : {p.row.requestorId}
            </Typography>
          </Box>
        </Box>
      ),
    },
    {
      field: "status",
      headerName: "Fulfilment Status",
      minWidth: 160,
      flex: 1,
      align: "right",
      headerAlign: "right",
      renderCell: (p: GridRenderCellParams) => {
        const { bg, color } = statusStyle(p.value);
        return (
          <Chip
            label={p.value}
            sx={{
              backgroundColor: bg,
              color,
              borderRadius: 12,
              px: 2.2,
              py: 0.5,
              fontWeight: 700,
              fontSize: 12,
            }}
          />
        );
      },
    },
  ];

  return (
    <Box sx={{ width: "100%", mt: 2, position: "relative" }}>
      {/* Tabs */}
      <Box
        sx={{
          display: "flex",
          gap: 2,
          borderBottom: "1px solid #E2E8F0",
          bgcolor: "#FFF",
          px: 3,
          py: 1,
        }}
      >
        <Box
          onClick={() => setCurrentTab("open")}
          sx={{
            py: 1,
            cursor: "pointer",
            borderBottom: currentTab === "open" ? "2px solid #3B98C4" : "none",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: currentTab === "open" ? "#3B98C4" : "#64748B",
            }}
          >
            Open Demands
          </Typography>
        </Box>
        <Box
          onClick={() => setCurrentTab("closed")}
          sx={{
            py: 1,
            cursor: "pointer",
            borderBottom:
              currentTab === "closed" ? "2px solid #3B98C4" : "none",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              color: currentTab === "closed" ? "#3B98C4" : "#64748B",
            }}
          >
            Closed Demands
          </Typography>
        </Box>
      </Box>

      {/* Search */}
      <Box sx={{ p: 3, bgcolor: "#FFF" }}>
        <TextField
          placeholder="Search by Employee Name or ID"
          size="small"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          sx={{
            width: 360,
            bgcolor: "#FAFBFC",
            borderRadius: 1,
            boxShadow: "none",
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Table */}
      <Box sx={{ width: "100%", bgcolor: "#FFF", px: 2 }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          autoHeight
          disableSelectionOnClick
          onRowClick={(p) => setSelectedRowId(p.id as number)}
          pagination
          paginationMode="client"
          pageSizeOptions={[3, 5, 10, 25]}
          paginationModel={paginationModel}
          onPaginationModelChange={(m) => setPaginationModel(m)}
          rowHeight={72}
          columnHeaderHeight={60}
          sx={{
            border: "none",
            ".MuiDataGrid-columnHeaders": {
              bgcolor: "#FBFCFD",
              borderBottom: "1px solid #E2E8F0",
            },
            ".MuiDataGrid-columnHeaderTitle": {
              fontWeight: 600,
              color: "#212B36",
              fontSize: "14px",
            },
            ".MuiDataGrid-cell": {
              borderBottom: "none !important",
              display: "flex",
              alignItems: "center",
              paddingTop: 1,
              paddingBottom: 1,
            },
            ".MuiDataGrid-virtualScroller": { overflowX: "auto !important" },
            ".MuiDataGrid-footerContainer": { borderTop: "1px solid #EFF2F5" },
          }}
        />
      </Box>

      {/* Action Buttons (bottom-right) */}
      <Box
        sx={{
          position: "absolute",
          right: 24,
          bottom: 24,
          display: "flex",
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          disabled={!selectedRowId}
          onClick={() => setPopupOpen(true)}
          sx={{
            bgcolor: "#3B98C4",
            width: 163,
            height: 36,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Manage
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#C4673B",
            width: 184,
            height: 36,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 700,
          }}
        >
          Close Demand
        </Button>
      </Box>

      {/* Staffing Popup */}
      <StaffingPopup
        open={popupOpen}
        close={() => setPopupOpen(false)}
        requestId={selectedRowId}
      />
    </Box>
  );
};

export default OpenDemands;
