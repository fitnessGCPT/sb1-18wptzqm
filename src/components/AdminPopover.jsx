import React, { useState, useEffect } from 'react';

const AdminPopover = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportStatus, setReportStatus] = useState('');

  // Check for existing session when component mounts
  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem('adminToken');
      if (token) {
        try {
          const session = JSON.parse(atob(token));
          if (session.exp > Date.now()) {
            setUser({ username: session.username, role: session.role });
          } else {
            localStorage.removeItem('adminToken');
          }
        } catch (error) {
          localStorage.removeItem('adminToken');
        }
      }
    }
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/.netlify/functions/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setUser(data.user);
        setCredentials({ username: '', password: '' });
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setUser(null);
    setReportStatus('');
  };

  const generateReport = async () => {
    if (isGenerating) return;
    
    setIsGenerating(true);
    setReportStatus('🔄 Fetching your website data from Google Search Console...');
    
    try {
      const token = localStorage.getItem('adminToken');
      
      // For now, call your existing Cloud Run endpoint
      // Later we can move this to a Netlify function too
      const response = await fetch('https://search-console-reporter-218046281466.us-central1.run.app/api/generate-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          website: 'gcpt.life',
          dateRange: 30
        })
      });

      const result = await response.json();

      if (response.ok) {
        setReportStatus(`✅ Report Generated Successfully! 📊 ${result.summary.totalClicks} clicks, ${result.summary.totalImpressions} impressions. Data saved to Airtable.`);
      } else {
        throw new Error(result.error || 'Failed to generate report');
      }
      
    } catch (error) {
      setReportStatus(`❌ Error: ${error.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleClose = () => {
    setCredentials({ username: '', password: '' });
    setError('');
    setReportStatus('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-96 max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-cyan-700">
          <h2 className="text-xl font-bold text-cyan-700">
            {user ? '📊 Admin Dashboard' : '🔐 Admin Login'}
          </h2>
          <button
            onClick={handleClose}
            className="text-cyan-700 hover:text-black text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {!user ? (
            // Login Form
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-cyan-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                  className="w-full px-3 py-2 border border-cyan-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-cyan-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full px-3 py-2 border border-cyan-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-500 text-yellow-400 py-2 px-4 rounded-lg font-medium hover:bg-blue-600 transition-colors disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          ) : (
            // Dashboard Content
            <div className="space-y-6">
              <div className="text-center">
                <div className="bg-cyan-700 text-yellow-400 px-3 py-2 rounded-lg mb-4">
                  ✅ Logged in as <strong>{user.username}</strong>
                </div>
                
                <h3 className="text-lg font-semibold text-cyan-700 mb-2">
                  Search Console Reporter
                </h3>
                <p className="text-cyan-700 text-sm mb-4">
                  Generate comprehensive SEO reports for gcpt.life
                </p>
              </div>

              {/* Generate Report Button */}
              <button
                onClick={generateReport}
                disabled={isGenerating}
                className="w-full bg-blue-500 text-yellow-400 py-3 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-200 disabled:opacity-50"
              >
                {isGenerating ? '⏳ Generating...' : '🚀 Generate Report'}
              </button>
              
              {/* Status Display */}
              {reportStatus && (
                <div className="bg-cyan-700 border border-cyan-700 p-4 rounded-lg">
                  <p className="text-sm text-yellow-400">{reportStatus}</p>
                </div>
              )}

              {/* Info */}
              <div className="text-center">
                <p className="text-xs text-cyan-700">
                  Reports are automatically saved to your Airtable base
                </p>
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPopover;
