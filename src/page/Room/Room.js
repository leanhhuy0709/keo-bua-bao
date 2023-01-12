
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
import {Container, Button} from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {useState, useEffect} from 'react';
import Countdown from 'react-countdown';
import {initiateSocket, sendMsg, getMsg, invitePlayer} from "../../socket/Socket";

const rock = "https://raw.githubusercontent.com/reiinakano/tfjs-rock-paper-scissors/master/images/rock.png";
const paper = "https://raw.githubusercontent.com/reiinakano/tfjs-rock-paper-scissors/master/images/paper.png";
const scissors = "https://raw.githubusercontent.com/reiinakano/tfjs-rock-paper-scissors/master/images/scissors.png";


export default function Room({users}) {
    const [RPS, setRPS] = useState([0, 0, 0]);
    const [opp, setOpp] = useState("");
    useEffect(()=>{
		initiateSocket(`http://${localStorage.getItem("ip_server")}:5000`, localStorage.getItem("username"));
		setOpp(localStorage.getItem("username2")!=undefined?localStorage.getItem("username2"):"Không có");
		getMsg("accept", (res)=>{
			console.log(res);
			let {user1, user2, room} =  res;
			if (user1 == localStorage.getItem("username"))
			{
				localStorage.setItem("username2", user2);
				setOpp(user2);
			}
		});
		getMsg("result", (res)=> {
			var {user1, result1, user2, result2} = res;
			if (user1 == localStorage.getItem("username"))
				{alert("You " + result1);window.location.pathname="/room"}
			else if (user2 == localStorage.getItem("username"))
				{alert("You " + result2);window.location.pathname="/room"}
		})
    }, []);

	const inviteOtherPlayer = (Pname) => {
		if(Pname == localStorage.getItem("username"))
		{
			alert("You can't invite yourself!");
			return;
		}
		let user1 = localStorage.getItem("username");
		let user2 = Pname
		let room = localStorage.getItem("room");
		invitePlayer({user1, user2, room});
		alert(`Đã gửi lời mời đến ${Pname}`);
		console.log(`Đã gửi lời mời đến ${Pname}`);
	} 
	const playGame = () =>
	{
		if (RPS[0] + RPS[1] + RPS[2] == 0)
		{
			alert("Bạn chưa chọn kéo, búa hoặc bao!");
			return;
		}
		var play = 0;
		if (RPS[1] == 1) play = 1;
		else if (RPS[2] == 1) play = 2;
		var tmp = {username: localStorage.getItem("username"), room: localStorage.getItem("room"), play};
		sendMsg("play", tmp);
		switch(play)
		{
			case 0: console.log("Bạn đã chọn Kéo!");break;
			case 1: console.log("Bạn đã chọn Búa!");break;
			case 2: console.log("Bạn đã chọn Bao!");break;
		}
	}
    return (
        <>
            <Navibar/>
            <div className="d-flex justify-content-center mt-5">
                <Container className='bg-white d-inline-flex shadow-lg' style = {{width: "50%", height: "360px", borderRadius: "30px"}}>
                    <div style = {{width: "100%"}}>
                        <h2 className='my-4 mx-3'>Phòng {localStorage.getItem("room")}</h2>
                        <h3 className='my-4 mx-3'>Đối thủ: <span className="text-title">{opp}</span></h3>
                        <div style={{textAlign: "center", marginBottom: "30px"}}>
                            <button onClick={()=>{setRPS([1, 0, 0])}} className='circle-play-button mx-3' style = {{backgroundColor: RPS[0] ? `rgba(37, 117, 252, 1)`:"#ddd", display: "inline-block", backgroundImage: `url("${scissors}")` }}/>
                            <button onClick={()=>{setRPS([0, 1, 0])}} className='circle-play-button mx-3' style = {{backgroundColor: RPS[1] ? `rgba(37, 117, 252, 1)`:"#ddd", display: "inline-block", backgroundImage: `url("${rock}")` }}/>
                            <button onClick={()=>{setRPS([0, 0, 1])}} className='circle-play-button mx-3' style = {{backgroundColor: RPS[2] ? `rgba(37, 117, 252, 1)`:"#ddd", display: "inline-block", backgroundImage: `url("${paper}")` }}/>  
                        </div>
                        <div style={{textAlign: "center"}}>
                            <Button className="px-5 py-2 my-1 color-btn" onClick={playGame}>Play</Button>
                        </div>
                    </div>
                </Container>
                <Container className='bg-white d-inline-flex shadow-lg overflow-auto' style = {{width: "27%", height: "360px", borderRadius: "30px"}}>
                    <div>
                    {users.map((item, idx) => 
                    (
                      <Container onClick={()=>{inviteOtherPlayer(item.username)}} key = {idx} className="user-block" style = {{display: "inline-block"}}>
                        <div className='circle' style = {{display: "inline-block", backgroundImage: `url("https://vaithuhayho.com/wp-content/uploads/2022/07/anh-dai-dien-cute-dang-yeu-2.jpg")` }}/>
                        <div style = {{marginLeft: "20px",display: "inline-block", fontSize: "20px", padding: "15px", verticalAlign: "text-bottom"}}>
                          {item.username}
                        </div>
                      </Container>
                    ))}
                    
                    </div>
                </Container>
            </div>
        </>
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
