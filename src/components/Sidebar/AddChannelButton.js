import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import styled from 'styled-components';
import Modal from '../Modal/Modal';
import { AccordionButton, ButtonUnstyled, centeredFlex } from '../Shared/Shared.style';

const AddChannelButton = () => {
  const [isModal, setModal] = useState(false);
  const [input, setInput] = useState('');

  return (
    <>
      <StyledAddChannelButton onClick={() => setModal(true)}>
        <IoMdAdd />
      </StyledAddChannelButton>
      <Modal
        isVisible={isModal}
        title="Create a channel"
        content={<ModalContent input={input} setInput={setInput} />}
        footer={<CreateButton isEmptyInput={input.length === 0}>Create</CreateButton>}
        onClose={() => setModal(false)}
      />
    </>
  );
};

export const StyledAddChannelButton = styled(AccordionButton)`
  ${centeredFlex};
  margin-left: auto;
  color: ${({ theme }) => theme.colors.purpleLight};
  padding: 2px;
  display: none;
  
  svg {
  font-size: 20px;
  }
`;

const UpperText = styled.div`
color: #616061;
`;

const Input = styled.div`
  padding: 10px 0;

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
    box-shadow: 0 0 0 1px rgba(18, 100, 163, 0.592), 0 0 0 5px rgba(29,155,209,.3);
    border-color: transparent;
    -webkit-appearance: none;

    }
  }
`;

const ModalContent = ({ input, setInput }) => (
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
        value={input}
        onChange={({ target }) => setInput(target.value)}
        autoComplete="off"
      />
    </Input>
  </>
);
const CreateButton = styled(ButtonUnstyled)`
    ${centeredFlex};
    height: 36px;
    min-width: 80px;
    padding: 0 12px;
    transition: all 80ms linear;
    font-weight: bold;
    color: ${({ isEmptyInput }) => (isEmptyInput ? 'rgb(29, 28, 29)' : 'white')};
    border-radius: 4px;
    background: ${({ isEmptyInput }) => (isEmptyInput ? 'rgb(221, 221 ,221)' : 'rgb(0, 122, 90)')};
`;

export default AddChannelButton;
