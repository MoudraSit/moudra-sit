import { Fragment } from "react";
import ResponsiveAppBar from "./header";

function Layout(props: any) {
  return (
    <Fragment>
      <ResponsiveAppBar />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
