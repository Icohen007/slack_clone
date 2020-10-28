import styled from 'styled-components';
import { ButtonUnstyled, centeredFlex } from '../Shared/Shared.style';

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

export {
  StyledMessagesHeader, Spacer, ParticipantButtons, ServiceButton,
};
