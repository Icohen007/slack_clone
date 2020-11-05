import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import { ButtonUnstyled, centeredFlex } from '../Shared/Shared.style';
import { auth, db, firebase } from '../../firebaseConfig';
import { addToCollection } from '../../lib/firebaseUtils';

const ModalContent = ({
  name, setName, description, setDescription,
}) => (
  <>
    <UpperText>
      Channels are where your team communicates. They’re best when organized around a topic —
      #marketing, for example.
    </UpperText>
    <Input>
      <label>
        Name
      </label>
      <input
        id="name"
        value={name}
        onChange={({ target }) => setName(target.value)}
        autoComplete="off"
      />
    </Input>
    <Input>
      <label>
        Description
      </label>
      <input
        id="description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        autoComplete="off"
      />
    </Input>
  </>
);

const AddChannelModal = ({ isModal, setModal }) => {
  const channelsRef = db.collection('channels');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const isValidInput = name.length > 0 && name.length <= 24 && description.length < 80;

  const handleClick = async () => {
    if (!isValidInput) return;
    const { currentUser } = auth;

    await addToCollection(channelsRef, {
      name,
      description,
      createdBy: {
        id: currentUser.uid,
        displayName: currentUser.displayName,
        photoURL: currentUser.photoURL,
      },
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setName('');
    setDescription('');
    setModal(false);
  };

  return (
    <Modal
      isVisible={isModal}
      title="Create a channel"
      content={(
        <ModalContent
          name={name}
          setName={setName}
          description={description}
          setDescription={setDescription}
        />
)}
      footer={(
        <CreateButton
          isValidInput={isValidInput}
          onClick={handleClick}
        >
          Create
        </CreateButton>
)}
      onClose={() => setModal(false)}
    />
  );
};

const UpperText = styled.div`
color: #616061;
`;

const Input = styled.div`
  padding-top: 5px;

  label {
    display: block;
    font-weight: 900;
    margin-top: 10px;
    margin-bottom: 5px;
  }
  
  input {
  width: 100%;
  height: 44px;
  outline: none;
  border: 1px solid #868686;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  transition: border 80ms ease-out,box-shadow 80ms ease-out;
  padding: 6px;
  font-size: 18px;
  border-radius: 4px;
  
    &:focus {
    outline: none;
    box-shadow: 0 0 0 1px rgba(18, 100, 163, 0.592), 0 0 0 4px rgba(29,155,209,.3);
    border-color: transparent;
    -webkit-appearance: none;

    }
  }
`;

const CreateButton = styled(ButtonUnstyled)`
    ${centeredFlex};
    height: 36px;
    min-width: 80px;
    padding: 0 12px;
    transition: all 80ms linear;
    font-weight: bold;
    color: ${({ isValidInput }) => (!isValidInput ? 'rgb(29, 28, 29)' : 'white')};
    border-radius: 4px;
    background: ${({ isValidInput }) => (!isValidInput ? 'rgb(221, 221 ,221)' : 'rgb(0, 122, 90)')};
    cursor: ${({ isValidInput }) => (!isValidInput ? 'auto' : 'pointer')};
`;

export default AddChannelModal;
