import React, {useEffect} from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
}
from "mdb-react-ui-kit";
import {Button} from "react-bootstrap";

export default function ReadIPServer() {
  const handleSend = () => {
    localStorage.setItem("ip_server", document.getElementById("ip").value);
    window.location.pathname="/";
  }

  return (
    <MDBContainer fluid style={{marginTop: "130px"}}>

      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol col="12">

          <MDBCard className="bg-dark text-white my-5 mx-auto" style={{borderRadius: "1rem", maxWidth: "500px"}}>
            <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">

              <h2 className="fw-bold mb-2 text-uppercase">Input IP server</h2>
              <p className="text-white-50 mb-5">Welcome to rock-paper-scissors game!</p>
              <MDBInput wrapperClass="mb-4 mx-5 w-100" labelClass="text-white" placeholder="Example: 192.168.3.123" id="ip" type="text" size="lg"/>
              <p className="text-danger">CẢNH BÁO: Nếu bạn nhập sai IP Address, bạn sẽ không đăng nhập được!</p>
              <Button className="px-5 py-2 my-1 color-btn" onClick={handleSend}>Send</Button>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}


