import React from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { centeredFlex, headerHeight } from '../Shared/Shared.style';

const MetaPanel = ({ onClose }) => {
  const { activeChannel } = useSelector((state) => state.channels);
  return (
    <StyledMetaPanel>
      <div className="header">
        <div>
          <div className="header-details">Details</div>
          <div className="header-channel-name">
            #
            {activeChannel.name}
          </div>
        </div>
        <span className="meta-panel-close" onClick={onClose}>
          <AiOutlineClose />
        </span>
      </div>
      <div className="content">
        {activeChannel.description
         && (
           <>
             <div className="description-title">
               Description
             </div>
             <div>
               {activeChannel.description}
             </div>
           </>
         )}
      </div>
    </StyledMetaPanel>
  );
};

const StyledMetaPanel = styled.section`
display: flex;
flex-direction: column;
border-radius: 6px;
border-left: 1px solid rgba(29,28,29,0.13);

.header {
height: ${headerHeight}px;
display: flex;
align-items: center;
justify-content: space-between;
border-bottom: 1px solid rgba(29,28,29,0.13);
padding: 0 12px 0 16px;

.header-details {
font-weight: 900;
}

.header-channel-name {
font-size: 13px;
font-weight: 400;
color: rgba(29,28,29,0.7);
}
}

.content {
padding: 5px 12px;

.description-title {
text-align: center;
font-weight: 900;
}
}

.meta-panel-close {
  ${centeredFlex};
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
  background-color: rgba(0,0,0, 0.07);
  }
  svg {
  font-size: 20px;
  }
}
`;

export default MetaPanel;
