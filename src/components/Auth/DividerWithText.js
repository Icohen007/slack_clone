import React from 'react';
import styled from 'styled-components';

const DividerWithText = ({ text }) => (
  <StyledDividerWithText>
    <hr />
    <div className="text">
      {text}
    </div>
    <hr />
  </StyledDividerWithText>
);

const StyledDividerWithText = styled.div`
display: flex;
align-items: center;
width: 100%;
margin-top: 24px;

.text {
padding: 0 20px;
font-weight: bold;
}

hr {
    flex-grow: 1;
    border: none;
    border-top: 1px solid #d0d0d0;
    clear: both;
}
`;

export default DividerWithText;
