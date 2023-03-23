import { Fragment } from "react";
import ResponsiveAppBar from "./header";
import InformationLine from "./information-line";

function Layout(props: any) {
  return (
    <Fragment>
      <ResponsiveAppBar />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
