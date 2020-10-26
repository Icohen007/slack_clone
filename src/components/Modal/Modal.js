import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';
import { centeredFlex } from '../Shared/Shared.style';

const Modal = ({
  isVisible = false, title, content, footer, onClose,
}) => {
  const keydownHandler = ({ key }) => {
    if (key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

  if (!isVisible) {
    return null;
  }

  return ReactDOM.createPortal(
    <StyledModal onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h1 className="modal-title">{title}</h1>
          <span className="modal-close" onClick={onClose}>
            <AiOutlineClose />
          </span>
        </div>
        <div className="modal-body">
          <div className="modal-content">{content}</div>
        </div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </StyledModal>, document.getElementById('modal-root'),
  );
};

const StyledModal = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.25);
  animation-name: appear;
  animation-duration: 300ms;

.modal-dialog {
  width: 100%;
  max-width: 550px;
  background: white;
  position: relative;
  margin: 0 20px;
  border-radius: 8px;
  max-height: calc(100vh - 40px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  animation-name: slide-in;
  animation-duration: 0.5s;
}

.modal-header,
.modal-footer {
  display: flex;
  align-items: center;
  padding: 20px 28px;
}
.modal-header {
  justify-content: space-between;
}
.modal-footer {
  justify-content: flex-end;
}
.modal-close {
  ${centeredFlex};
  cursor: pointer;
  padding: 6px;
  border-radius: 6px;
  transition: all 0.2s;
  
  &:hover {
  background-color: rgba(0,0,0, 0.07);
  }
  svg {
  font-size: 20px;
  }
}
.modal-body {
  overflow: auto;
}
.modal-content {
  padding: 0 28px;
}

.modal-title {
font-size: 28px;
}

@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes slide-in {
  from {
    transform: translateY(-150px);
  }
  to {
    transform: translateY(0);
  }
}
`;

export default Modal;
