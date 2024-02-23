import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RootStoreProvider, useInitialRootStore } from './stores/index.ts'
const RootComponent = () => {
  const { rootStore, rehydrated } = useInitialRootStore(() => {
    console.log('Application is rehydrated and ready');
  });

  if (!rehydrated) {
    return <div>Loading...</div>; // Show a loading indicator or splash screen until rehydration is complete
  }

  return (
    <RootStoreProvider value={rootStore}>
      <App />
    </RootStoreProvider>
  );
};


ReactDOM.createRoot(document.getElementById('root')!).render(
    <RootComponent />
)
