import styled from 'styled-components';

export const FormContainer = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: url('./slack_logo.svg'), ${({ theme }) => theme.colors.purpleDark};
padding: 10px;

.header {
  width: 100%;
  max-width: 500px;
  text-align: center;
  font-size: 40px;
  margin-bottom: 10px;
  color: white;
  padding: 5px 15px;
  border-radius: 10px;
  box-shadow: 0 0 5px;
  &.login {
    background: rgba(66,133,244,0.85);
  }
    
  &.register {
    background: rgba(0, 160, 23, 0.85);
  }
}

`;

export const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
max-width: 500px;
width: 100%;
padding: 20px;
margin: 10px;
border: rgba(0,0,0,0.3) 1px solid;
border-radius: 10px;
background: white;

.react-reveal {
width: 100%;
}

.error-label {
font-size: 12px;
color: ${({ theme }) => theme.colors.redDark};
text-align: left;
width: 100%;
font-weight: bold;
}

`;

export const SubmitButton = styled.button`
   position: relative;
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   max-width: 300px;
   padding: 10px 25px;
   color: ${({ color, theme }) => color || theme.colors.greenLight};
   font-size: 24px;
   text-align: center;
   text-decoration: none;
   border: 2px solid black;
   border-radius: 10px;
   overflow: hidden;
   transition: all 200ms ease-in-out;
   z-index: 1;
   background: white;
   cursor: pointer;
   outline: none;
   margin: 20px auto;
   
   &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ color, theme }) => color || theme.colors.greenLight};
      z-index: -1;
      transform: scaleX(0);
      transform-origin: 100%;
      transition: transform 200ms ease-in-out;
   }
   
   &:hover {
      color: white;
      border-color: ${({ color, theme }) => color || theme.colors.greenLight};
      box-shadow: 0 0 16px rgba(255, 255, 255, 0.1);
      
      &:after {
         transform: scaleX(1);
         transform-origin: 0;
         transition: transform 200ms ease-in-out;
      }
   }
   
`;

export const ResponseText = styled.div`
color: ${({ success, theme }) => (success ? theme.colors.greenLight : theme.colors.redLight)};
font-size: 20px;
text-align: center;
font-weight: bold;
`;

export const StyledGoogleButton = styled.button`
   position: relative;
   display: flex;
   gap: 8px;
   justify-content: center;
   align-items: center;
   width: 100%;
   max-width: 300px;
   margin: 20px auto 0;
   padding: 5px 15px;
   color: ${({ theme }) => theme.colors.blueLight};
   font-size: 18px;
   text-align: center;
   text-decoration: none;
   border: 2px solid ${({ theme }) => theme.colors.blueLight};
   border-radius: 4px;
   background: white;
   cursor: pointer;
   outline: none;
   font-weight: bold;
   transition: all 0.3s;
   
   &:hover {
   color: white;
   background: ${({ theme }) => theme.colors.blueLight};
   }
`;
