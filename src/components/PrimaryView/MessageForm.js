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
  options: ['inline', 'list', 'colorPicker', 'link', 'emoji', 'image', 'history'],
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
  colorPicker: {
    className: undefined,
    component: undefined,
    popupClassName: styles.popup,
    colors: ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
      'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
      'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
      'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
      'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
      'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'],
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: styles.popup,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: '_self',
    options: ['link', 'unlink'],
    linkCallback: undefined,
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
  image: {
    className: undefined,
    component: undefined,
    popupClassName: styles.popup,
    urlEnabled: true,
    uploadEnabled: true,
    alignmentEnabled: true,
    uploadCallback: undefined,
    previewImage: false,
    inputAccept: 'image/gif,image/jpeg,image/jpg,image/png,image/svg',
    alt: { present: false, mandatory: false },
    defaultSize: {
      height: 'auto',
      width: 'auto',
    },
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
    const publicMessagesRef = db.collection('channelMessages').doc(activeChannel.id).collection('messages');
    const { currentUser } = auth;
    const formattedContent = JSON.stringify(convertToRaw(content));
    const cleanContent = content.getPlainText();
    try {
      await publicMessagesRef.add({
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
