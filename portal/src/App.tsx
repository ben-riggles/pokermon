import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import './App.css';
import LandingPage from '@/components/pages/LandingPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <LandingPage />
    </QueryClientProvider>
  );
}

export default App;
