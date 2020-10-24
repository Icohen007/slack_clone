import React from 'react';
import { IoMdAdd, IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';
import styled from 'styled-components';
import { ButtonUnstyled, Centered, centeredFlex } from '../Shared/Shared.style';

const ChannelCategory = ({ name, showing, onClick }) => (
  <AccordionContainer onClick={onClick}>
    <AccordionButton>
      {showing ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
    </AccordionButton>
    <span>{name}</span>
    <AddChannelButton>
      <IoMdAdd />
    </AddChannelButton>
  </AccordionContainer>
);

const AccordionButton = styled(ButtonUnstyled)`
  ${centeredFlex};
  border-radius: 4px;
  margin-right: 4px;
  height: 26px;
  width: 26px;
  &:hover {
    background: rgba(255,255,255,0.1);
  }
`;

const AddChannelButton = styled(AccordionButton)`
  ${centeredFlex};
  margin-left: auto;
  color: ${({ theme }) => theme.colors.purpleLight};
  font-size: 20px;
  padding: 2px 2px 4px;
  display: none;
`;

const AccordionContainer = styled(Centered)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 36px;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  
    &:hover {
    ${AddChannelButton} {
      display: block;
    }
  }
`;

export default ChannelCategory;
