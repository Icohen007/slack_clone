import React, { useRef, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Fade from 'react-reveal/Fade';
import { Link } from 'react-router-dom';
import InputField from './InputField';
import { useForm } from '../../hooks';
import { auth, firebase } from '../../firebase';
import {
  FormContainer,
  ResponseText,
  StyledForm,
  StyledGoogleButton,
  SubmitButton,
} from './Form.style';
import DividerWithText from './DividerWithText';
import validateForm from './validateForm';
import { STATUS } from '../consts';

const mainColor = 'rgba(66, 133, 244, 1)';

const Login = () => {
  const [status, setStatus] = useState(STATUS.IDLE);
  const [serverError, setServerError] = useState('');

  const formContainerRef = useRef(null);
  const mouseMoveListener = (e) => {
    formContainerRef.current.style.backgroundPositionX = `${-e.clientX / 3}px`;
    formContainerRef.current.style.backgroundPositionY = `${-e.clientY / 3}px`;
  };

  const onSubmit = async (values) => {
    if (status === STATUS.LOADING) {
      return;
    }
    setStatus(STATUS.LOADING);
    setServerError('');
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      setStatus(STATUS.SUCCESS);
    } catch (error) {
      console.log(error);
      setServerError(error.message);
      setStatus(STATUS.ERROR);
    }
  };
  const {
    values, errors, handleChange, handleSubmit,
  } = useForm(onSubmit, validateForm);

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithRedirect(provider);
    } catch (error) {
      console.log(error);
      setServerError(error.message);
      setStatus(STATUS.ERROR);
    }
  };

  return (
    <FormContainer ref={formContainerRef} onMouseMove={mouseMoveListener}>
      <Fade bottom>
        <h1 className="header">
          Login
          {' </>'}
        </h1>
      </Fade>
      <StyledForm onSubmit={handleSubmit} onMouseMove={(e) => e.stopPropagation()}>
        <Fade bottom delay={200}>
          <StyledGoogleButton type="button" onClick={signInWithGoogle}>
            <FcGoogle size="24rem" />
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
            {status === 'loading' && <FaSpinner className="fa-spin" size="26rem" style={{ marginLeft: '20rem' }} />}
          </SubmitButton>
          <span style={{ textAlign: 'center' }}>
            {'Don\'t have an account? '}
            <Link to="/register">Register</Link>
          </span>
        </Fade>
        <Fade when={status !== STATUS.IDLE} bottom>
          <>
            {status === STATUS.SUCCESS && <ResponseText success> Registered successfully! </ResponseText>}
            {status === STATUS.ERROR && <ResponseText>{serverError}</ResponseText>}
          </>
        </Fade>
      </StyledForm>
    </FormContainer>
  );
};

export default Login;
