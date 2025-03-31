import React, { useState } from 'react';
import { getDatabase, ref, child, get } from "firebase/database";

const dbRef = ref(getDatabase());

interface UserCardProps {
    userId: string;
    onClick: React.MouseEventHandler<HTMLDivElement>;
  }

export const UserCard: React.FC<UserCardProps> = ({ userId, onClick }) => { 
    const [ email, setEmail ] = useState("");
    const [ name, setName ] = useState("");
    const boxStyle: React.CSSProperties = {
        border: '1px solid #ccc',
        padding: '10px',
        borderRadius: '5px',
        margin: '10px',
    };

    get(child(dbRef, `user/${userId}`)).then((snapshot) => {
        if (snapshot.exists()) { // user exists under this admin
          setName(snapshot.val().last_name + ", " + snapshot.val().first_name);
          setEmail(snapshot.val().email);
        } else {
          console.log("No user found");
        }
      }).catch((error) => {
        console.error(error);
      });

    return (
        <div style={boxStyle} onClick={onClick}>
            <p>{name + " " + email}</p>
        </div>
    );
}