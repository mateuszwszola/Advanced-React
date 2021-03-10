import isEqual from 'lodash.isequal';
import { useState, useEffect, useRef } from 'react';

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);
  const previousInitialDataRef = useRef(initial);

  useEffect(() => {
    if (!isEqual(previousInitialDataRef.current, initial)) {
      setInputs(initial);
    }

    previousInitialDataRef.current = initial;
  }, [initial]);

  function handleChange(e) {
    let { type, name, value } = e.target;

    if (type === 'number') {
      value = parseInt(value);
    }

    if (type === 'file') {
      [value] = e.target.files;
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ''])
    );

    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
