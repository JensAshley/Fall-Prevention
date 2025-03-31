import React from 'react';

interface UserIconProps {
  size?: number;
  src?: string;
}

const UserIcon: React.FC<UserIconProps> = ({ size = 10, src }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', margin: 'auto', color: '#3569CE', marginTop: '20px'}}
    >
      {src ? (
        <image x="1" y="1" width="22" height="22" href={src} />
      ) : (
        <>
          <circle cx="12" cy="12" r="11" fill="none" stroke="currentColor" strokeWidth="2" />
          <circle cx="12" cy="7" r="4" fill="currentColor" />
          <path d="M12 11V22M18 21V12M6 21V12" />
        </>
      )}
    </svg>
  );
};

export default UserIcon;
