import {useState} from 'react';
import TextEntry from '../components/TextEntry';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { updateAdmin } from '../app/reducer';
import { mapStateToProps } from '../app/store';
import UserIcon from '../components/UserIcon';
import Button from '../components/Button';

const AdminAccount = () => {
  const adminData = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const [name, setName] = useState(adminData.name);
  function handleNameChange(newName: string) {
    setName(newName);
  };

  const [email, setEmail] = useState(adminData.email);
  function handleEmailChange(newEmail: string) {
    setEmail(newEmail);
  };

  const [password, setPassword] = useState(adminData.password);
  function handlePasswordChange(newPassword: string) {
    setPassword(newPassword);
  };

  function saveEdits() {
    const updatedAdminData = {
      userId: adminData.userId,
      name: name,
      email: email,
      password: password,
      users: adminData.users,
      viewUser: ""
    };

    dispatch(updateAdmin(updatedAdminData));
  }

  return (
    <div>
      <UserIcon size={150}/>
      <TextEntry text='Name' input={name}  onInputChange={handleNameChange} />
      <TextEntry text='Email' input={email}  onInputChange={handleEmailChange} />
      <TextEntry text='Password' input={password}  onInputChange={handlePasswordChange} />
      <Button onClick={saveEdits} text={'Save'} />
    </div>
  );
}
  
export default connect(mapStateToProps)(AdminAccount);