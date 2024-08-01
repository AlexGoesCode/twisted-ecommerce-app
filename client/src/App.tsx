import { useState } from 'react';
import './App.css';
import Header from './components/Navbar';
import DesktopImage from './assets/images/bobbleheads.png';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  const [state, setState] = useState(0);

  return (
    // <Router>
    // <AuthProvider>
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <div
        className='sti flex-grow bg-cover bg-center'
        style={{ backgroundImage: `url(${DesktopImage})` }}
      >
        <div className='flex-grow'>{/* <Routes /> */}</div>
      </div>
      <Footer />
    </div>
    // </AuthProvider>
    // </Router>
  );
}

export default App;
