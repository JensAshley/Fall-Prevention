import React from 'react';

interface ButtonProps {
  onClick: (arg0: any) => void | Promise<void>;
  text: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, text }) => {
  return (
    <div style={{display: 'flex', justifyContent: 'center', margin: "20px", }}>
    <button 
        onClick={onClick}
        style={{
            width: "100px", 
            height: "200px;", 
            justifyContent: "center", 
            backgroundColor: "#3569CE", 
            color: "white",
            borderRadius: "10px",
            borderColor: "#3569CE", 
            fontSize: "20px"
        }}>
      {text}
    </button>
    </div>

  );
};

export default Button;
