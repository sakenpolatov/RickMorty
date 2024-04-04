import { Suspense } from "react";
import { Header } from "./components/Header";
import { Router } from "./Router";
import styles from "./app.module.css";
import { AuthProvider } from "./context/AuthProvider";
import { Loading } from "./components/Loading";
import ErrorBoundary from "./utils/ErrorBoundary";
function App() {
  return (
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
  );
}

export default App;
