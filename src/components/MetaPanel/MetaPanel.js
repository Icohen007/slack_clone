import React, { useMemo } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { centeredFlex, headerHeight, Image } from '../Shared/Shared.style';
import { enhance } from '../../firebaseUtils';
import { groupBY, parseDate } from '../../utils';

const MetaPanel = ({ onClose, messagesRef }) => {
  const { activeChannel } = useSelector((state) => state.channels);
  const [messages, isMessagesReady] = enhance(useCollectionData(messagesRef));

  const messagesByUser = useMemo(() => {
    if (!isMessagesReady) {
      return {};
    }
    return groupBY(messages, 'createdBy.id');
  }, [messages]);

  if (!isMessagesReady) {
    return null;
  }

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
        <div className="about">
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
          {activeChannel.createdAt && (
          <span className="timestamp">
            Created at:
            {' '}
            {parseDate(activeChannel.createdAt.toDate())}
          </span>
          )}
        </div>
        {Object.keys(messagesByUser).length > 0
         && (
         <>
           <div className="description-title">
             Top Posters
           </div>
           <div>
             {Object.keys(messagesByUser).slice(0, 3).map((userKey) => {
               const user = messagesByUser[userKey][0].createdBy;
               return (
                 <>
                   <p>
                     {user.displayName}
                   </p>
                   <p>
                     {messagesByUser[userKey].length}
                   </p>
                   <span className="participant" key={user.id}>
                     <Image
                       src={(user.photoURL) || '/dummy36.png'}
                       alt={(user.displayName) || 'User name'}
                     />
                   </span>
                 </>
               );
             })}
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

.about {
padding: 10px 0;
}

  .timestamp {
    color: #616061;
    font-size: 12px;
    font-weight: 400;
  }

.description-title {
text-align: center;
font-weight: 900;
}

.participant {
    display: inline-block;
    height: 24px;
    width: 24px;
    overflow: hidden;
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
