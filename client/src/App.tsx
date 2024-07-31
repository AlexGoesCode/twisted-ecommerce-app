import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import DesktopImage from './assets/images/bobbleheads.png';
import Footer from './components/Footer';

function App() {
  const [] = useState(0);

  return (
    // <Router>
    // <AuthProvider>
    <div
      className='relative h-screen bg-cover bg-center flex flex-col min-h-screen saturate-100'
      style={{ backgroundImage: `url(${DesktopImage})` }}
    >
      <div className='rela'></div>
      <Header />
      <div className='flex-grow'>{/* <Routes /> */}</div>
      <Footer />
    </div>
    // </AuthProvider>
    // </Router>
  );
}

export default App;
