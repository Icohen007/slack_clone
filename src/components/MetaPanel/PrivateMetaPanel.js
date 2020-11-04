import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { UserImage } from '../Shared';
import { StyledMetaPanel } from './MetaPanel.style';
import { toggleMetaPanel } from '../../features/sidebar/sidebarSlice';

const PrivateMetaPanel = () => {
  const { activeChannel } = useSelector((state) => state.channels);
  const dispatch = useDispatch();

  return (
    <StyledMetaPanel>
      <div className="header">
        <div>
          <div className="header-details">Details</div>
          <div className="header-channel-name">
            @
            {' '}
            {activeChannel.displayName}
          </div>
        </div>
        <span className="meta-panel-close" onClick={() => dispatch(toggleMetaPanel())}>
          <AiOutlineClose />
        </span>
      </div>
      <div className="content">
        <div className="profile">
          <div className="profile-image">
            <UserImage
              src={activeChannel.photoURL || '/dummy36.png'}
              alt={activeChannel.displayName || 'User name'}
            />
          </div>
          <div className="profile-name">{activeChannel.displayName || 'User name'}</div>
          <div className="profile-status">Working remotely</div>
        </div>
      </div>
    </StyledMetaPanel>
  );
};

export default PrivateMetaPanel;
