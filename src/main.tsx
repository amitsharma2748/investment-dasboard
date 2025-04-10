
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'
import { ChakraProvider  } from '@chakra-ui/react' 
import { SnackbarProvider } from 'notistack'

// Import i18n configuration
import './i18n.ts';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <SnackbarProvider>
        <ChakraProvider >
          <App />
        </ChakraProvider>
      </SnackbarProvider>
    </Provider>
  </BrowserRouter>,
)
