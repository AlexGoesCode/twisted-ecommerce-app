import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import {
  GetProfileOkResponse,
  LoginAndSignUpResponse,
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

  const login = async (email: string, password: string) => {
    console.log(`Logging in with username: ${email} and password: ${password}`);

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
        'http://localhost:5022/api/user/login',
        requestOptions
      );
      if (!response.ok) throw new Error('Failed to login');

      if (response.ok) {
        const result = (await response.json()) as LoginAndSignUpResponse;
        console.log('result :>> ', result);
        navigate('/product');
      }
    } catch (error) {}
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        // logout,
        // setError,
        // error,
        // avatarUrl,
        user,
        // getUserProfile,
        // isLoading,
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
