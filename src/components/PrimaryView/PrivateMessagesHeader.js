import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { Tooltip } from 'react-tippy';
import {
  Centered, TooltipContent,
} from '../Shared/Shared.style';

import {
  ServiceButton,
  Spacer,
  StyledMessagesHeader,
} from './MessagesHeader.style';

const PrivateMessagesHeader = ({ activeChannel }) => (
  <StyledMessagesHeader>
    <Centered>
      <span className="channel-name">
        {`@ ${activeChannel.displayName}`}
      </span>
    </Centered>
    <Spacer />
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

export default PrivateMessagesHeader;
