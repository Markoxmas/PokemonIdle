import React from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { RequestStatus } from "./devSlice";

interface DevToastAlertProps {
  status: RequestStatus;
  success: string | null;
}

const DevToastAlert: React.FC<DevToastAlertProps> = ({ status, success }) => {
  return (
    <Stack
      sx={{
        position: "fixed",
        bottom: "0",
        left: "50%",
        transform: "translateX(-50%)",
        width: "50%",
      }}
      spacing={2}
    >
      {status === RequestStatus.Success && (
        <Alert variant="filled" severity="success">
          {success}
        </Alert>
      )}
      {status === RequestStatus.Failure && (
        <Alert variant="filled" severity="error">
          Check the error message in the console
        </Alert>
      )}
    </Stack>
  );
};

export default DevToastAlert;
