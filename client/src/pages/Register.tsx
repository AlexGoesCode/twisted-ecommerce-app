import { useState } from 'react';
import AuthLayout from '../components/AuthLayout';
import { useAuth } from '../context/AuthContext';
import { LoginAndRegisterResponse } from '../types/Types';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarName, setAvatarName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { error, setError } = useAuth();
  const navigate = useNavigate();

  // handles file upload and it's name
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setAvatar(file);
      setAvatarName(file.name);
    }
  };

  //* Register user function
  const handleRegister = async () => {
    console.log('username :>> ', username, password);

    // checks email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }
    // checks passwords match and lenght
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    console.log(
      `Registering with username: ${username} and email ${email} and password: ${password}`
    );

    // populate method - prepares form data for submission
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('name', username);
    if (avatar) {
      formData.append('avatar', avatar);
    }

    const requestOptions: RequestInit = {
      method: 'POST',
      body: formData,
      // headers: myHeaders,
      redirect: 'follow',
    };

    try {
      const response = await fetch(
        'http://localhost:5022/api/users/register',
        requestOptions
      );
      if (!response.ok) {
        const errorResult = await response.json();
        setError(errorResult.message || 'An error has occured.');
        return;
      }
      const result = (await response.json()) as LoginAndRegisterResponse;
      console.log('result :>> ', result);
      navigate('/login');
    } catch (error) {
      console.error(error);
      setError('An error has occured during register.');
    }
  };

  return (
    <AuthLayout
      title='Register a new account'
      buttonText='Register'
      onButtonClick={handleRegister}
    >
      <div className='bg-gray-100 bg-opacity-95 p-6 rounded-2xl shadow-md'>
        <h2 className='text-mirage text-center text-xl font-semibold mb-4'>
          Register a new account
        </h2>
        <div className='border border-tuscany p-4 rounded-md'>
          <label
            htmlFor='username'
            className='block text-sm font-medium leading-6 text-mirage'
          >
            User Name
          </label>
          <div className='mt-2'>
            <input
              id='username'
              name='username'
              type='text'
              autoComplete='username'
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-tuscany sm:text-sm sm:leading-6'
            />
          </div>
          <label
            htmlFor='email'
            className='block text-sm font-medium leading-6 text-mirage mt-4'
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
              autoComplete='new-password'
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-tuscany sm:text-sm sm:leading-6'
            />
          </div>
          <div className='mt-4'>
            <input
              id='file'
              name='file'
              type='file'
              className='block w-full rounded-md border-0 py-1.5 text-mirage shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-tuscany sm:text-sm sm:leading-6'
              onChange={handleFileChange}
            />
            {avatarName && <p>{avatarName} uploaded</p>}
          </div>
          <label
            htmlFor='confirm-password'
            className='block text-sm font-medium leading-6 text-mirage mt-4'
          >
            Confirm Password
          </label>
          <div className='mt-2'>
            <input
              id='confirm-password'
              name='confirm-password'
              type='password'
              autoComplete='new-password'
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-900 focus:ring-2 focus:ring-inset focus:ring-tuscany sm:text-sm sm:leading-6'
            />
          </div>
          {error && <div className='text-red-500 text-sm mt-4'>{error}</div>}
        </div>
        <button
          onClick={handleRegister}
          className='mt-4 bg-tuscany text-white py-2 px-4 rounded-md shadow-sm hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-tuscany'
        >
          Register
        </button>
      </div>
    </AuthLayout>
  );
};

export default Register;
