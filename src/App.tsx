import { Suspense } from 'react';
import { Header } from './components/Header';
import { Router } from './Router';
import styles from './app.module.css';
import { AuthProvider } from './context/AuthProvider/AuthProvider';
import { MantineProvider, createTheme, Loader } from '@mantine/core';
import '@mantine/core/styles.css';
const theme = createTheme({
  fontFamily: 'Montserrat, sans-serif',
  defaultRadius: 'md',
});

const App = () => {
  return (
    <MantineProvider theme={theme}>
      <div className={styles.app}>
        <AuthProvider>
          <Header />
          <Suspense fallback={<Loader />}>
            <Router />
          </Suspense>
        </AuthProvider>
      </div>
    </MantineProvider>
  );
};

export default App;
