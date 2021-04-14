import React, { useRef, useState } from 'react';
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

const mainColor = 'rgba(66, 133, 244, 1)';

function validateForm(values) {
  const errors = {};

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

const Login = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [serverError, setServerError] = useState('');
  const isMobile = useMobile();
  const usersRef = db.collection('users');

  const formContainerRef = useRef(null);
  const mouseMoveListener = (e) => {
    formContainerRef.current.style.backgroundPositionX = `${-e.clientX / 3}px`;
    formContainerRef.current.style.backgroundPositionY = `${-e.clientY / 3}px`;
  };

  const signInWithEmailAndPassword = async (values) => {
    if (status === STATUS.LOADING) {
      return;
    }
    setStatus(STATUS.LOADING);
    setServerError('');
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);
    } catch (error) {
      console.error(error);
      setServerError(error.message);
      setStatus(STATUS.ERROR);
    }
  };

  const {
    values, errors, handleChange, handleSubmit,
  } = useForm(signInWithEmailAndPassword, validateForm);

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
        <h1 className="header login">
          Login
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
        <Fade bottom delay={400}>
          <InputField
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={values.email}
            error={!!errors.email}
            color={mainColor}
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
            color={mainColor}
          />
        </Fade>
        <Fade bottom when={!!errors.password}>
          <span className="error-label">{errors.password || 'error-placeholder'}</span>
        </Fade>
        <Fade bottom delay={800}>
          <SubmitButton type="submit" color={mainColor}>
            Login
            {' '}
            {status === 'loading' && <Spinner size={30} primaryColor={lightTheme.colors.purpleDark} style={{ marginLeft: 20 }} />}
          </SubmitButton>
          <span style={{ textAlign: 'center' }}>
            {'Don\'t have an account? '}
            <Link to="/register">Register</Link>
          </span>
        </Fade>
        <Fade when={status !== STATUS.IDLE} bottom>
          <>
            {status === STATUS.SUCCESS
             && <ResponseText success> Signed In successfully! </ResponseText>}
            {status === STATUS.ERROR && <ResponseText>{serverError}</ResponseText>}
          </>
        </Fade>
      </StyledForm>
      <Footer />
    </FormContainer>
  );
};

export default Login;
