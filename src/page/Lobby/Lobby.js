
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React, {useState, useEffect} from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol} from 'mdb-react-ui-kit';
import {Container, Button, Modal} from 'react-bootstrap';
import {MDBInput} from "mdb-react-ui-kit";
import Select from 'react-select';
import { MDBIcon} from 'mdbreact';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import {initiateSocket, sendMessage, getMsg, sendMsg} from "../../socket/Socket";
import {Post, Get} from "../../axios/Axios";



export default function Lobby({users}) {
	const [time, setTime] = useState(0);
	const [modalShow, setModalShow] = useState(false);
	const [resp, setResp] = useState(null);
  	useEffect(()=>{
		initiateSocket(`http://${localStorage.getItem("ip_server")}:5000`, localStorage.getItem("username"));
		getMsg("invite", (res)=>{
      console.log("lobby");
			console.log(res);
			let {user1, user2, room} =  res;
			if (user2 == localStorage.getItem("username"))
			{
				setModalShow(true);
				setResp(res);
			}
		});
  	}, [])
	function handleCreateRoom()
	{
		if (time == 0) 
		{
			alert("Bạn chưa chọn thời gian!");
			return;
		}
		var name = document.getElementById("lobby_room_name").value;
		var user1 = localStorage.getItem("username")
		Post(`http://${localStorage.getItem("ip_server")}:5000/createroom`, {name, time, user1})
		.then((res)=>
		{
			if (res.data.msg == "True")
			{
				alert("Tạo Room thành công!");
				localStorage.setItem("room", name);
				window.location.pathname = "/room";
			}
			else 
			{
				alert("Tên Room đã tồn tại!");
			}
		})
		.catch((err)=>console.log(err.response));
	}
	function joinRoom()
	{
		console.log("Joined!");
		sendMsg("accept", resp);
		localStorage.setItem("username2", resp.user1);
		localStorage.setItem("room", resp.room);
		window.location.pathname = "/room";
	}
    return (
        <>
            <Navibar/>
			<SimpleModal res={resp} show={modalShow} onHide={() => setModalShow(false)} join={joinRoom}/>
            <div className="d-flex justify-content-center mt-5">
                <Container className='bg-white d-inline-flex shadow-lg' style = {{width: "30%", height: "360px", borderRadius: "30px"}}>
                    <div style = {{width: "100%"}}>
                        <h2 className='my-4 mx-3'>CREATE ROOM</h2>
                        <label className='mx-3 mb-1' style={{fontSize: "20px"}}>Tên phòng</label>
                        <MDBInput style = {{width: "100%"}} wrapperClass="mb-4 mx-3" labelClass="text-white" placeholder="Tên phòng" id="lobby_room_name" type="text" size="lg"/>
                        <label className='mx-3 mb-1' style={{fontSize: "20px"}}>Thời gian chờ</label>
                        <Select onChange = {(choice)=>setTime(choice.value)} style = {{width: "100%"}} className="mb-4 ms-3" placeholder="Thời gian chờ" options={[
                        { value: 1000, label: 'Không giới hạn' }
                        ]} 
                        />
                        <div style={{textAlign: "center"}}>
                        <Button className="px-5 py-2 my-1 color-btn" onClick={handleCreateRoom}>Create</Button>
                        </div>
                    </div>
                </Container>
                <Container className='' style = {{width: "30%", height: "360px", borderRadius: "30px", textAlign: "center"}}>
                    <img alt="Ảnh Kéo búa bao" style = {{dislay: "inline-block", borderRadius: "30px"}} height={"360px"} src="https://media.istockphoto.com/vectors/rock-paper-scissors-vector-illustration-vector-id1056840214?k=20&m=1056840214&s=170667a&w=0&h=XHMBHLV9gIpRoEvQfa4eMN-h2hfAqXx0gZ88YuU9Tmk="/>
                </Container>
                <Container className='bg-white d-inline-flex shadow-lg overflow-auto' style = {{width: "27%", height: "360px", borderRadius: "30px"}}>
                    <div>
					{users.map((item, idx) => 
					(
						<Container key = {idx} className="user-block" style = {{display: "inline-block"}}>
							<div className='circle' style = {{display: "inline-block", backgroundImage: `url("https://vaithuhayho.com/wp-content/uploads/2022/07/anh-dai-dien-cute-dang-yeu-2.jpg")` }}/>
							<div style = {{marginLeft: "20px",display: "inline-block", fontSize: "20px", padding: "15px", verticalAlign: "text-bottom"}}>
								{item.username}
							</div>
						</Container>
					))}
                    
                    
                    </div>
                </Container>
            </div>
            <div className="mt-5 w-100" style={{position: "fixed", bottom: "0"}}>
                
                <Footer/>
            </div>
        </>
    );
}

function Footer() {
  return (
    <MDBFooter className='text-center text-lg-start' style={{color: "yellow"}}>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom' style={{borderColor: "yellow"}}>
        <div className='me-4 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='https://www.facebook.com/huy.leanh0709' className='me-4 text-reset'>
            <MDBIcon className='my-icon' color='secondary' fab icon='facebook-f' size = "2x"/>
          </a>
          <a href='https://github.com/leanhhuy0709' className='me-4 text-reset'>
            <MDBIcon className='my-icon' color='secondary' fab icon='github' size = "2x"/>
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon color='secondary' icon='gem' className='me-3' />
                University
              </h6>
              <p>
                Trường Đại học Bách Khoa thành phố Hồ Chí Minh
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Technology</h6>
              <p>
                <a href='#!' className='text-reset'>
                  React
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Nodejs
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Socket
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Bootstrap
                </a>
              </p>
            </MDBCol>

           

            <MDBCol md='4' lg='3' xl='5' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon color='secondary' icon='user' className='me-2' />
                Lê Anh Huy
              </p>
              <p>
                <MDBIcon color='secondary' icon='home' className='me-2' />
                Kí túc xá khu A
              </p>
              <p>
                <MDBIcon color='secondary' icon='envelope' className='me-3' />
                huy.leanh0709@hcmut.edu.vn
              </p>
              <p>
                <MDBIcon color='secondary' icon='phone' className='me-3' /> + 01 234 567 88
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </MDBFooter>
  );
}



function Navibar() {
    /*false, 'sm', 'md', 'lg', 'xl', 'xxl' */
  return (
    <>
      {['xl'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="/lobby" className="text-title"><b>Rock-Scissors-Paper</b></Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Tool
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link className='text-dark'>Hello {localStorage.getItem("username")}</Nav.Link>
                  <Nav.Link href="/" onClick={()=>{localStorage.clear()}}>Logout</Nav.Link>
                </Nav>
                
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

function SimpleModal(props) {
	return (
		<Modal
		  {...props}
		  size="lg"
		  aria-labelledby="contained-modal-title-vcenter"
		  centered
		>
		  <Modal.Header closeButton>
			<Modal.Title id="contained-modal-title-vcenter">
			  LỜI MỜI THI ĐẤU
			</Modal.Title>
		  </Modal.Header>
		  <Modal.Body>
			<p>
			  Bạn vừa nhận được lời mời vào phòng {props.res ? props.res.room: undefined} từ {props.res ? props.res.user1 : undefined}
			</p>
		  </Modal.Body>
		  <Modal.Footer>
			<Button onClick={props.join}>Accept</Button>
			<Button onClick={props.onHide}>Deny</Button>
		  </Modal.Footer>
		</Modal>
	  );
}
  
