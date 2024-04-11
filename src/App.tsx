import { Suspense } from 'react';
import { Header } from './components/Header/index';
import { Router } from './Router/index';
import styles from './app.module.css';
import { AuthProvider } from './context/AuthProvider';
import { Loading } from './components/Loading/index';
import ErrorBoundary from './components/ErrorBoundary/index';
import { MantineProvider, createTheme } from '@mantine/core';
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
          <ErrorBoundary>
            <Suspense fallback={<Loading />}>
              <Router />
            </Suspense>
          </ErrorBoundary>
        </AuthProvider>
      </div>
    </MantineProvider>
  );
};

export default App;
