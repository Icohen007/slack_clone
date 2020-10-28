import React from 'react';
import { AiOutlineStar, AiFillStar, AiOutlineInfoCircle } from 'react-icons/ai';
import { RiUserAddLine } from 'react-icons/ri';
import { Tooltip } from 'react-tippy';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  Centered, Image, TooltipContent,
} from '../Shared/Shared.style';
import { auth, db } from '../../firebase';
import { enhance } from '../../firebaseUtils';
import {
  ParticipantButtons,
  ServiceButton,
  Spacer,
  StyledMessagesHeader,
} from './MessagesHeader.style';

const PublicMessagesHeader = ({ activeChannel }) => {
  const starredChannelsRef = db.collection('users').doc(auth.currentUser.uid).collection('starred');

  const [starredChannels, isReady] = enhance(useCollectionData(starredChannelsRef));

  if (!isReady) {
    return null;
  }

  const isChannelStarred = starredChannels
    .find((starredChannel) => starredChannel.id === activeChannel.id);

  const starChannel = () => {
    starredChannelsRef.doc(activeChannel.id).set(activeChannel);
  };

  const unStarChannel = () => {
    starredChannelsRef.doc(activeChannel.id).delete();
  };

  return (
    <StyledMessagesHeader>
      <Centered>
        <span className="channel-name">
          {`# ${activeChannel.name}`}
        </span>
        {isChannelStarred ? <AiFillStar color="orange" className="icon-star" onClick={unStarChannel} /> : <AiOutlineStar className="icon-star" onClick={starChannel} />}
      </Centered>
      <Spacer />
      <Tooltip
        position="bottom"
        delay={100}
        arrow
        html={<TooltipContent> View all 3 members </TooltipContent>}
      >
        <ParticipantButtons>
          <span className="participant">
            <Image
              src={(auth.currentUser && auth.currentUser.photoURL) || '/dummy36.png'}
              alt={(auth.currentUser && auth.currentUser.displayName) || 'User name'}
            />
          </span>
          <span className="participant">
            <Image
              src={(auth.currentUser && auth.currentUser.photoURL) || '/dummy36.png'}
              alt={(auth.currentUser && auth.currentUser.displayName) || 'User name'}
            />
          </span>
          <span className="participant">
            <Image
              src={(auth.currentUser && auth.currentUser.photoURL) || '/dummy36.png'}
              alt={(auth.currentUser && auth.currentUser.displayName) || 'User name'}
            />
          </span>
          <span className="participant-count"> 3</span>
        </ParticipantButtons>
      </Tooltip>
      <Tooltip
        position="bottom"
        arrow
        delay={100}
        html={<TooltipContent> add people to # pingpong_tournament </TooltipContent>}
      >
        <ServiceButton>
          <span>
            <RiUserAddLine />
          </span>
        </ServiceButton>
      </Tooltip>
      <Tooltip
        position="bottom"
        arrow
        delay={100}
        html={<TooltipContent> Show channel details </TooltipContent>}
      >
        <ServiceButton>
          <span>
            <AiOutlineInfoCircle />
          </span>
        </ServiceButton>
      </Tooltip>
    </StyledMessagesHeader>
  );
};

export default PublicMessagesHeader;
