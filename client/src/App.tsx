import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import DesktopImage from './assets/images/bobbleheads.png';
import Footer from './components/Footer';

function App() {
  const [state, setState] = useState(0);

  return (
    // <Router>
    // <AuthProvider>
    <div className='flex flex-col min-h-screen'>
      <Header />
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
