import { Button } from "@mui/material";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import styles from "./bootstrap-header.module.css";

function BootstrapHeader() {
  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="#">Moudrá síť</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="navbar-collapse justify-content-center"
            style={{
              maxHeight: "100px",
              fontSize: "h6",
            }}
            navbarScroll
          >
            <Nav.Link href="#action1">DOMŮ</Nav.Link>
            <Nav.Link href="#action2">JSEM SENIOR</Nav.Link>
            <Nav.Link href="#action1">DIGITÁLNÍ ASISTENTI</Nav.Link>
            <Nav.Link href="#action2">O MOUDRÉ SÍTI</Nav.Link>
            <Nav.Link href="#action1">PARTNEŘI</Nav.Link>
            <Nav.Link href="#action2">KONTAKT</Nav.Link>
            <Nav.Link href="#action2">GDPR</Nav.Link>
          </Nav>
          <Nav className="panel">
            <Button className={styles.item} variant="contained">
              REGISTROVAT SE
            </Button>
            <Button className={styles.item} variant="contained">
              PŘIHLÁSIT SE
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BootstrapHeader;
