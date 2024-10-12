"use client";

import { Tab, Tabs } from "@mui/material";
import { QUERY_CHANGES_TAB, QUERY_DETAIL_TAB } from "helper/consts";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function QueryDetailLayoutTabs() {
  const pathname = usePathname();

  const pathnameWithoutTab = pathname?.split("/").slice(0, -1).join("/");

  const [selectedTab, setSelectedTab] = useState(pathname?.split("/").at(-1));

  return (
    <Tabs
      value={selectedTab}
      centered
      role="navigation"
      variant="fullWidth"
      textColor="secondary"
      indicatorColor="secondary"
      onChange={(e, newValue) => setSelectedTab(newValue)}
    >
      <Tab
        label="Detail dotazu"
        value={QUERY_DETAIL_TAB}
        href={`${pathnameWithoutTab}/${QUERY_DETAIL_TAB}`}
        component={Link}
      />
      <Tab
        label="Historie změn"
        value={QUERY_CHANGES_TAB}
        href={`${pathnameWithoutTab}/${QUERY_CHANGES_TAB}`}
        component={Link}
      />
    </Tabs>
  );
}

export default QueryDetailLayoutTabs;
