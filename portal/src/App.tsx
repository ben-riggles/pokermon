import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import LandingPage from '@/components/pages/LandingPage';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LandingPage />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
