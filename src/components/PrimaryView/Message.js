import React from 'react';
import styled from 'styled-components';
import { ButtonUnstyled, Image } from '../Shared/Shared.style';

const Message = () => (
  <StyledMessage>
    <div className="left">
      <UserImage>
        <Image src="/dummy36.png" alt="dummy36" />
      </UserImage>
    </div>
    <div className="right">
      <span className="user-name">
        Itamar Cohen
      </span>
      <span className="timestamp"> 2:10PM </span>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque eligendi expedita velit veritatis vero! Autem cum cupiditate deleniti distinctio id illum modi molestias, nihil nobis pariatur! At pariatur sint tempora?
      </div>
    </div>
  </StyledMessage>
);

const StyledMessage = styled.div`
  display: flex;
  padding: 8px 20px;
  
      &:hover {
    background: rgba(29,28,29,0.04);
    }
  
  .left {
    display: flex;
    flex-shrink: 0;
    margin-right: 8px;
  }
  
  .right {
  padding: 0 16px 0 8px;
  .user-name {
  font-weight: 900;
  margin-right: 4px;
  }
  
  .timestamp {
    color: #616061;
    font-size: 12px;
    font-weight: 400;
  }
  
  }
`;

const UserImage = styled(ButtonUnstyled)`
border-radius: 4px;
width: 36px;
height: 36px;
margin-top: 6px;

`;

export default Message;
