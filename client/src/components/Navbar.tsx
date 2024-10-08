import { useRef, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Disclosure,
  Menu,
  Transition,
  DisclosureButton,
  DisclosurePanel,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';
import { Link, NavLink } from 'react-router-dom';
import { baseUrl } from '../config';

const navigation = [
  { name: 'Home', href: '/', current: true },
  { name: 'Items', href: '/items', current: false },
  { name: 'About Us', href: '/aboutus', current: false },
  { name: 'My Account', href: '/myaccount', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const Navbar = () => {
  const { isAuthenticated, logout, user, getUserProfile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showEmptyCartModal, setShowEmptyCartModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // new

  const handleAvatarChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    console.log('file :>> ', file);
    if (file) {
      try {
        const formData = new FormData();
        formData.append('avatar', file);

        const response = await fetch(`${baseUrl}/users/upload-avatar`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you use token-based authentication
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload avatar');
        }

        const data = await response.json();

        console.log('File uploaded successfully', data);
        getUserProfile();

        // Optionally, update the avatar URL in your state/context
        // updateUserAvatar(data.avatar);
      } catch (error) {
        console.error('Error uploading avatar:', error);
      }
    }
  };

  const handleCartIconClick = () => {
    if (user?.shoppingCart && user.shoppingCart.length === 0) {
      setShowEmptyCartModal(true);
    } else {
      setShowEmptyCartModal(false);
      navigate('/items');
      // Navigate to the shopping cart page or perform other actions
    }
  };

  const closeModal = () => {
    setShowEmptyCartModal(false);
    navigate('/items');
  };

  return (
    <Disclosure as='nav' className='bg-gray-100'>
      {({ open }) => (
        <>
          <div className='mx-auto max-w-7xl px-2 sm:px-6 lg:px-8'>
            <div className='flex h-16 items-center justify-between'>
              <div className='inset-y-0 left-0 flex items-center sm:hidden'>
                <DisclosureButton className='relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                  <span className='-inset-0.5' />
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <XMarkIcon className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <Bars3Icon className='block h-6 w-6' aria-hidden='true' />
                  )}
                </DisclosureButton>
              </div>
              <div className='flex flex-1 items-center justify-center sm:items-stretch sm:justify-start'>
                <div className='flex flex-shrink-0 items-center'></div>
                <div className='hidden sm:ml-6 sm:block'>
                  <div className='flex space-x-4'>
                    {navigation.map((item) => (
                      <NavLink
                        key={item.name}
                        to={item.href}
                        className={({ isActive }) =>
                          classNames(
                            isActive
                              ? 'bg-gray-900 text-white'
                              : 'text-gray-700 hover:bg-gray-700 hover:text-white',
                            'rounded-md px-3 py-2 text-sm font-medium'
                          )
                        }
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
              <div className='flex items-center'>
                <NavLink
                  to='/cart'
                  className='relative rounded-full bg-gray-200 p-3 text-mirage hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                  onClick={handleCartIconClick}
                >
                  <span className='sr-only'>View Cart</span>
                  <div className='relative'>
                    <ShoppingCartIcon className='h-6 w-6' aria-hidden='true' />
                    {user?.shoppingCart && user.shoppingCart.length > 0 && (
                      <span className='absolute -bottom-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white'>
                        {user.shoppingCart.length}
                      </span>
                    )}
                  </div>
                </NavLink>
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <MenuButton className='relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'>
                      <span className='absolute -inset-1.5' />
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-12 w-12 rounded-full'
                        src={
                          user?.avatar ||
                          'https://t4.ftcdn.net/jpg/03/32/59/65/360_F_332596535_lAdLhf6KzbW6PWXBWeIFTovTii1drkbT.jpg'
                        }
                        alt='User Avatar'
                      />
                    </MenuButton>
                  </div>
                  <Transition
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <MenuItems className='absolute right-0 z-30 mt-1 w-48 sm:w-48 origin-top-right rounded-md bg-white py-3 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      {isAuthenticated ? (
                        <>
                          <MenuItem>
                            {({ active }) => (
                              <button
                                onClick={logout}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block w-full text-left px-4 py-4 text-sm text-gray-700'
                                )}
                              >
                                Sign-Out
                              </button>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <>
                                <button
                                  onClick={() => fileInputRef.current?.click()}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block w-full text-left px-4 py-4 text-sm text-gray-700'
                                  )}
                                >
                                  Change Avatar
                                </button>
                                <input
                                  type='file'
                                  ref={fileInputRef}
                                  className='hidden'
                                  onChange={handleAvatarChange}
                                />
                              </>
                            )}
                          </MenuItem>
                        </>
                      ) : (
                        <>
                          <MenuItem>
                            {({ active }) => (
                              <Link
                                to='/login'
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block w-full text-left px-4 py-4 text-sm text-gray-700'
                                )}
                              >
                                Log-in
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <Link
                                to='/register'
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block w-full text-left px-4 py-4 text-sm text-gray-700'
                                )}
                              >
                                Register
                              </Link>
                            )}
                          </MenuItem>
                          <MenuItem>
                            {({ active }) => (
                              <Link
                                to='/myaccount'
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'block w-full text-left px-4 py-4 text-sm text-gray-700'
                                )}
                              >
                                My account
                              </Link>
                            )}
                          </MenuItem>
                        </>
                      )}
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <DisclosurePanel className='sm:hidden sticky'>
            <div className='flex space-x-1 px-2 pb-3 pt-2'>
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    location.pathname === item.href // <- before: item.current
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-700 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={
                    location.pathname === item.href ? 'page' : undefined
                    // before:  aria-current={item.current ? 'page' : undefined}
                  }
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>

          {showEmptyCartModal && (
            <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
              <div className='bg-white p-6 rounded-lg shadow-lg'>
                <h2 className='text-lg font-semibold'>
                  Your shopping cart is empty.
                </h2>
                <button
                  onClick={closeModal}
                  className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md'
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </Disclosure>
  );
};

export default Navbar;
