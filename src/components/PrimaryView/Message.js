import React, { useMemo } from 'react';
import styled from 'styled-components';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { ButtonUnstyled, Image } from '../Shared/Shared.style';
import { parseDate } from '../../utils';

const Message = ({ message }) => {
  const { formattedContent, createdBy: { displayName, photoURL }, createdAt } = message;
  const editorState = useMemo(() => {
    const contentState = convertFromRaw(JSON.parse(formattedContent));
    return EditorState.createWithContent(contentState);
  }, [formattedContent]);

  return (
    <StyledMessage>
      <div className="left">
        <UserImage>
          <Image
            src={photoURL || '/dummy36.png'}
            alt={displayName || 'User name'}
          />
        </UserImage>
      </div>
      <div className="right">
        <span className="user-name">
          {displayName || 'User name'}
        </span>
        <span className="timestamp">
          {' '}
          {createdAt && parseDate(createdAt.toDate())}
        </span>
        <Editor editorState={editorState} readOnly />
      </div>
    </StyledMessage>
  );
};

const StyledMessage = styled.div`
  display: flex;
  padding: 8px 20px;
  
      &:hover {
    background: ${({ theme }) => theme.colors.whiteHover1};
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
    color: ${({ theme }) => theme.colors.grayDark};
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
