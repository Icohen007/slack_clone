import styled from 'styled-components';
import { centeredFlex, headerHeight, navigationBarHeight } from '../Shared/Shared.style';

export const StyledMetaPanel = styled.section`
display: flex;
flex-direction: column;
border-radius: 6px;
border-left: 1px solid ${({ theme }) => theme.colors.borderWhite1};
background: ${({ theme }) => theme.colors.white};
color: ${({ theme }) => theme.colors.black1};

.header {
height: ${headerHeight}px;
display: flex;
align-items: center;
justify-content: space-between;
border-bottom: 1px solid ${({ theme }) => theme.colors.borderWhite1};
padding: 0 12px 0 16px;

.header-details {
font-weight: 900;
}

.header-channel-name {
font-size: 13px;
font-weight: 400;
color: ${({ theme }) => theme.colors.grayDark};
}
}

.content {
padding: 5px 12px;

height: 100%;
max-height: calc(100vh - ${navigationBarHeight}px - ${headerHeight}px);
overflow: auto;

.profile {
  ${centeredFlex};
  flex-direction: column;
  
  .profile-image {
  margin: 28px auto 0;
  width: 120px;
  height: 120px;
  }
  
  .profile-name {
  font-size: 18px;
  font-weight: 900;
  }
}

.about {
padding: 10px 0;

.about-section {
padding: 5px 0;
}
}

  .timestamp {
    color: ${({ theme }) => theme.colors.grayDark};
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
  background-color: ${({ theme }) => theme.colors.whiteHover2};
  }
  svg {
  font-size: 20px;
  }
}
`;
