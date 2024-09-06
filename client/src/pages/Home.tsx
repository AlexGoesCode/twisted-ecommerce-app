// import { useContext } from 'react';
// import { AuthContext, useAuth } from '../context/AuthContext';

const Home = () => {
  //   const { user } = useAuth();
  //   const { user } = useContext(AuthContext);

  return (
    <div className='px-5 inset-0 z-10 flex items-center justify-center'>
      <div className='bg-white opacity-95 max-w-2xl h-auto p-10 mt-4 md:mt-32 rounded-2xl shadow-lg text-center'>
        <h1 className='text-2xl font-bold mb-4'>Welcome to BobbleHeads!</h1>
        <p className='mt-4 text-xl'>
          Finally you can take a piece of your favorite (or least favorite)
          politician with you - because who wouldn’t want a tiny, nodding
          reminder of their superiority? Whether you admire their ehm...
          selfless dedication to public service or just can’t get enough of
          their striking personalities, our collection of bobbleheads lets you
          carry that political magic everywhere you go!<br></br> Grab yours
          today and feel the touch of greatness and power !
        </p>
      </div>
    </div>
  );
};

export default Home;
