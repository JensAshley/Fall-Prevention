import { AdminState, User } from './interfaces';
import { getDatabase, ref, set } from "firebase/database";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AdminState = {
    "userId" : "",
    "name": "example",
    "email": "example@gmail.com",
    "password": "examplepass",
    "users": [],
    "viewUser": "",
};

// Create a slice
const adminSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      loginAdmin: (state, action: PayloadAction<AdminState>) => {
        const { userId, name, email, password, users } = action.payload;
        state.userId = userId;
        state.name = name;
        state.email = email;
        state.password = password;
        state.users = users;
      },
      updateAdmin: (state, action: PayloadAction<AdminState>) => { // used in the adminaccount page
        const { userId, name, email, password, users } = action.payload;
        state.userId = userId;
        state.name = name;
        state.email = email;
        state.password = password;
        state.users = users;
        writeAdminData(action.payload);
      },
      addUser: (state, action: PayloadAction<User>) => {
        const newState = {
          ...state,
          users: [...state.users, action.payload.userId]
        };
        writeAdminData(newState);
        addNewUser(action.payload);
      },
      selectUser: (state, action: PayloadAction<string>) => { // this saves a user to load when the admin wants to view them
        const newState = {
          ...state,
          viewUser: action.payload
        };
      },
    },
});

function writeAdminData( edits : AdminState ) {
    const db = getDatabase();
    set(ref(db, 'admin/' + edits.userId), {
      name: edits.name,
      email: edits.email,
      password: edits.password,
      users: edits.users
    });
}

function addNewUser( edits : User ) {
  const db = getDatabase();
  set(ref(db, 'user/' + edits.userId), {
    email: edits.email,
    first_name: edits.first_name,
    last_name: edits.last_name,
    birthdate: edits.birthdate,
    goals: [],
  });
}

export const { loginAdmin, updateAdmin, addUser, selectUser } = adminSlice.actions;
export default adminSlice.reducer;