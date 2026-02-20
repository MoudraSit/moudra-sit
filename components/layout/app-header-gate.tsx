"use client";

import * as React from "react";
import AppHeader from "components/layout/app-header";

function AppHeaderGate() {
  const [isEmbedded, setIsEmbedded] = React.useState(false);

  React.useEffect(() => {
    setIsEmbedded(window.self !== window.top);
  }, []);

  if (isEmbedded) {
    return null;
  }

  return <AppHeader />;
}

export default AppHeaderGate;
