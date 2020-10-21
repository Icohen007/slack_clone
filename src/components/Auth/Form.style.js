import styled from 'styled-components';

export const FormContainer = styled.div`
height: 100vh;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
//background: #3f0e40;
background: url('./slack_logo.svg'), #3f0e40;

.header {
text-align: center;
font-size: 40rem;
margin-bottom: 10rem;
color: white;
background: rgba(95,21,97,0.9);
padding: 5rem 15rem;
border-radius: 10px;
box-shadow: 0 0 5px;
}

`;

export const StyledForm = styled.form`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
max-width: 500rem;
width: 100%;
padding: 20rem;
margin: 10rem;
border: rgba(0,0,0,0.3) 1px solid;
border-radius: 10px;
background: white;

.react-reveal {
width: 100%;
}

.error-label {
font-size: 12rem;
color: #c20000;
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
   color: ${({ color }) => color || 'rgba(0,160,23,1)'};
   font-size: 24px;
   text-align: center;
   text-decoration: none;
   border: 2px solid #000000;
   border-radius: 10px;
   overflow: hidden;
   transition: all 200ms ease-in-out;
   z-index: 1;
   background: white;
   cursor: pointer;
   outline: none;
   margin: 20rem auto;
   
   &:after {
      content: " ";
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ color }) => color || 'rgba(0,160,23,1)'};
      z-index: -1;
      transform: scaleX(0);
      transform-origin: 100%;
      transition: transform 200ms ease-in-out;
   }
   
   &:hover {
      color: white;
      border-color: ${({ color }) => color || 'rgba(0,160,23,1)'};
      box-shadow: 0 0 16px rgba(255, 255, 255, 0.1);
      
      &:after {
         transform: scaleX(1);
         transform-origin: 0%;
         transition: transform 200ms ease-in-out;
      }
   }
   
`;

export const ResponseText = styled.div`
color: ${({ success }) => (success ? '#1a861a' : '#ff0000')};
font-size: 20rem;
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
   margin: 20rem auto 0;
   padding: 5px 15px;
   color: #4285f4;
   font-size: 18px;
   text-align: center;
   text-decoration: none;
   border: 2px solid #4285f4;
   border-radius: 4px;
   background: white;
   cursor: pointer;
   outline: none;
   font-weight: bold;
   transition: all 0.3s;
   
   &:hover {
   color: white;
   background: #4285f4;
   }
`;
