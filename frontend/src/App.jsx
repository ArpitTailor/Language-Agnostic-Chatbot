import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { MessageSquare, ShieldAlert, GraduationCap } from 'lucide-react';
import ChatInterface from './pages/ChatInterface';
import AdminPanel from './pages/AdminPanel';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background flex flex-col font-sans">
        {/* Navigation Bar */}
        <nav className="border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
              <div className="p-2 bg-primary/10 rounded-xl">
                <GraduationCap className="w-6 h-6" />
              </div>
              CampusConnect
            </Link>
            
            <div className="flex gap-4">
              <Link to="/" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium">
                <MessageSquare className="w-4 h-4" />
                Chat
              </Link>
              <Link to="/admin" className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-muted transition-colors text-sm font-medium text-muted-foreground">
                <ShieldAlert className="w-4 h-4" />
                Admin
              </Link>
            </div>
          </div>
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 overflow-hidden relative">
          <Routes>
            <Route path="/" element={<ChatInterface />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
