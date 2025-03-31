import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../app/reducer';
import { mapStateToProps } from '../app/store';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { secondaryApp } from '../app/firebaseSetup';
import TextEntry from '../components/TextEntry';
import Button from '../components/Button';

const AddUser = () => {
  const [ email, setEmail ] = useState("");
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");
  const [ birthdate, setBirthdate ] = useState("00/00/0000");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = getAuth(secondaryApp);

  const createUser = async (event: any) => {
    createUserWithEmailAndPassword(auth, email, "temporary.pass1")
      .then((userCredential) => {
        // Signed up 
        const newUser = userCredential.user;
        const user = {
          userId: newUser.uid,
          email: email,
          first_name: firstName,
          last_name: lastName,
          birthdate: birthdate,
          goals: [],
        }
        dispatch(addUser(user));
        auth.signOut();
        navigate('/home');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode + errorMessage);
      });
  }

  function handleEmailChange(newEmail: string) {
    setEmail(newEmail);
  };
  function handleFirstNameChange(newFirstName: string) {
    setFirstName(newFirstName);
  };
  function handleLastNameChange(newLastName: string) {
    setLastName(newLastName);
  };
  function handleBirthdateChange(newBirthdate: string) {
    setBirthdate(newBirthdate);
  };

  return (
    <div>
      <p>add user page</p>
      <TextEntry text='Email' input={email}  onInputChange={handleEmailChange}/>
      <TextEntry text='First name' input={firstName}  onInputChange={handleFirstNameChange}/>
      <TextEntry text='Last name' input={lastName}  onInputChange={handleLastNameChange}/>
      <TextEntry text='Birthdate' input={birthdate}  onInputChange={handleBirthdateChange}/>
      <Button onClick={createUser} text={'Add user'}/>
    </div>
  );
}
  
export default connect(mapStateToProps)(AddUser);