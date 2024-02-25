import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RootStoreProvider, useInitialRootStore } from './stores/index.ts'
import { ChakraProvider } from '@chakra-ui/react'

const RootComponent = () => {
  const { rootStore, rehydrated } = useInitialRootStore(() => {
    console.log('Application is rehydrated and ready');
  });

  if (!rehydrated) {
    return <div>Loading...</div>; // Show a loading indicator or splash screen until rehydration is complete
  }

  return (
    <ChakraProvider>
    <RootStoreProvider value={rootStore}>
      <App />
    </RootStoreProvider>
    </ChakraProvider>

  );
};


ReactDOM.createRoot(document.getElementById('root')!).render(
    <RootComponent />
)
