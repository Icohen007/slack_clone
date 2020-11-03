import React from 'react';
import styled from 'styled-components';

const UserImage = ({ ...rest }) => {
  const handleError = (e) => {
    e.target.onerror = null;
    e.target.src = './placeholder-user.jpg';
  };

  return <StyledImage {...rest} onError={handleError} />;
};

const StyledImage = styled.img`
  display: block;
  height: 100%;
  width: 100%;
`;

export default UserImage;
