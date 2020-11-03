import React, { useContext, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import { TiArrowRightOutline } from 'react-icons/ti';
import { auth, firebase } from '../../firebase';
import styles from './messageForm.module.scss';
import { ButtonUnstyled, centeredFlex } from '../Shared/Shared.style';
import { addToCollection } from '../../firebaseUtils';
import { ThemeContext } from '../ThemeProvider';

const toolbar = {
  options: ['inline', 'list', 'emoji', 'history'],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['unordered', 'ordered'],
  },
  emoji: {
    component: undefined,
    popupClassName: styles.popup,
    emojis: [
      '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
      '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
      '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
      '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
      '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
      '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
      '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
      '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
      '✅', '❎', '💯',
    ],
  },
  history: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ['undo', 'redo'],
  },
};

const SubmitMessageButton = ({ editorState, setEditorState, messagesRef }) => {
  const content = editorState.getCurrentContent();
  const isEmptyInput = content.getPlainText().trim().length === 0;

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

    const emptyEditorState = EditorState.push(editorState, ContentState.createFromText(''), 'remove-range');
    setEditorState(emptyEditorState);
  };

  return (
    <StyledSubmitMessageButton isEmptyInput={isEmptyInput} onClick={handleClick}>
      <TiArrowRightOutline />
    </StyledSubmitMessageButton>
  );
};

const StyledSubmitMessageButton = styled(ButtonUnstyled)`
    ${centeredFlex};
    margin-left: auto;
    border-radius: 2px;
    margin-bottom: 6px;
    padding: 5px;
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

const MessageForm = ({ messagesRef, containerRef }) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const { theme } = useContext(ThemeContext);
  return (
    <MessageFormWrapper lightTheme={theme === 'light'} ref={containerRef}>
      <Editor
        editorState={editorState}
        wrapperClassName={theme === 'light' ? styles['wrapper-light'] : styles['wrapper-dark']}
        editorClassName={theme === 'light' ? styles['editor-light'] : styles['editor-dark']}
        toolbarClassName={theme === 'light' ? styles['toolbar-light'] : styles['toolbar-dark']}
        onEditorStateChange={setEditorState}
        toolbar={toolbar}
        toolbarCustomButtons={[<SubmitMessageButton
          setEditorState={setEditorState}
          messagesRef={messagesRef}
        />]}
      />
    </MessageFormWrapper>
  );
};

const MessageFormWrapper = styled.div`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px;
    z-index: 1;
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black1};
    
    .rdw-option-wrapper {
     background: ${({ lightTheme }) => (lightTheme ? '#FFF' : '#25272b')} !important;

    img {
      filter: ${({ lightTheme }) => (lightTheme ? 'none' : 'invert(100%)')}
    }
    }
`;

export default MessageForm;
