import { useState } from 'react';

const TextEntry = ({ text, input, onInputChange } : { text: string, input: string, onInputChange: any }) => {
  const [localInput, setLocalInput] = useState(input);

  const handleInputChange = (event : any) => {
    const newValue = event.target.value;
    setLocalInput(newValue);
    onInputChange(newValue);
  };

    return (
      <div style={{textAlign: "center"}}>
        <br />
        <label style={{fontSize: "18px", textAlign: "left"}}>{text} </label>
        <input 
          type="text"
          value={localInput}
          onChange={handleInputChange}
          style={{
            marginLeft: '5px',
            padding: '10px', // Adjust padding to increase the size
            borderRadius: '15px', // Adjust border-radius to round the box
            border: '1px solid #3569CE', // Add a border for better visibility
          }}
        />
        <br />
      </div>
    );
  };
  
  export default TextEntry;