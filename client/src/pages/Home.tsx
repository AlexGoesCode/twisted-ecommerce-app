// import { useContext } from 'react';
// import { AuthContext, useAuth } from '../context/AuthContext';

const Home = () => {
  //   const { user } = useAuth();
  //   const { user } = useContext(AuthContext);

  return (
    <div className='relative inset-0 z-10 flex items-center justify-center'>
      <div className='bg-white max-w-2xl h-auto p-10 mt-40 rounded-2xl shadow-lg text-center'>
        <h1 className='text-2xl font-bold mb-4'>Welcome to BobbleHeads!</h1>
        <p className='mt-4 text-xl'>Our online store has a great selection.</p>
      </div>
    </div>
  );
};

export default Home;
