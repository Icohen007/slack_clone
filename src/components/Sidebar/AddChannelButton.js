import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import AddChannelModal from './AddChannelModal';
import SidebarAddButton from './SidebarAddButton';

const AddChannelButton = () => {
  const [isModal, setModal] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setModal(true);
  };

  return (
    <>
      <SidebarAddButton onClick={handleClick}>
        <IoMdAdd />
      </SidebarAddButton>
      <AddChannelModal isModal={isModal} setModal={setModal} />
    </>
  );
};

export default AddChannelButton;
