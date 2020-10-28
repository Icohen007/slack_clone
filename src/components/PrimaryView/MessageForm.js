import React, { useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styled from 'styled-components';
import { TiArrowRightOutline } from 'react-icons/ti';
import { useSelector } from 'react-redux';
import { auth, db, firebase } from '../../firebase';
import styles from './messageForm.module.scss';
import { ButtonUnstyled, centeredFlex } from '../Shared/Shared.style';

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
    className: undefined,
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

const SubmitMessageButton = ({ editorState, setEditorState }) => {
  const content = editorState.getCurrentContent();
  const isEmptyInput = !content.hasText();
  const { activeChannel, isPrivateChannelMode } = useSelector((state) => state.channels);

  const handleClick = async () => {
    const channelMessagesRef = db.collection('channelMessages').doc(activeChannel.id).collection('messages');
    const { currentUser } = auth;
    const formattedContent = JSON.stringify(convertToRaw(content));
    const cleanContent = content.getPlainText();
    try {
      await channelMessagesRef.add({
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
    } catch (err) {
      console.log(err);
    }
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

const MessageForm = () => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  // console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
  return (
    <MessageFormWrapper>
      <Editor
        editorState={editorState}
        wrapperClassName={styles.wrapper}
        editorClassName={styles.editor}
        onEditorStateChange={setEditorState}
        toolbar={toolbar}
        toolbarCustomButtons={[<SubmitMessageButton setEditorState={setEditorState} />]}
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
`;

export default MessageForm;
