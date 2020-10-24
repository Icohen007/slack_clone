import React from 'react';
import styled from 'styled-components';
import { AiOutlineStar, AiFillStar, AiOutlineInfoCircle } from 'react-icons/ai';
import { RiUserAddLine } from 'react-icons/ri';
import { Tooltip } from 'react-tippy';
import {
  ButtonUnstyled, Centered, centeredFlex, Image, TooltipContent,
} from '../Shared/Shared.style';

const starred = true;

const MessagesHeader = () => (
  <StyledMessagesHeader>
    <Centered>
      <span className="channel-name">
        # pingpong_tournament
      </span>
      {starred ? <AiFillStar color="orange" /> : <AiOutlineStar style={{ marginLeft: 4 }} />}
    </Centered>
    <Spacer />
    <Tooltip position="bottom" delay={100} arrow html={<TooltipContent> View all 3 members </TooltipContent>}>
      <ParticipantButtons>
        <span className="participant">
          <Image src="/dummy36.png" alt="dummy36" />
        </span>
        <span className="participant">
          <Image src="/dummy36.png" alt="dummy36" />
        </span>
        <span className="participant">
          <Image src="/dummy36.png" alt="dummy36" />
        </span>
        <span className="participant-count"> 3</span>
      </ParticipantButtons>
    </Tooltip>
    <Tooltip position="bottom" arrow delay={100} html={<TooltipContent> add people to # pingpong_tournament </TooltipContent>}>
      <ServiceButton>
        <span>
          <RiUserAddLine />
        </span>
      </ServiceButton>
    </Tooltip>
    <Tooltip position="bottom" arrow delay={100} html={<TooltipContent> Show channel details </TooltipContent>}>
      <ServiceButton>
        <span>
          <AiOutlineInfoCircle />
        </span>
      </ServiceButton>
    </Tooltip>
  </StyledMessagesHeader>
);

const StyledMessagesHeader = styled.header`
height: 64px;
padding: 0 20px;
display: flex;
align-items: center;
border-bottom: 1px solid rgba(29,28,29,0.13);

.channel-name {
  font-weight: 900;
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
margin-left: 4px;
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
