import {
  useEffect, useMemo, useRef, useState,
} from 'react';

const isEmptyObject = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;

const useForm = (onSubmit, validate) => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const submittedOnceRef = useRef(false);
  const [submitting, setSubmitting] = useState(false);
  const hasErrors = useMemo(() => Object.keys(errors).length !== 0, [errors]);

  useEffect(() => {
    if (submitting && !hasErrors) {
      onSubmit(values);
      setValues({});
      submittedOnceRef.current = false;
    }
    setSubmitting(false);
  }, [submitting]);

  useEffect(() => {
    if (submittedOnceRef.current && !isEmptyObject(values)) {
      setErrors(validate(values));
    }
  }, [setErrors, values]);

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    setErrors(validate(values));
    setSubmitting(true);
    submittedOnceRef.current = true;
  };

  const handleChange = (event) => {
    event.persist();
    setValues((prevValues) => ({ ...prevValues, [event.target.name]: event.target.value }));
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
    hasErrors,
  };
};

export default useForm;
