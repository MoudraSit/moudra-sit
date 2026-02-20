"use client";

import * as React from "react";
import AppHeader from "components/layout/app-header";

function AppHeaderGate() {
  const [isEmbedded, setIsEmbedded] = React.useState(true);

  React.useEffect(() => {
    let embedded = false;
    try {
      embedded = window.self !== window.top;
    } catch {
      embedded = true;
    }
    setIsEmbedded(embedded);
  }, []);

  if (isEmbedded) {
    return null;
  }

  return <AppHeader />;
}

export default AppHeaderGate;
