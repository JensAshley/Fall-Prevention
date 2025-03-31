import React, { useState } from 'react';
import TextEntry from '../components/TextEntry';
import { auth } from '../app/firebaseSetup';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginAdmin } from '../app/reducer';
import { mapStateToProps } from '../app/store';

import { signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, ref, child, get } from "firebase/database";
import UserIcon from '../components/UserIcon';
//import Button from '../components/Button';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
type SetLoginType = React.Dispatch<React.SetStateAction<boolean>>;

// Reference to the database
const dbRef = ref(getDatabase());

const ForgetEmail = () => {
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle email change when user types in the email field
  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  // Handle password change when user types in the password field
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh'}}>
      <Card style={{ width: '20rem' }}>
        <Card.Body>
        <div style={{
            display: 'flex',
            justifyContent: 'center', // Center horizontally
            alignItems: 'center', // Center vertically
            marginBottom: '1rem' // Space between SVG and other elements
          }}>
            {/* SVG Icon */}
            <svg xmlns="http://www.w3.org/2000/svg" width="75" height="75" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
              <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
          </div>
          <span style={{ fontSize: "23px", display: "table", margin: "0 auto" }}>Login</span>
          <Form>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <div className="d-flex flex-column align-items-center">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={handleEmailChange}
                  style={{ width: '300px' }}
                />
              </div>
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

export default connect(mapStateToProps)(ForgetEmail);