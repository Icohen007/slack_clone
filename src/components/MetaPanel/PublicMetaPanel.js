import React, { useMemo } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Centered } from '../Shared/Shared.style';
import { enhance } from '../../lib/firebaseUtils';
import { groupBY, parseDate } from '../../lib/helpers';
import Accordion from '../Shared/Accordion';
import { UserImage } from '../Shared';
import { StyledMetaPanel } from './MetaPanel.style';
import { toggleMetaPanel } from '../../features/sidebar/sidebarSlice';

const getPluralOrdinal = (size, baseText) => (size === 1 ? `${size} ${baseText}` : `${size} ${baseText}s`);

const PublicMetaPanel = ({ messagesRef }) => {
  const { activeChannel } = useSelector((state) => state.channels);
  const dispatch = useDispatch();
  const [messages, isMessagesReady] = enhance(useCollectionData(messagesRef));

  const messagesByUser = useMemo(() => {
    if (!isMessagesReady) {
      return {};
    }
    return groupBY(messages, 'createdBy.id');
  }, [messages, isMessagesReady]);

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
            {' '}
            {activeChannel.name}
          </div>
        </div>
        <span className="meta-panel-close" onClick={() => dispatch(toggleMetaPanel())}>
          <AiOutlineClose />
        </span>
      </div>
      <div className="content">
        <Accordion title="About">
          <div className="about">
            {activeChannel.description
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
                     <UserImage
                       src={(activeChannel.createdBy.photoURL) || '/dummy36.png'}
                       alt={(activeChannel.createdBy.displayName) || 'User name'}
                     />
                   </span>
                   <span>{activeChannel.createdBy.displayName}</span>
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
                   <div className="poster" key={user.id}>
                     <span className="poster-image">
                       <UserImage
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

export default PublicMetaPanel;
