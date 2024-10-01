import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Weather from "../src/pages/weather/weather.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="app">
        <Weather />
      </div>
    </QueryClientProvider>
  );
}

export default App;
