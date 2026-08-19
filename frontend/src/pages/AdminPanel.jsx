import React, { useState } from 'react';
import { Upload, FileText, Settings, BarChart3, Database } from 'lucide-react';

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('documents');

  return (
    <div className="flex h-[calc(100vh-4rem)] max-w-7xl mx-auto p-4 gap-6">
      
      {/* Sidebar Navigation */}
      <div className="w-64 bg-white border rounded-2xl p-4 shadow-sm flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-3">
          Admin Dashboard
        </h2>
        
        <button 
          onClick={() => setActiveTab('documents')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'documents' ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-muted text-foreground'}`}
        >
          <FileText className="w-5 h-5" />
          <span className="font-medium text-sm">Documents & Circulars</span>
        </button>

        <button 
          onClick={() => setActiveTab('knowledge')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'knowledge' ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-muted text-foreground'}`}
        >
          <Database className="w-5 h-5" />
          <span className="font-medium text-sm">FAQs & Deadlines</span>
        </button>

        <button 
          onClick={() => setActiveTab('analytics')}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeTab === 'analytics' ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-muted text-foreground'}`}
        >
          <BarChart3 className="w-5 h-5" />
          <span className="font-medium text-sm">Chat Analytics</span>
        </button>

        <div className="mt-auto">
          <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-muted transition-all text-foreground w-full">
            <Settings className="w-5 h-5" />
            <span className="font-medium text-sm">Settings</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white border rounded-2xl p-6 shadow-sm overflow-y-auto">
        
        {activeTab === 'documents' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Manage Documents</h1>
              <p className="text-muted-foreground mt-1">Upload college circulars, syllabus PDFs, and notices for the chatbot to learn from.</p>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-primary/30 bg-primary/5 rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-colors hover:bg-primary/10 hover:border-primary/50 cursor-pointer">
              <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                <Upload className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Click or drag PDF files here</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                The AI will automatically extract text, generate embeddings, and index the content in ChromaDB for instant answers.
              </p>
            </div>

            {/* Uploaded Documents List */}
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Indexed Documents</h3>
              <div className="border rounded-xl divide-y">
                {[
                  { name: "Academic_Calendar_2026.pdf", date: "Aug 15, 2026", status: "Indexed" },
                  { name: "Fee_Structure_CS_Dept.pdf", date: "Aug 10, 2026", status: "Indexed" },
                  { name: "Midterm_Exam_Schedule.pdf", date: "Aug 18, 2026", status: "Processing" },
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-blue-500" />
                      <div>
                        <p className="font-medium text-sm">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">Uploaded on {doc.date}</p>
                      </div>
                    </div>
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                      doc.status === 'Indexed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                      {doc.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'knowledge' && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Structured Data Management UI (coming soon)
          </div>
        )}
        
        {activeTab === 'analytics' && (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            Chatbot Analytics Dashboard (coming soon)
          </div>
        )}

      </div>
    </div>
  );
};

export default AdminPanel;
