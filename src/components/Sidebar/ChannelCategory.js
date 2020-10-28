import React from 'react';
import { IoMdAdd, IoMdArrowDropdown, IoMdArrowDropright } from 'react-icons/io';
import styled from 'styled-components';
import { AccordionButton, Centered } from '../Shared/Shared.style';
import AddChannelButton from './AddChannelButton';
import SidebarAddButton from './SidebarAddButton';

const ChannelCategory = ({
  name, showing, onClick, isChannels,
}) => (
  <>
    <AccordionContainer onClick={onClick}>
      <AccordionButton>
        {showing ? <IoMdArrowDropdown /> : <IoMdArrowDropright />}
      </AccordionButton>
      <span>{name}</span>
      {isChannels && (
      <AddChannelButton>
        <IoMdAdd />
      </AddChannelButton>
      )}
    </AccordionContainer>

  </>
);

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
    ${SidebarAddButton} {
      display: block;
    }
  }
`;

export default ChannelCategory;
