import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./AppRouter";

function App() {
  const client = new QueryClient();
  return (
    <>
      <QueryClientProvider client={client}>
        <AppRouter></AppRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
