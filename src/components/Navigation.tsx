// import React from 'react';
// import styled from 'styled-components';
// import Vector1 from './assets/Vector1.png';
// import LogOut from './assets/LogOut.png';
// import User from './assets/User.png';
// import Settings from './assets/Settings.png';
// import UserIcon from './UserIcon'; // Assuming UserIcon component is imported from './UserIcon'
// import { Link } from 'react-router-dom';

// const Nav = styled.nav`
//   background-color: #3569CE;
//   color: white;
//   padding: 1rem;
//   height: 100vh; /* Full height for vertical navbar */
//   width: 50px; /* Fixed width for vertical navbar */
//   position: fixed; /* Fixed position to stay in place */
//   top: 0;
//   left: 0;
//   display: flex;
//   flex-direction: column; /* Stack items vertically */
// `;

// const NavContainer = styled.div`
//   display: flex;
//   flex-direction: column; /* Stack items vertically */
//   justify-content: flex-start; /* Align items to the start of the navbar */
//   align-items: center; /* Align items to the center */
//   flex-grow: 1; /* Allows the container to grow and fill space */
// `;

// const NavLink = styled(Link)`
//   color: white;
//   text-decoration: none;
//   margin-bottom: 1rem; /* Bottom margin for spacing */
//   font-size: 18px; /* Adjust font size as needed */

//   &:hover {
//     text-decoration: underline;
//   }
// `;

// const NavHome = styled(Link)`
//   color: white;
//   text-decoration: none;
//   margin-bottom: 2rem; /* Extra space for home link */
//   font-size: 24px; /* Adjust font size as needed */
//   display: flex;
//   align-items: center; /* Center align image and text */

//   img {
//     margin-right: 10px; /* Space between image and text */
//   }
// `;

// const NavBottomContainer = styled.div`
//   display: flex;
//   flex-direction: column; /* Stack items vertically */
//   align-items: center; /* Center align icons */
//   margin-top: auto; /* Push this container to the bottom */
//   padding-bottom: 2rem; /* Additional padding at the bottom */
// `;

// const UserIconWrapper = styled.div`
//   background-color: white;
//   padding: 0.3rem;
//   border-radius: 50%;
//   display: inline-flex;
//   align-items: center;
//   justify-content: center;
// `;

// const StyledUserIcon = styled(UserIcon)`
//   width: 100px; /* Adjust as needed */
//   height: 100px; /* Adjust as needed */
// `;

// interface NavbarProps {
//   loggedIn: boolean;
// }

// const Navbar: React.FC<NavbarProps> = ({ loggedIn }) => {
//   if (!loggedIn) {
//     return null; // Do not render the navbar if the user is not logged in
//   }

//   return (
//     <Nav>
//       <NavContainer>
//         <NavHome to="/home">
//           <img src={Vector1} alt="logo" width={70} height={70} />
//         </NavHome>
//         <NavLink to="/home">Patient Portal</NavLink>
//         <NavLink to="/dashboard">Patient Dashboard</NavLink>
//       </NavContainer>
//       <NavBottomContainer>
//         <img src={Settings} alt="Settings" width={40} height={40}/>
//         <img src={User} alt="User" width={40} height={40} />
//         <img src={LogOut} alt="Log-In/Out" width={40} height={40} />
//       </NavBottomContainer>
//     </Nav>
//   );
// }

// export default Navbar;
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// function BasicExample() {
//   return (
//     <Navbar expand="lg" className="bg-body-tertiary">
//       <Container>
//         <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="me-auto">
//             <Nav.Link href="#home">Home</Nav.Link>
//             <Nav.Link href="#link">Link</Nav.Link>
//             <NavDropdown title="Dropdown" id="basic-nav-dropdown">
//               <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.2">
//                 Another action
//               </NavDropdown.Item>
//               <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
//               <NavDropdown.Divider />
//               <NavDropdown.Item href="#action/3.4">
//                 Separated link
//               </NavDropdown.Item>
//             </NavDropdown>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Navigation;
export {};