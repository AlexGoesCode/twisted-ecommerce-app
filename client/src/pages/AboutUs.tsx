const AboutUs = () => {
  return (
    <div className='container mx-auto p-20 w-3/5'>
      <div className='relative max-h-96 bg-white opacity-95 shadow-lg rounded-2xl p-6 mt-8'>
        <h1 className='text-2xl text-center font-bold mb-4'>Our History</h1>
        <section className='mb-8'>
          <p className='text-xl text-center'>
            Our journey began 200 years ago when a visionary named Mr. Bobble
            carved a funny figure from a piece of wood. This simple act sparked
            a revolution, and our company was born. Over the centuries, we have
            sold many BobbleHeads and we'll sell them to you as well, that's
            clear as day.
          </p>
        </section>
        <section className='mb-8'>
          <h2 className='text-xl text-center font-semibold mb-2'>Our Values</h2>
          <p className='text-xl text-center'>
            Selling you a BobbleHead. Just pick one!
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
