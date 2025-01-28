import React, { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Key, Lock, LogOut, Plus, Search } from 'lucide-react';
import { supabase } from './lib/supabase';
import { CredentialForm } from './components/CredentialForm';
import { encryptData, decryptData } from './lib/encryption';
import type { Credential, User } from './types';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [masterKey, setMasterKey] = useState('');
  const [showMasterKeyPrompt, setShowMasterKeyPrompt] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!
        });
        setShowMasterKeyPrompt(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email!
        });
        setShowMasterKeyPrompt(true);
      } else {
        setUser(null);
        setCredentials([]);
        setMasterKey('');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchCredentials = async () => {
    if (!user || !masterKey) return;
    
    try {
      const { data, error } = await supabase
        .from('credentials')
        .select('*')
        .eq('user_id', user.id);

      if (error) throw error;

      const decryptedCredentials = data.map(cred => ({
        ...cred,
        password: decryptData(cred.encrypted_password, masterKey)
      }));

      setCredentials(decryptedCredentials);
    } catch (error) {
      console.error('Error fetching credentials:', error);
      toast.error('Failed to fetch credentials');
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      if (error) throw error;
      toast.success('Logged in successfully');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Failed to login');
    }
  };

  const handleSignup = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password
      });
      if (error) throw error;
      toast.success('Check your email to confirm your account');
    } catch (error) {
      console.error('Signup error:', error);
      toast.error('Failed to sign up');
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout');
    }
  };

  const handleAddCredential = async (data: {
    name: string;
    username: string;
    password: string;
    description?: string;
    url?: string;
  }) => {
    if (!user || !masterKey) {
      toast.error('Please set your master key first');
      return;
    }
    
    setIsLoading(true);
    try {
      const encryptedPassword = encryptData(data.password, masterKey);
      
      const { error } = await supabase
        .from('credentials')
        .insert([{
          user_id: user.id,
          name: data.name,
          username: data.username,
          encrypted_password: encryptedPassword,
          description: data.description || null,
          url: data.url || null
        }]);

      if (error) throw error;

      toast.success('Credential saved successfully');
      setShowAddForm(false);
      fetchCredentials();
    } catch (error) {
      console.error('Error adding credential:', error);
      toast.error('Failed to save credential');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredCredentials = credentials.filter(cred =>
    cred.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cred.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (cred.description?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Key className="h-12 w-12" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            KeyYatri
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Your secure password manager
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              handleLogin(
                formData.get('email') as string,
                formData.get('password') as string
              );
            }}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  onClick={() => {
                    const email = prompt('Enter your email');
                    const password = prompt('Enter your password');
                    if (email && password) {
                      handleSignup(email, password);
                    }
                  }}
                  className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Create new account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showMasterKeyPrompt) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Lock className="h-12 w-12" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter Master Key
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            This key will be used to encrypt and decrypt your passwords
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={(e) => {
              e.preventDefault();
              if (masterKey.length < 8) {
                toast.error('Master key must be at least 8 characters long');
                return;
              }
              setShowMasterKeyPrompt(false);
              fetchCredentials();
            }} className="space-y-6">
              <div>
                <label htmlFor="masterKey" className="block text-sm font-medium text-gray-700">
                  Master Key
                </label>
                <div className="mt-1">
                  <input
                    id="masterKey"
                    type="password"
                    required
                    minLength={8}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                    value={masterKey}
                    onChange={(e) => setMasterKey(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Key className="h-8 w-8" />
              <h1 className="ml-2 text-2xl font-bold">KeyYatri</h1>
            </div>
            <div className="flex items-center">
              <span className="mr-4 text-gray-600">{user.email}</span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="flex justify-between items-center mb-6">
            <div className="relative flex-1 max-w-xs">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                placeholder="Search credentials..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="ml-3 inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New
            </button>
          </div>

          {showAddForm && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-lg p-6 max-w-md w-full">
                <h2 className="text-lg font-medium mb-4">Add New Credential</h2>
                <CredentialForm
                  onSubmit={handleAddCredential}
                  isLoading={isLoading}
                />
                <button
                  onClick={() => setShowAddForm(false)}
                  className="mt-4 w-full inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredCredentials.map((credential) => (
                <li key={credential.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 truncate">
                          {credential.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-500">
                          {credential.username}
                        </p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(credential.password);
                            toast.success('Password copied to clipboard');
                            // Clear clipboard after 30 seconds
                            setTimeout(() => {
                              navigator.clipboard.writeText('');
                            }, 30000);
                          }}
                          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                          Copy Password
                        </button>
                      </div>
                    </div>
                    {credential.description && (
                      <p className="mt-2 text-sm text-gray-500">
                        {credential.description}
                      </p>
                    )}
                    {credential.url && (
                      <a
                        href={credential.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-block text-sm text-gray-600 hover:text-gray-900"
                      >
                        {credential.url}
                      </a>
                    )}
                  </div>
                </li>
              ))}
              {filteredCredentials.length === 0 && (
                <li className="px-4 py-8 text-center text-gray-500">
                  No credentials found. Add your first one!
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;