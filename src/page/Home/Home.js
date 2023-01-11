import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody
}
from "mdb-react-ui-kit";
import {Button} from "react-bootstrap";


export default function Home() {

  return (
    <MDBContainer fluid style={{marginTop: "130px"}}>

      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">

          <MDBCard className="bg-dark text-white my-5 mx-auto" style={{borderRadius: "1rem", maxWidth: "500px"}}>
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">


              <h2 className="fw-bold mb-2">Hello {localStorage.getItem("username")}</h2>
              <p className="text-white-50 mb-5">Welcome to rock-paper-scissors game!</p>

              <Button className="px-5 py-2 my-1 color-btn" href="/lobby">Play</Button>


            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}


