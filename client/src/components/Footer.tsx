import { useState, useEffect, useRef } from 'react';
import { MapIcon, PhoneIcon } from '@heroicons/react/20/solid';

export default function Footer() {
  const [footerVisible, setFooterVisible] = useState(false);
  const footerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      footerRef.current &&
      !footerRef.current.contains(event.target as Node)
    ) {
      setFooterVisible(false);
    }
  };

  useEffect(() => {
    if (footerVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [footerVisible]);

  return (
    <>
      {/* Tab to show footer */}
      <div
        className={`fixed bottom-0 w-full bg-gray-300 text-center py-1 cursor-pointer ${
          footerVisible ? 'hidden' : 'block'
        }`}
        onClick={() => setFooterVisible(true)}
      >
        <span className='text-sm text-center text-gray-700'>Show Footer</span>
      </div>

      <div
        ref={footerRef}
        className={`fixed bottom-0 left-0 w-full transition-transform duration-500 ${
          footerVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <footer className='bg-gray-100 bg-opacity-95 w-screen mx-0'>
          <div className='mx-auto max-w-7xl px-6 py-2 lg:px-8'>
            <div className='flex flex-col sm:flex-row justify-between items-center'>
              {/* Mobile View */}
              <div className='block sm:hidden'>
                <h3 className='text-sm font-semibold leading-6 text-gray-900'>
                  BobbleHeads ltd
                </h3>
                <ul className='mt-1 space-y-1'>
                  <li>
                    <a
                      href='mailto:our-email@example.com'
                      className='text-sm leading-6 text-gray-600 hover:text-gray-900'
                    >
                      About Us
                    </a>
                  </li>
                  <li className='flex items-center space-x-2'>
                    <PhoneIcon className='h-5 w-5 text-gray-600' />
                    <span className='text-sm leading-6 text-gray-600'>
                      +1 (555) 123-4567
                    </span>
                  </li>
                  <li className='flex items-center space-x-2'>
                    <MapIcon className='h-5 w-5 text-gray-600' />
                    <a
                      href='mailto:support@bobbleheads.com'
                      className='text-sm leading-6 text-gray-600 hover:text-gray-900'
                    >
                      E-mail
                    </a>
                  </li>
                </ul>
              </div>

              {/* Desktop View */}
              <div className='hidden sm:flex justify-between w-full'>
                <div>
                  <h3 className='text-sm font-semibold leading-6 text-gray-900'>
                    BobbleHeads ltd
                  </h3>
                  <ul className='mt-1 space-y-1'>
                    <li>
                      <a
                        href='mailto:our-email@example.com'
                        className='text-sm leading-6 text-gray-600 hover:text-gray-900'
                      >
                        About Us
                      </a>
                    </li>
                    <li>
                      <a
                        href='#'
                        className='text-sm leading-6 text-gray-600 hover:text-gray-900'
                      >
                        Careers
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className='text-sm font-semibold leading-6 text-gray-900'>
                    Contact Us
                  </h3>
                  <ul className='mt-1 space-y-1'>
                    <li className='flex items-center space-x-2'>
                      <PhoneIcon className='h-5 w-5 text-gray-600' />
                      <span className='text-sm leading-6 text-gray-600'>
                        +1 (555) 123-4567
                      </span>
                    </li>
                    <li className='flex items-center space-x-2'>
                      <MapIcon className='h-5 w-5 text-gray-600' />
                      <span className='text-sm leading-6 text-gray-600'>
                        support@bobbleheads.com
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
      <div
        className='fixed bottom-0 left-0 w-full h-2 bg-transparent'
        onMouseEnter={() => setFooterVisible(true)}
      />
    </>
  );
}
