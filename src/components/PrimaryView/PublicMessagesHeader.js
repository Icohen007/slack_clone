import React, { useMemo } from 'react';
import { AiFillStar, AiOutlineInfoCircle, AiOutlineStar } from 'react-icons/ai';
import { RiUserAddLine } from 'react-icons/ri';
import { Tooltip } from 'react-tippy';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { BsLayoutTextSidebar } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { Centered, Image, } from '../Shared/Shared.style';
import { auth, db } from '../../firebase';
import { enhance } from '../../firebaseUtils';
import {
  ParticipantButtons,
  ServiceButton,
  Spacer,
  StyledMessagesHeader,
} from './MessagesHeader.style';
import { useMobile } from '../../hooks';
import { toggleMetaPanel, toggleSidebar } from '../../features/sidebar/sidebarSlice';
import TooltipContent from '../Shared/TooltipContent';
import theme from '../../theme';
import { groupBY } from '../../utils';

const PublicMessagesHeader = ({ activeChannel, messagesRef }) => {
  const isMobile = useMobile();
  const starredChannelsRef = db.collection('users').doc(auth.currentUser.uid).collection('starred');
  const [starredChannels, isStarredReady] = enhance(useCollectionData(starredChannelsRef));
  const [messages, isMessagesReady] = enhance(useCollectionData(messagesRef));

  const messagesByUser = useMemo(() => {
    if (!isMessagesReady) {
      return {};
    }
    return groupBY(messages, 'createdBy.id');
  }, [messages]);

  const users = Object.keys(messagesByUser).map((userKey) => messagesByUser[userKey][0].createdBy);

  const participantPics = useMemo(() => users.slice(0, 3).map((user) => (
    <span className="participant" key={user.id}>
      <Image
        src={(user.photoURL) || '/dummy36.png'}
        alt={(user.displayName) || 'User name'}
      />
    </span>
  )), [messagesByUser]);

  const dispatch = useDispatch();

  if (!isStarredReady || !isMessagesReady) {
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
      {isMobile && (
        <ServiceButton
          style={{ marginLeft: 0, marginRight: 5 }}
          onClick={() => dispatch(toggleSidebar())}
        >
          <span>
            <BsLayoutTextSidebar />
          </span>
        </ServiceButton>
      )}
      <Centered>
        <span className="channel-name">
          {`# ${activeChannel.name}`}
        </span>
        {isChannelStarred ? <AiFillStar color="orange" className="icon-star" onClick={unStarChannel} /> : <AiOutlineStar className="icon-star" onClick={starChannel} />}
      </Centered>
      <Spacer />
      {users.length > 0 && (
      <Tooltip
        position="bottom"
        delay={100}
        arrow
        html={<Members users={users} />}
      >
        <ParticipantButtons>
          {!isMobile && participantPics}
          <span className="participant-count">
            {Object.keys(messagesByUser).length}
          </span>
        </ParticipantButtons>
      </Tooltip>
      )}
      <Tooltip
        position="bottom"
        arrow
        delay={100}
        html={(
          <TooltipContent notSupported>
            add people to #
            {activeChannel.name}
          </TooltipContent>
)}
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
        disabled={isMobile}
        html={<TooltipContent> Show channel details </TooltipContent>}
      >
        <ServiceButton onClick={() => dispatch(toggleMetaPanel())}>
          <span>
            <AiOutlineInfoCircle />
          </span>
        </ServiceButton>
      </Tooltip>
    </StyledMessagesHeader>
  );
};

const Members = ({ users }) => (
  <TooltipContent>
    <div>
      {`View all ${users.length} members`}
      <br />
      <span style={{ color: theme.colors.grayLight }}>
        includes
        {' '}
        {users.map(
          (user, idx) => (idx !== users.length - 1 ? `${user.displayName}, ` : user.displayName),
        )}
      </span>
    </div>
  </TooltipContent>
);

export default PublicMessagesHeader;
