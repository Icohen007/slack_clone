import React, { useMemo } from 'react';
import styled from 'styled-components';
import { convertFromRaw, Editor, EditorState } from 'draft-js';
import { ButtonUnstyled } from '../Shared/Shared.style';
import { parseDate } from '../../lib/helpers';
import { UserImage } from '../Shared';

const Message = ({ message }) => {
  const { formattedContent, createdBy: { displayName, photoURL }, createdAt } = message;
  const editorState = useMemo(() => {
    const contentState = convertFromRaw(JSON.parse(formattedContent));
    return EditorState.createWithContent(contentState);
  }, [formattedContent]);

  return (
    <StyledMessage>
      <div className="left">
        <MessageUserImage>
          <UserImage
            src={photoURL || '/dummy36.png'}
            alt={displayName || 'User name'}
          />
        </MessageUserImage>
      </div>
      <div className="right">
        <span className="user-name">
          {displayName || 'User name'}
        </span>
        <span className="timestamp">
          {' '}
          {createdAt && parseDate(createdAt.toDate())}
        </span>
        <Editor textAlignment="left" editorState={editorState} readOnly />
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
  width: 100%;
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
  
  div.DraftEditor-root {
    padding-right: 40px;
  }
`;

const MessageUserImage = styled(ButtonUnstyled)`
border-radius: 4px;
width: 36px;
height: 36px;
margin-top: 6px;

`;

export default Message;
