import styled from 'styled-components';
import { horizontalGap } from '../Shared/Shared.style';

export const FormContainer = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
background: url('./slack_logo.svg'), ${({ theme }) => theme.colors.purpleDark};
padding: 40px 25px;

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
  
    @media only screen and (max-width: 768px) {
    font-size: 30px;
  }
  
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
   ${horizontalGap(8)};
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

export const Footertext = styled.div`
font-size: clamp(16px, 4.25vw, 30px);
color: white;
background: #000000ba;
padding: 2px 6px;
border-radius: 15px;
position: absolute;
bottom: 20px;
display: flex;
justify-content: center;
align-items: center;
user-select: none;

& .icon {
 width: 24px;
 height: 24px;
 margin-left: 2px;
 color: rgb(97, 218, 251);
 vertical-align: middle;
 transform: scale(1) rotate(0deg);
 animation: 3s infinite react-animate ease-in-out;
 display: inline-block !important;
 
 @keyframes react-animate {
 0% {
 transform: scale(1) rotate(0deg);
 }
 
  25% {
 transform: scale(1.2) rotate(180deg);
 }
 
  50% {
 transform: scale(1) rotate(360deg);
 
 }
 
   100% {
 transform: scale(1) rotate(360deg);
 
 }
 }
}

a {
color: #ff9d27;
margin: 0 5px;
font-weight: 700;
}
`;
