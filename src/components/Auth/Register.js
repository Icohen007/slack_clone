import React, { useRef, useState } from 'react';
import md5 from 'md5';
import { FcGoogle } from 'react-icons/fc';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import InputField from './InputField';
import { useForm, useMobile } from '../../hooks';
import { auth, db, firebase } from '../../firebaseConfig';
import {
  FormContainer,
  ResponseText,
  StyledForm,
  StyledGoogleButton,
  SubmitButton,
} from './Form.style';
import DividerWithText from './DividerWithText';
import { STATUS } from './consts';
import Spinner from '../Shared/Spinner';
import { lightTheme } from '../../theme';
import { updateUserCollection } from '../../lib/firebaseUtils';
import Footer from './Footer';

function validateForm(values) {
  const errors = {};

  if (!values.displayName) {
    errors.displayName = 'Display Name is required';
  } else if (values.displayName.length > 20) {
    errors.displayName = 'Display Name should be shorter than 20 letters';
  }

  if (!values.email) {
    errors.email = 'Email is required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Email address is invalid';
  }

  if (!values.password) {
    errors.password = 'Password is required';
  } else if (values.password.length < 6) {
    errors.password = 'Password length should be greater than 6';
  }

  return errors;
}

const Register = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [serverError, setServerError] = useState('');
  const isMobile = useMobile();
  const usersRef = db.collection('users');

  const formContainerRef = useRef(null);
  const mouseMoveListener = (e) => {
    formContainerRef.current.style.backgroundPositionX = `${-e.clientX / 3}px`;
    formContainerRef.current.style.backgroundPositionY = `${-e.clientY / 3}px`;
  };

  const signUpWithEmailAndPassword = async (values) => {
    if (status === STATUS.LOADING) {
      return;
    }
    setStatus(STATUS.LOADING);
    setServerError('');
    try {
      const createdUser = await auth.createUserWithEmailAndPassword(values.email, values.password);
      await createdUser.user.updateProfile({
        displayName: values.displayName,
        photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`,
      });
      await updateUserCollection(usersRef, createdUser.user);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      console.error(error);
      setServerError(error.message);
      setStatus(STATUS.ERROR);
    }
  };

  const {
    values, errors, handleChange, handleSubmit,
  } = useForm(signUpWithEmailAndPassword, validateForm);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const createdUser = await auth.signInWithPopup(provider);
      await updateUserCollection(usersRef, createdUser.user);
    } catch (error) {
      console.error(error);
      setServerError(error.message);
      setStatus(STATUS.ERROR);
    }
  };

  return (
    <FormContainer ref={formContainerRef} onMouseMove={!isMobile && mouseMoveListener}>
      <Fade bottom>
        <h1 className="header register">
          Registration
          {' </>'}
        </h1>
      </Fade>
      <StyledForm onSubmit={handleSubmit} onMouseMove={(e) => e.stopPropagation()}>
        <Fade bottom delay={200}>
          <StyledGoogleButton type="button" onClick={signInWithGoogle}>
            <FcGoogle size="24px" />
            <span>Continue with Google</span>
          </StyledGoogleButton>
        </Fade>
        <DividerWithText text="OR" />
        <Fade bottom delay={300}>
          <InputField
            name="displayName"
            placeholder="Display Name"
            onChange={handleChange}
            value={values.displayName}
            error={!!errors.displayName}
          />
        </Fade>
        <Fade bottom when={!!errors.displayName}>
          <span className="error-label">{errors.displayName || 'error-placeholder'}</span>
        </Fade>
        <Fade bottom delay={400}>
          <InputField
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={values.email}
            error={!!errors.email}
          />
        </Fade>
        <Fade bottom when={!!errors.email}>
          <span className="error-label">{errors.email || 'error-placeholder'}</span>
        </Fade>
        <Fade bottom delay={600}>
          <InputField
            name="password"
            type="password"
            placeholder="Password"
            onChange={handleChange}
            value={values.password}
            error={!!errors.password}
          />
        </Fade>
        <Fade bottom when={!!errors.password}>
          <span className="error-label">{errors.password || 'error-placeholder'}</span>
        </Fade>
        <Fade bottom delay={800}>
          <SubmitButton type="submit">
            Sign Up
            {' '}
            {status === 'loading' && <Spinner size={30} primaryColor={lightTheme.colors.purpleDark} style={{ marginLeft: 20 }} />}
          </SubmitButton>
          <span style={{ textAlign: 'center' }}>
            Already have an account?
            {' '}
            <Link to="/login">Login</Link>
          </span>
        </Fade>
        <Fade when={status !== STATUS.IDLE} bottom>
          <>
            {status === STATUS.SUCCESS
             && <ResponseText success>Register successfully!</ResponseText>}
            {status === STATUS.ERROR
             && <ResponseText>{serverError}</ResponseText>}
          </>
        </Fade>
      </StyledForm>
      <Footer />
    </FormContainer>
  );
};

export default Register;
