import { ChangeEvent, useState, FormEvent } from 'react';
import styles from './index.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider/AuthProvider';
import { validateInput } from './../../utils/validate';
import { ErrorMessage } from '../../constants/errorMessages';
import { Button, Input, CloseButton } from '@mantine/core';
import { IconAt } from '@tabler/icons-react';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const [username, setUsername] = useState<string>('');
  const [error, setError] = useState<string>('');

  const from = location.state?.from || '/';

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateInput(username)) {
      setError(ErrorMessage.validateMessage);
      return;
    }

    auth.signIn(username, () => {
      navigate(from, { replace: true });
    });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setUsername(value);

    if (value.trim() === '') {
      setError('');
    } else if (!validateInput(value)) {
      setError(ErrorMessage.validateMessage);
    } else {
      setError('');
    }
  };

  const handleInputClear = () => {
    if (username.trim() !== '') {
      setUsername('');
    }
    console.log('clicked');
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleSubmit}>
        <div className={styles.loginLabel}>
          <Input
            placeholder="Your username"
            leftSection={<IconAt size={24} />}
            type="text"
            radius="5"
            size="md"
            name="username"
            value={username}
            onChange={handleInputChange}
            rightSection={
              <CloseButton
                onClick={handleInputClear}
                style={{ display: username !== '' ? undefined : 'none' }}
              >
                {console.log('Button is visible')}
              </CloseButton>
            }
          />
        </div>
        <div className={styles.buttonContainer}>
          <Button variant="filled" size="md" type="submit" disabled={!!error}>
            Sign In
          </Button>
        </div>
      </form>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
