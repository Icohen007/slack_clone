import React, { useMemo } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { useSelector } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  Centered, centeredFlex, headerHeight, Image, navigationBarHeight,
} from '../Shared/Shared.style';
import { enhance } from '../../firebaseUtils';
import { groupBY, parseDate } from '../../utils';
import Accordion from '../Shared/Accordion';

const getPluralOrdinal = (size, baseText) => (size === 1 ? `${size} ${baseText}` : `${size} ${baseText}s`);

const MetaPanel = ({ onClose, messagesRef }) => {
  const { activeChannel } = useSelector((state) => state.channels);
  const [messages, isMessagesReady] = enhance(useCollectionData(messagesRef));

  const messagesByUser = useMemo(() => {
    if (!isMessagesReady) {
      return {};
    }
    return groupBY(messages, 'createdBy.id');
  }, [messages]);

  const topPostersSorted = Object.keys(messagesByUser).slice(0, 3)
    .sort((a, b) => messagesByUser[b].length - messagesByUser[a].length);

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
        <Accordion title="About">
          <div className="about">
            {activeChannel.createdAt
             && (
               <div className="about-section">
                 <div className="title">
                   Description
                 </div>
                 <div>
                   {activeChannel.description}
                 </div>
               </div>
             )}
            {activeChannel.createdAt && (
              <div className="about-section">
                <div className="title">
                  Created at
                </div>
                <span className="timestamp">
                  {parseDate(activeChannel.createdAt.toDate())}
                </span>
              </div>
            )}
            {activeChannel.createdBy
             && (
               <div className="about-section">
                 <div className="title">
                   Created by
                 </div>
                 <Centered gap={6} justify="flex-start">
                   <span className="created-image">
                     <Image
                       src={(activeChannel.createdBy.photoURL) || '/dummy36.png'}
                       alt={(activeChannel.createdBy.displayName) || 'User name'}
                     />
                   </span>
                   {activeChannel.createdBy.displayName}
                 </Centered>
               </div>
             )}
          </div>
        </Accordion>
        {Object.keys(messagesByUser).length > 0
         && (
           <Accordion title="Top posters">
             <div>
               {topPostersSorted.map((userKey) => {
                 const user = messagesByUser[userKey][0].createdBy;
                 return (
                   <div className="poster">
                     <span className="poster-image" key={user.id}>
                       <Image
                         src={(user.photoURL) || '/dummy36.png'}
                         alt={(user.displayName) || 'User name'}
                       />
                     </span>

                     <div className="poster-details">
                       <div className="poster-name">{user.displayName}</div>
                       <div>{getPluralOrdinal(messagesByUser[userKey].length, 'message')}</div>
                     </div>
                   </div>
                 );
               })}
             </div>
           </Accordion>
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

height: 100%;
max-height: calc(100vh - ${navigationBarHeight}px - ${headerHeight}px);
overflow: auto;

.about {
padding: 10px 0;

.about-section {
padding: 5px 0;
}
}

  .timestamp {
    color: #616061;
    font-size: 12px;
    font-weight: 400;
  }

.title {
font-weight: 700;
}

.created-image {
    display: inline-block;
    height: 40px;
    width: 40px;
    overflow: hidden;
}

.poster {
display: flex;
gap: 6px;
align-items: center;
height: 50px;
padding: 4px 0;
margin: 6px 0;

.poster-image {
    display: inline-block;
    height: 40px;
    width: 40px;
    overflow: hidden;
}

.poster-details {
 .poster-name {
 font-weight: 700;
 }
}
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
