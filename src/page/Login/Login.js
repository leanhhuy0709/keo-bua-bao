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
import { Post } from "../../axios/Axios";

export default function Login() {
  const handleLogin = () => {
    var username = document.getElementById("login_usr").value;
    var password = document.getElementById("login_psw").value;
    //Check

    if(username.length == 0)
    {
      alert("Bạn chưa nhập username!");
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
    Post(`https://${localStorage.getItem("ip_server")}:8080/login`, {username, password})
    .then((res)=>{
      var value = res.data.msg;
      if (value == "True")
      {
        localStorage.setItem('username', username);
        window.location.pathname = "/";
      }
      else 
      {
        alert("Mật khẩu sai hoặc tài khoản không tồn tại!");
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

              <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
              <p className="text-white-50 mb-5">Welcome to rock-paper-scissors game!</p>

              <MDBInput wrapperClass="mb-4 mx-5 w-100" labelClass="text-white" placeholder="Username" id="login_usr" type="text" size="lg"/>
              <MDBInput wrapperClass="mb-4 mx-5 w-100" labelClass="text-white" placeholder="Password" id="login_psw" type="password" size="lg"/>
              
              <Button className="px-5 py-2 my-1 color-btn" onClick={handleLogin}>Login</Button>

              <div className="my-1">
                <p className="mb-0">Don"t have an account? <a href="/register" className="text-white-50 fw-bold">Sign Up</a></p>
              </div>
              <Button className="px-5 py-2 my-1 color-btn" onClick={()=>{localStorage.clear();window.location.pathname="/"}}>Change IP Server</Button>
            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>
  );
}


