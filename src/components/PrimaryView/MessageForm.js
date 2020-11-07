import React, { useContext, useState } from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import styles from './messageForm.module.scss';
import { ThemeContext } from '../App/ThemeProvider';
import SubmitMessageButton from './SubmitMessageButton';

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
        textAlignment="left"
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
    
    .rdw-emoji-modal {
      background: ${({ theme }) => theme.colors.white};
      box-shadow: ${({ lightTheme }) => (lightTheme ? '3px 3px 5px #BFBDBD' : 'none')};
    }
`;

export default MessageForm;
