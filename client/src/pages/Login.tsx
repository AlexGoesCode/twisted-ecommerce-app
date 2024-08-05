import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { error, setError } = useAuth();
  const navigate = useNavigate();

  //* Login user function
  const handleLogin = async () => {
    console.log('email :>> ', email, password);

    // checks email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    console.log(`Logging in with email: ${email} and password: ${password}`);

    const formData = new URLSearchParams(); // URLSearchParams: find in postman
    formData.append('email', email);
    formData.append('password', password);

    const requestOptions: RequestInit = {
      method: 'POST',
      body: formData,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'http://localhost:5022/api/users/login',
        requestOptions
      );
      if (!response.ok) {
        const errorResult = await response.json();
        setError(errorResult.message || 'An error has occured.');
        return;
      }
      const result = await response.json();
      console.log('result :>> ', result);
      navigate('/dashboard'); // Redirect to a dashboard or homepage after login
    } catch (error) {
      console.error(error);
      setError('An error has occured during login.');
    }
  };

  return (
    <AuthLayout
      title='Login to your account'
      buttonText='Login'
      onButtonClick={handleLogin}
    >
      <div className='bg-gray-100 bg-opacity-95 p-6 rounded-2xl shadow-md'>
        <h2 className='text-mirage text-xl text-center font-semibold mb-4'>
          Login to your account
        </h2>
        <div className='border border-tuscany p-4 rounded-md'>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-mirage'
          >
            Email address
          </label>
          <div className='mt-2'>
            <input
              id='email'
              name='email'
              type='email'
              autoComplete='email'
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-tuscany sm:text-sm sm:leading-6'
            />
          </div>
          <label
            htmlFor='password'
            className='block text-sm font-medium leading-6 text-mirage mt-4'
          >
            Password
          </label>
          <div className='mt-2'>
            <input
              id='password'
              name='password'
              type='password'
              autoComplete='current-password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-tuscany sm:text-sm sm:leading-6'
            />
          </div>
          {error && <div className='text-red-500 text-sm mt-4'>{error}</div>}
        </div>
        <button
          onClick={handleLogin}
          className='mt-4 bg-tuscany text-white object-center py-2 px-4 rounded-md shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-tuscany'
        >
          Login
        </button>
      </div>
    </AuthLayout>
  );
};

export default Login;
