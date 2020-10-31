import React from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsLayoutTextSidebar } from 'react-icons/bs';
import { BiPhone } from 'react-icons/bi';
import { Tooltip } from 'react-tippy';
import { useDispatch } from 'react-redux';
import {
  Centered,
} from '../Shared/Shared.style';
import {
  ServiceButton,
  Spacer,
  StyledMessagesHeader,
} from './MessagesHeader.style';
import { useMobile } from '../../hooks';
import { toggleSidebar } from '../../features/sidebar/sidebarSlice';
import TooltipContent from '../Shared/TooltipContent';

const PrivateMessagesHeader = ({ activeChannel }) => {
  const isMobile = useMobile();
  const dispatch = useDispatch();

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
          {`@ ${activeChannel.displayName}`}
        </span>
      </Centered>
      <Spacer />
      <Tooltip
        position="bottom"
        arrow
        delay={100}
        html={(
          <TooltipContent notSupported>
            {`call ${activeChannel.displayName}`}
          </TooltipContent>
)}
      >
        <ServiceButton>
          <span>
            <BiPhone />
          </span>
        </ServiceButton>
      </Tooltip>
      <Tooltip
        position="bottom"
        arrow
        delay={100}
        html={<TooltipContent notSupported> Show channel details </TooltipContent>}
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

export default PrivateMessagesHeader;
