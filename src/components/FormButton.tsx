import React, { useState } from 'react';

interface FormButtonProps {
  onFormSubmit: (formData: any) => void;
}

const FormButton: React.FC<FormButtonProps> = ({ onFormSubmit }) => {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState<any>({});

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onFormSubmit(formData);
    setShowForm(false);
    setFormData({});
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  return (
    <div>
      {showForm ? (
        <form onSubmit={handleFormSubmit}>
          <label>
            Form Input:
            <input type="text" name="formInput" value={formData.formInput || ''} onChange={handleInputChange} />
          </label>
          <button type="submit">Submit</button>
        </form>
      ) : (
        <button
          style={{
            borderRadius: '10px',
            width: '130px',
            height: '40px',
            fontSize: '15px',
            lineHeight: '1',
            background: '#6DABF4',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
          onClick={handleButtonClick}
        >
          + Add Patient
        </button>
      )}
    </div>
  );
};

export default FormButton;
