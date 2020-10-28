import React from 'react';
import styled from 'styled-components';
import { Editor, convertFromRaw, EditorState } from 'draft-js';
import { ButtonUnstyled, Image } from '../Shared/Shared.style';
import { auth } from '../../firebase';
import storedState from './storedState.json';

const contentState = convertFromRaw(storedState);
const editorState = EditorState.createWithContent(contentState);

const Message = () => (
  <StyledMessage>
    <div className="left">
      <UserImage>
        <Image
          src={(auth.currentUser && auth.currentUser.photoURL) || '/dummy36.png'}
          alt={(auth.currentUser && auth.currentUser.displayName) || 'User name'}
        />
      </UserImage>
    </div>
    <div className="right">
      <span className="user-name">
        {(auth.currentUser && auth.currentUser.displayName) || 'User name'}
      </span>
      <span className="timestamp"> 2:10PM </span>
      <Editor editorState={editorState} readOnly />
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
