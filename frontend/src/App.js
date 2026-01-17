import { useEffect } from "react";
import "@/App.css";

function App() {
  useEffect(() => {
    // Redirect to the static HTML site
    window.location.href = "/index.html";
  }, []);

  return (
    <div className="App" style={{ 
      minHeight: '100vh', 
      background: '#000', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center' 
    }}>
      <p style={{ 
        fontFamily: 'JetBrains Mono, monospace', 
        fontSize: '0.75rem', 
        letterSpacing: '0.5em', 
        color: '#fff' 
      }}>
        a carregar
      </p>
    </div>
  );
}

export default App;
