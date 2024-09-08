// import { useContext } from 'react';
// import { AuthContext, useAuth } from '../context/AuthContext';

const Home = () => {
  //   const { user } = useAuth();
  //   const { user } = useContext(AuthContext);

  return (
    <div className='flex justify-center container mx-auto mt-16 sm:mt-28 px-5 sm:px-0 md:px-16 lg:px-36 py-10 md:py-16 lg:py-20'>
      <div className='relative max-w-4xl bg-white opacity-95 shadow-lg rounded-2xl p-6 mt-16'>
        <h1 className='text-xl text-center font-bold mb-2 sm:mb-4'>
          Welcome to BobbleHeads!
        </h1>
        <section className='mb-5 sm:mb-8'>
          <p className='text-l sm:text-xl text-center'>
            Finally you can take a piece of your favorite (or least favorite)
            politician with you - because who wouldn’t want a tiny, nodding
            reminder of their superiority? Whether you admire their ehm...
            selfless dedication to public service or just can’t get enough of
            their striking personalities, our collection of bobbleheads lets you
            carry that political magic everywhere you go!<br></br> Grab yours
            today and feel the touch of greatness and power!
          </p>
        </section>
      </div>
    </div>
  );
};

export default Home;
