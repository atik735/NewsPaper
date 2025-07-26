import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import { router } from './Routes/Routes.jsx'
import AuthProvider from './contexts/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast';

import {  QueryClient,  QueryClientProvider} from '@tanstack/react-query'
//creaate a client
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position='top-right' reverseOrder={false} />
    </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
