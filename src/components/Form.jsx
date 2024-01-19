import { useState } from 'react';

function submitForm(answer) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (answer.toLowerCase() === 'istanbul') {
        resolve();
      } else {
        reject(new Error('Good guess but a wrong answer.Try again!'));
      }
    }, 3000);
  });
}
// eslint-disable-next-line react/prop-types
export default function Form() {
  // visual states: empty, typing, submitting, success, error
  // const [isEmpty, setIsEmpty] = useState(true);
  // const [isTyping, setIsTyping] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isSuccess, setIsSuccess] = useState(false);
  // const [isError, setIsError] = useState(false);
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('typing');
  function handleText(e) {
    setError(null);
    setAnswer(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('submitting');
    try {
      await submitForm(answer);
      setStatus('success');
    } catch (error) {
      setStatus('typing');
      setError(error.message);
    }
  }
  if (status === 'success')
    return (
      <>
        <h1>Thats right!</h1>
      </>
    );
  return (
    <>
      <h2>City quiz</h2>
      <p>What city is located on two continents?</p>
      <form onSubmit={handleSubmit}>
        <textarea
          value={answer}
          onChange={handleText}
          disabled={status === 'submitting'}
        ></textarea>
        <br />
        <button disabled={status === 'submitting' || answer.length === 0}>
          Submit
        </button>
        {status === 'submitting' && <p>Loading...</p>}
        {error && <p className='Error'>{error}</p>}
      </form>
    </>
  );
}
