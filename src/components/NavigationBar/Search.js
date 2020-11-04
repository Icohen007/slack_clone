import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { CgSearch } from 'react-icons/cg';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Centered, centeredFlex } from '../Shared/Shared.style';
import { setActiveChannelSearch } from '../../features/channels/channelSlice';

const Search = ({ closeSearch }) => {
  const {
    activeChannelSearch,
    activeChannel, isPrivateChannelMode,
  } = useSelector((state) => state.channels);
  const [search, setSearch] = useState(activeChannelSearch);
  const dispatch = useDispatch();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

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
        <Centered justify="flex-start" style={{ flex: 1 }}>
          <CgSearch />
          <FormContainer onSubmit={handleSubmit}>
            <Input>
              <input
                id="search"
                value={search}
                onChange={({ target }) => setSearch(target.value)}
                autoComplete="off"
                placeholder={isPrivateChannelMode ? `Search in @ ${activeChannel.displayName}` : `Search in # ${activeChannel.name}`}
                ref={inputRef}
              />
            </Input>
          </FormContainer>
        </Centered>
        <Centered>
          {search.length > 0 && <ClearText onClick={handleClear}>Clear</ClearText> }
          <span className="close-button" onClick={closeSearch}>
            <AiOutlineClose className="close-icon" />
          </span>
        </Centered>
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
justify-content: space-between;

svg {
font-size: 20px;
cursor: auto;
}

.close-icon {
cursor: pointer;
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
width: 100%;
`;

const ClearText = styled.span`
font-size: 13px;
cursor: pointer;
user-select: none;
margin: 0 4px;

&:hover {
color: #008fff;
}
`;

export default Search;
