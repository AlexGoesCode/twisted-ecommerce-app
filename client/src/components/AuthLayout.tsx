import React from 'react';

interface AuthLayoutProps {
  title: string;
  buttonText: string;
  onButtonClick?: (event: React.FormEvent) => void; // expects an event
  children?: React.ReactNode;
  showSignupLink?: boolean; // Add this prop
  buttonClassName?: string;
}

const AuthLayout = ({ children, showSignupLink }: AuthLayoutProps) => {
  return (
    <>
      <div className='flex max-h-screen items-center justify-center lg:px-8 transform translate-y-1/4'>
        {/* <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-100'>
            {title}
          </h2>
        </div> */}

        <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
          <form
            className='space-y-6'
            onSubmit={(e) => {
              e.preventDefault(); // prevents the form from submitting
              // onButtonClick(e); // pass the event to the handler
            }}
          >
            {children}

            {/* <div>
              <button
                type='submit'
                className='flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                {buttonText}
              </button>
            </div> */}
          </form>

          {showSignupLink && (
            <p className='mt-10 text-center text-sm text-gray-100 hover:text-orange-300'>
              Not a member?{' '}
              <a
                href='./signup'
                className='font-semibold leading-6 text-gray-100 hover:text-gray-200'
              ></a>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthLayout;
