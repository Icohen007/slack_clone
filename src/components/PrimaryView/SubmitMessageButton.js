import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { TiArrowRightOutline } from 'react-icons/ti';
import React from 'react';
import styled from 'styled-components';
import { addToCollection } from '../../lib/firebaseUtils';
import { auth, firebase } from '../../firebaseConfig';
import { ButtonUnstyled, centeredFlex } from '../Shared/Shared.style';

const SubmitMessageButton = ({ editorState, setEditorState, messagesRef }) => {
  const content = editorState.getCurrentContent();
  const isEmptyInput = content.getPlainText()
    .trim().length === 0;

  const handleClick = async () => {
    if (isEmptyInput) {
      return;
    }
    const { currentUser } = auth;
    const formattedContent = JSON.stringify(convertToRaw(content));
    const cleanContent = content.getPlainText();
    await addToCollection(messagesRef, {
      cleanContent,
      formattedContent,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdBy: {
        id: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
    });

    const emptyEditorState = EditorState.push(editorState, ContentState.createFromText(''),
      'remove-range');
    setEditorState(emptyEditorState);
  };

  return (
    <StyledSubmitMessageButton isEmptyInput={isEmptyInput} onClick={handleClick}>
      <TiArrowRightOutline />
    </StyledSubmitMessageButton>
  );
};

export default SubmitMessageButton;

const StyledSubmitMessageButton = styled(ButtonUnstyled)`
    ${centeredFlex};
    margin-left: auto;
    border-radius: 2px;
    margin-bottom: 6px;
    padding: 5px 8px;
    opacity: ${({ isEmptyInput }) => (isEmptyInput ? 0.2 : 1)};
    transition: opacity .2s,background-color .2s, color .2s;
    font-weight: bold;
    color: ${({ isEmptyInput }) => (isEmptyInput ? 'rgba(29, 28, 29, .7)' : 'white')};
    background: ${({ isEmptyInput }) => (isEmptyInput ? 'white' : 'rgb(0, 122, 90)')};
    cursor: ${({ isEmptyInput }) => (isEmptyInput ? 'auto' : 'pointer')};
    svg {
    font-size: 20px;
    }
`;
