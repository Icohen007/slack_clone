import React from 'react';
import styled from 'styled-components';
import { AiOutlineStar, AiFillStar, AiOutlineInfoCircle } from 'react-icons/ai';
import { RiUserAddLine } from 'react-icons/ri';
import { Tooltip } from 'react-tippy';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useSelector } from 'react-redux';
import {
  ButtonUnstyled, Centered, centeredFlex, Image, TooltipContent,
} from '../Shared/Shared.style';
import { auth, db } from '../../firebase';

const MessagesHeader = () => {
  const starredChannelsRef = db.collection('users').doc(auth.currentUser.uid).collection('starred');
  const [starredChannels, loading, error] = useCollectionData(starredChannelsRef);
  const isReady = !loading && !error;
  const { activeChannel } = useSelector((state) => state.channels);

  if (!isReady) {
    return null;
  }

  const isChannelStarred = starredChannels.find((starredChannel) => starredChannel.id === activeChannel.id);

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

const StyledMessagesHeader = styled.header`
height: 64px;
padding: 0 20px;
display: flex;
align-items: center;
border-bottom: 1px solid rgba(29,28,29,0.13);

.channel-name {
  font-weight: 900;
}

.icon-star {
  margin-left: 4px;
  font-size: 20px;
  cursor: pointer;
}

`;

const Spacer = styled.div`
flex: 1;
`;

const ParticipantButtons = styled(ButtonUnstyled)`
${centeredFlex};
margin-right: 12px;

.participant {
    margin-left: 2px;
    display: inline-block;
    height: 24px;
    width: 24px;
    overflow: hidden;
}

.participant-count {
margin-left: 6px;
font-size: 13px;
font-weight: 700;
}
`;

const ServiceButton = styled(ButtonUnstyled)`
${centeredFlex};
    margin-left: 4px;
    &:hover {
    background: rgba(29,28,29,0.04);
    }
    
    span {
${centeredFlex};
    display: inline-block;
    padding: 8px;
    border-radius: 4px;
    //font-size: 16px;
    svg {
    display: block;
        height: 20px;
    width: 20px;
    }
    }
`;

export default MessagesHeader;
