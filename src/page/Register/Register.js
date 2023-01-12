import React from "react";
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
import { Post } from "../../axios/Axios";


export default function Register() {
    const handleRegister = () => {
      var username = document.getElementById("rg_usr").value;
      var password = document.getElementById("rg_psw").value;
      var cf_password = document.getElementById("rg_cf_psw").value;
      //Check
      if (password != cf_password)
      {
        alert("Password và Confirm Password không giống nhau!");
        return;
      }
      if(username.length == 0)
      {
        alert("Username không được trống!");
        return;
      }
      if (username.length > 10) {
        alert("Username không được nhiều hơn 10 kí tự!");
        return;
      }
      if (password.length < 6) {
        alert("Password không được ít hơn 6 kí tự!");
        return;
      }
      //
      Post(`http://${localStorage.getItem("ip_server")}:5000/register`, {username, password})
      .then((res)=>{
        var value = res.data.msg;
        if (value == "True")
        {
          alert("Tạo tài khoản thành công!")
          window.location.pathname = "/login";
        }
        else 
        {
          alert("Tài khoản bạn chọn đã tồn tại!");
        }
      })
      .catch((err)=>{
        console.log(err.response);
      })
    }
    return (
        <MDBContainer fluid style={{marginTop: "130px"}}>
    
          <MDBRow className="d-flex justify-content-center align-items-center h-100">
            <MDBCol col="12">
    
              <MDBCard className="bg-dark text-white my-5 mx-auto" style={{borderRadius: "1rem", maxWidth: "500px"}}>
                <MDBCardBody className="p-5 d-flex flex-column align-items-center mx-auto w-100">
    
                  <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                  <p className="text-white-50 mb-5">Welcome to rock-paper-scissors game!</p>
    
                  <MDBInput wrapperClass="mb-4 mx-5 w-100" labelClass="text-white" placeholder="Username" id="rg_usr" type="text" size="lg"/>
                  <MDBInput wrapperClass="mb-4 mx-5 w-100" labelClass="text-white" placeholder="Password" id="rg_psw" type="password" size="lg"/>
                  <MDBInput wrapperClass="mb-4 mx-5 w-100" labelClass="text-white" placeholder="Confirm Password" id="rg_cf_psw" type="password" size="lg"/>
                  
                  <Button className="px-5 py-2 my-1 color-btn" onClick={handleRegister}>Register</Button>

                </MDBCardBody>
              </MDBCard>
    
            </MDBCol>
          </MDBRow>
    
        </MDBContainer>
      );
}

