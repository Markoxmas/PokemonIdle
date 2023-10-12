import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { setTab } from "./navigationSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

export default function CenteredTabs() {
  const dispatch = useAppDispatch();
  const tab = useAppSelector((state) => state.navigation.tab);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(setTab(newValue));
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={tab} onChange={handleChange} centered>
        <Tab label="Battle" />
        <Tab label="Pokemon" />
        <Tab label="Summon" />
      </Tabs>
    </Box>
  );
}
