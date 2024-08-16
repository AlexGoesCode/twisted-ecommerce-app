import { useState } from 'react';
import { MapIcon, PhoneIcon } from '@heroicons/react/20/solid';

export default function Footer() {
  const [footerVisible, setFooterVisible] = useState(false);

  return (
    <div>
      <footer
        className={`fixed bottom-0 left-0 w-full bg-gray-100 bg-opacity-95 transition-transform duration-300 ${
          footerVisible ? 'translate-y-0' : 'translate-y-full'
        }`}
        onMouseEnter={() => setFooterVisible(true)}
        onMouseLeave={() => setFooterVisible(false)}
      >
        <div className='mx-auto max-w-7xl px-6 py-2 lg:px-8'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-sm font-semibold leading-6 text-gray-900'>
                BobbleHeads ltd
              </h3>
              <ul className='mt-1 space-y-1'>
                <li>
                  <a
                    href='#'
                    className='text-sm leading-6 text-gray-600 hover:text-gray-900'
                  >
                    About Us
                  </a>
                </li>
                {/* <li>
                  <a
                    href='#'
                    className='text-sm leading-6 text-gray-600 hover:text-gray-900'
                  >
                    Careers
                  </a>
                </li> */}
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
      </footer>
      <div
        className='fixed bottom-0 left-0 w-full h-2 bg-transparent'
        onMouseEnter={() => setFooterVisible(true)}
      />
    </div>
  );
}
