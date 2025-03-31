// DropdownMenu.tsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface DropdownMenuProps {
  label: string;
  options: string[];
  basePath: string;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ label, options, basePath }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="dropdown" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button className="dropdown-toggle">
        {selectedOption || label}
      </button>
      {isOpen && (
        <div className="dropdown-menu">
          {options.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleOptionSelect(option)}
            >
              <Link to={`${basePath}/${option.toLowerCase().replace(/\s+/g, '-')}`}></Link>
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
