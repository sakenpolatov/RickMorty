import { useAuth } from '../AuthProvider/AuthProvider';
import { useNavigate } from 'react-router-dom';
import styles from './index.module.css';
import { Button } from '@mantine/core';

export function AuthStatus() {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth.signOut(() => {
      navigate('/');
    });
  };

  if (auth.user === null || auth.user === undefined) {
    return <div className={styles.noLogged}>You are not logged in</div>;
  }

  return (
    <>
      <div className={styles.message}>
        Welcome <span className={styles.username}>{auth.user}</span>
        <Button variant="filled" onClick={handleSignOut} size="md">
          Sign out
        </Button>
      </div>
    </>
  );
}
