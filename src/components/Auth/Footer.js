import React from 'react';
import { Footertext } from './Form.style';
import { StyledImage } from '../Shared/UserImage';

const Footer = () => (
  <Footertext>
    <div>
      © Made by
      {' '}
      <a
        href="https://github.com/Icohen007"
        target="_blank"
        title="GitHub"
        rel="noopener noreferrer"
      >
        Itamar Cohen
      </a>
      {' '}
      with React.js
      {' '}
      <StyledImage src="/react-icon.svg" className="icon" />
    </div>
  </Footertext>
);

export default Footer;
