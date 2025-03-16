import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      setSuccess('Successfully logged in! Redirecting...');
      setTimeout(() => {
        navigate('/');
      }, 100);
    } catch (firebaseError) {
      setError('Failed to sign in. Please try again or contact support.');
    } finally {
      setLoading(false);
    }
  }

  const handleForgotPassword = () => {
    setResetEmail(email);
    setShowResetModal(true);
  };

  async function handleResetSubmit() {
    if (!resetEmail.trim()) {
      setError('Please enter your email to reset your password.');
      return;
    }
    try {
      setError('');
      await sendPasswordResetEmail(auth, resetEmail);
      setSuccess('Password reset email sent! Please check your inbox.');
      setShowResetModal(false);
    } catch (firebaseError) {
      setError('Failed to send password reset email: ' + firebaseError.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-800 via-blue-800 to-purple-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-2xl">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{success}</span>
          </div>
        )}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>
        <div className="flex justify-between mt-4">
          <button
            onClick={handleForgotPassword}
            className="text-sm text-primary hover:underline focus:outline-none"
          >
            Forgot Password?
          </button>
          <Link
            to="/signup"
            className="text-sm text-primary hover:underline"
          >
            Don't have an account? Sign up
          </Link>
        </div>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="bg-white rounded p-6 w-full max-w-md">
            <h3 className="text-lg font-bold mb-4">Reset Password</h3>
            <p className="mb-2">Enter your email address to receive a password reset link:</p>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Email address"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowResetModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleResetSubmit}
                className="px-4 py-2 rounded bg-primary text-white hover:bg-primary/90"
              >
                Send 
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
