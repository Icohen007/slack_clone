import React from 'react';
import styled from 'styled-components';
import { lightTheme } from '../../theme';

const StyledInputField = styled.div`
  width: 100%;
  height: 54px;
  position: relative;
  overflow: hidden;
  margin-top: 20px;
  input {
    width: 100%;
    height: 100%;
    color: black;
    padding-top: 12.8px;
    border: none;
    outline: none;
    font-family: Roboto, sans-serif;
    font-size: 16px;
    background: transparent;
    &.not-empty + .label-name .placeholder-name,
    &:focus + .label-name .placeholder-name
    {
      transform: translateY(-150%);
      font-size: 14px;
      color: ${({ color, theme }) => color || theme.colors.greenLight};
    }
    &:focus + .label-name:after,
    &.error + .label-name:after,
    &.not-empty + .label-name:after {
    transform: translateX(0%);
    }
    
    &.error + .label-name .placeholder-name  {
      transform: translateY(-150%);
      font-size: 14px;
      color: ${({ theme }) => theme.colors.redLight};
    }
    
  }
  .label-name {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-bottom: 1px solid black;
    pointer-events: none;
    font-family: Roboto, sans-serif;
    color: ${lightTheme.colors.grayDark};
    &:after {
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;
      border-bottom: 3px solid ${({ color, theme }) => color || theme.colors.greenLight};
      left: 0;
      bottom: -1px;
      transform: translateX(-100%);
      transition: all 0.3s ease;
    }
    &.error:after{
          border-bottom: 3px solid ${({ theme }) => theme.colors.redLight};
    }
  }
  .placeholder-name {
    position: absolute;
    bottom: 5px;
    left: 0;
    transition: all 0.3s ease;
    font-family: Roboto, sans-serif;
    color: #898989;
  }
`;

const InputField = ({
  type = 'text', name, placeholder, onChange, value = '', error, color,
}) => (
  <StyledInputField color={color}>
    <input
      name={name}
      type={type}
      onChange={onChange}
      value={value}
      className={`${value ? 'not-empty' : ''} ${error ? 'error' : ''}`}
      autoComplete="off"
    />
    <label htmlFor={name} className={`label-name ${error ? 'error' : ''}`}>
      <span className="placeholder-name">{placeholder}</span>
    </label>
  </StyledInputField>
);

export default InputField;
