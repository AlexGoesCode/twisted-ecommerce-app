const AboutUs = () => {
  return (
    <div className='flex justify-center container mx-auto mt-16 sm:mt-28 px-5 sm:px-0 md:px-16 lg:px-36 py-10 md:py-16 lg:py-20'>
      {/* container mx-auto p-20 w-3/5 mt-10 */}
      {/* container mx-auto px-4 sm:px-8 md:px-12 lg:px-20 py-10 md:py-16 lg:py-20 */}
      <div className='relative max-w-4xl bg-white opacity-95 shadow-lg rounded-2xl p-6 mt-16'>
        <h1 className='text-xl text-center font-bold mb-2 sm:mb-4'>
          Our History
        </h1>
        <section className='mb-5 sm:mb-8'>
          <p className='text-l sm:text-xl text-center'>
            Our journey began 200 years ago when a visionary named Mr. Bobble
            carved a funny figure from a piece of wood. This simple act sparked
            a revolution, and our company was born. Over the centuries, we have
            sold many BobbleHeads and we'll sell them to you as well, that's
            clear as day.
          </p>
        </section>
        <section className='mb-2 sm:mb-8'>
          <h2 className='text-xl text-center font-bold mb-2 sm:mb-4'>
            Our Values
          </h2>
          <p className='text-l sm:text-xl text-center'>
            Selling you a BobbleHead. Just pick one!
          </p>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
