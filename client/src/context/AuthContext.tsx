import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {
  GetProfileOkResponse,
  LoginAndRegisterResponse,
  UserType,
} from '../types/Types';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => void;
  logout: () => void;
  setError: (error: string) => void;
  error: string | null;
  user: UserType | null;
  getUserProfile: () => void;
  isLoading: boolean;
  token: string | null; // new, is needed?
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    const urlencoded = new URLSearchParams();
    urlencoded.append('email', email);
    urlencoded.append('password', password);

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
    };

    try {
      const response = await fetch(
        'http://localhost:5022/api/users/login',
        requestOptions
      );
      if (!response.ok) throw new Error('Failed to login');

      const result = (await response.json()) as LoginAndRegisterResponse;
      console.log('result :>> ', result);

      if (!result.token) {
        alert('You need to login first');
        return;
      }

      localStorage.setItem('token', result.token);
      setToken(result.token);
      setUser(result.user);
      setIsAuthenticated(true);
      alert('**You are successfully logged in!**');
      navigate('/');
    } catch (error) {
      console.log('Login error :>> ', error);
      setError('Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('Logging out...');
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    alert('You are logged out!');
    navigate('/login');
  };

  const getUserProfile = async () => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      `Bearer ${localStorage.getItem('token')}`
    );

    const requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        'http://localhost:5022/api/users/profile',
        requestOptions
      );
      if (!response.ok && response.status === 401) {
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        navigate('/login');
        return;
      }

      const result = (await response.json()) as GetProfileOkResponse;
      console.log('result profile', result);
      setUser(result.user);
      setIsAuthenticated(true);
    } catch (error) {
      console.log('Error getting profile :>> ', error);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      getUserProfile();
    } else {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        setError,
        error,
        user,
        getUserProfile,
        isLoading,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
