import React from 'react';
import styled from 'styled-components';

const Divider = () => (
  <StyledDivider>
    <hr />
    <hr />
  </StyledDivider>
);

const StyledDivider = styled.div`
display: flex;
width: 100%;
margin: 8px 0;

hr {
    flex-grow: 1;
    border: none;
    border-top: 1px solid #d0d0d0;
    clear: both;
}
`;

export default Divider;
