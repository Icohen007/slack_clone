import styled from 'styled-components';
import { ButtonUnstyled, centeredFlex, headerHeight } from '../Shared/Shared.style';

const StyledMessagesHeader = styled.header`
height: ${headerHeight}px;
padding: 0 20px;
display: flex;
align-items: center;
border-bottom: 1px solid ${({ theme }) => theme.colors.borderWhite1};
background: ${({ theme }) => theme.colors.white};
color: ${({ theme }) => theme.colors.black1};

.channel-name {
  font-weight: 900;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  max-width: 400px;
  @media only screen and (max-width: 768px) {
    max-width: 170px;
  }
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
    margin-right: -4px;
    border-radius: 4px;
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.borderWhite1};
    display: inline-block;
    height: 24px;
    width: 24px;
    overflow: hidden;
}

.participant-count {
margin-left: 12px;
font-size: 13px;
font-weight: 700;
}
`;

const ServiceButton = styled(ButtonUnstyled)`
${centeredFlex};
    margin-left: 4px;
    &:hover {
    background: ${({ theme }) => theme.colors.whiteHover1};
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
