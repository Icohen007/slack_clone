import React, { useState } from 'react';
import styled from 'styled-components';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

const Accordion = ({ title, children }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <AccordionTitleContainer onClick={() => setOpen((open) => !open)}>
        <div
          className="accordion-title"
        >
          {title}
        </div>
        {isOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
      </AccordionTitleContainer>
      <AccordionItem isOpen={isOpen}>
        <div className="accordion-content">{children}</div>
      </AccordionItem>
    </>
  );
};

const AccordionTitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 46px;
  padding: 0 10px;
  cursor: pointer;
  user-select: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderWhite1};
  
  svg {
  font-size: 20px;
  }
  
      &:hover {
    background: ${({ theme }) => theme.colors.whiteHover1};
    }
  
  .accordion-title {
  font-weight: 700;
  }
`;

const AccordionItem = styled.div`
  overflow: hidden;
  transition: max-height 0.3s ${({ isOpen }) => (isOpen ? 'cubic-bezier(1, 0, 1, 0)' : 'cubic-bezier(0, 1, 0, 1)')};
  height: auto;
  max-height: ${({ isOpen }) => (isOpen ? '9999px' : 0)};
  
  .accordion-content {
    border-bottom: 1px solid ${({ theme }) => theme.colors.borderWhite1};
    padding: 10px;
  }
  
`;

export default Accordion;
