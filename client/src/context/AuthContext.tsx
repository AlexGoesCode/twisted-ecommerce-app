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
  // avatarUrl: string;
  // updateUserAvatar: (url: string) => void;
  // token: string | null;
  getUserProfile: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

//* AuthProvider component that wraps the entire application and provides the authentication context
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [avatarUrl, setAvatarUrl] = useState('');

  const login = async (email: string, password: string) => {
    // console.log(`Logging in with username: ${email} and password: ${password}`);

    //* Headers make sure the content type is set to form data
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
      // localStorage.setItem('user', JSON.stringify(result.user)); //we get our user either from the DB or from local state variable
      setIsLoading(false);
      setUser(result.user);
      setIsAuthenticated(true);
      navigate('/');
    } catch (error) {
      console.log('error :>> ', error);
      setIsLoading(false);
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
        setIsLoading(false);
        setIsAuthenticated(false);
        navigate('/login');
        return;
      }
      const result = (await response.json()) as GetProfileOkResponse;
      console.log('result profile', result);
      setIsLoading(false);
      setUser(result.user);
    } catch (error) {
      console.log('error getting profile :>> ', error);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      getUserProfile();
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
      alert('you need to login first');
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        logout,
        setError,
        error,
        // avatarUrl,
        user,
        getUserProfile,
        isLoading,
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
