import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    html {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      height: 100%;
      width: 100%;
      font-family: 'Lato', sans-serif !important;
      font-size: 16px;;
      scroll-behavior: smooth;
    }
    
    *, *:before, *:after {
      box-sizing: inherit;
    }
    
    * {
     font-family: inherit;
    }
    
    body {
      font-family: 'Lato', sans-serif !important;
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      height: 100%;
      width: 100%;
      line-height: 1.5;
      margin: 0;
      padding: 0;
    }
    
    h1, h2, h3 , h4 ,h5 ,h6 {
    margin: 0;
    }
    
    a, a:hover, a:focus, a:active  {
    text-decoration: none !important;
    }
    
    
    .tippy-tooltip.tippy-tooltip--regular.dark-theme{
    background-color: black !important;
    padding: 4px 8px !important;
    }
`;

export default GlobalStyle;
