import React from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";

const StaffingPopup = ({ open, close, requestId }) => {
  return (
    <Dialog open={open} onClose={close} maxWidth="sm" fullWidth>
      <DialogTitle>Manage Staffing</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 2 }}>Request ID: {requestId ?? "-"}</Typography>
        <Typography color="text.secondary">This is a placeholder popup. Replace with your actual staffing UI.</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button variant="contained" onClick={close}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default StaffingPopup;
