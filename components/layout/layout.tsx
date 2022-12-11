import { Fragment } from "react";
import BootstrapHeader from "./bootstrap-header";
import ContactLine from "./contact-line";
import ToggleColorMode from "../../store/dark-theme";
import ResponsiveAppBar from "./mui-header";

function Layout(props: any) {
  return (
    <Fragment>
      <ContactLine />
      <ResponsiveAppBar />
      <main>{props.children}</main>
    </Fragment>
  );
}

export default Layout;
