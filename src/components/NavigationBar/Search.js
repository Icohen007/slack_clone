import React, { useState } from 'react';
import styled from 'styled-components';
import { CgSearch } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Centered, centeredFlex } from '../Shared/Shared.style';
import { setActiveChannelSearch } from '../../features/channels/channelSlice';

const Search = ({ closeSearch }) => {
  const { activeChannelSearch } = useSelector((state) => state.channels);
  const [search, setSearch] = useState(activeChannelSearch);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search.length) {
      return;
    }
    dispatch(setActiveChannelSearch(search));
    closeSearch();
  };

  const handleClear = () => {
    dispatch(setActiveChannelSearch(''));
    setSearch('');
  };

  return (
    <>
      <StyledSearch onClick={(e) => e.stopPropagation()}>
        <CgSearch />
        <FormContainer onSubmit={handleSubmit}>
          <Input>
            <input
              id="search"
              value={search}
              onChange={({ target }) => setSearch(target.value)}
              autoComplete="off"
              placeholder="Search for..."
            />
          </Input>
        </FormContainer>
        <ClearText onClick={handleClear} visible={search.length > 0}>Clear</ClearText>
        <span className="close-button" onClick={closeSearch}>
          <AiOutlineClose />
        </span>
      </StyledSearch>
    </>
  );
};

const StyledSearch = styled(Centered)`
position: absolute;
top: 0;
border-radius: 8px;
border: 2px solid ${({ theme }) => theme.colors.borderWhite1};
z-index: 100;
width: 100%;
background: ${({ theme }) => theme.colors.white};
color: ${({ theme }) => theme.colors.black1};
padding: 0 10px;

svg {
cursor: auto;
font-size: 20px;
}

.close-button {
  ${centeredFlex};
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
  background-color: ${({ theme }) => theme.colors.whiteHover2};
  }

  svg {
  font-size: 22px;
  font-weight: 900;
  }
}

`;

const Input = styled.div`
  height: 44px;
  width: 100%;

  input {
  width: 100%;
  height: 100%;
  outline: none;
  border: 0;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-size: 16px;
  padding: 0 12px 4px 12px;
  background: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.black1};
  }
`;

const FormContainer = styled.form`
height: 100%;
width: 80%;
`;

const ClearText = styled.span`
font-size: 13px;
cursor: ${({ visible }) => (visible ? 'pointer' : 'auto')};
user-select: none;
visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};

&:hover {
color: #008fff;
}
`;

export default Search;
