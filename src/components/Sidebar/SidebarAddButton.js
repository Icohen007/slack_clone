import styled from 'styled-components';
import { AccordionButton, centeredFlex } from '../Shared/Shared.style';

const SidebarAddButton = styled(AccordionButton)`
  ${centeredFlex};
  margin-left: auto;
  color: ${({ theme }) => theme.colors.purpleLight};
  padding: 2px;
  display: none;
  
  svg {
  font-size: 20px;
  }
`;

export default SidebarAddButton;
