import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setLoading, setError } from '../store/userSlice';
import { getApperUI, getApperClient } from '../services/apperService';

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.user);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Set loading state
    dispatch(setLoading(true));
    
    try {
      // Initialize ApperUI for authentication
      const ApperUI = getApperUI();
      const apperClient = getApperClient();
      
      ApperUI.setup(apperClient, {
        target: '#authentication',
        clientId: import.meta.env.VITE_APPER_PROJECT_ID,
        view: 'signup',
        onSuccess: function(user, account) {
          // Store user in Redux
          dispatch(setUser(user));
          navigate('/');
        },
        onError: function(error) {
          console.error("Registration failed:", error);
          dispatch(setError("Registration failed. Please try again."));
        }
      });
      
      ApperUI.showSignup("#authentication");
      
      // Clear loading state
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error setting up registration:", error);
      dispatch(setError("Failed to initialize registration. Please refresh the page."));
    }
    
    return () => {
      // Cleanup if needed
    };
  }, [dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-bold text-blue-600">CommUnity Hub</h1>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create a new account</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 p-2 bg-red-100 text-red-700 text-sm rounded">
              {error}
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div id="authentication" className="min-h-[400px]"></div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;