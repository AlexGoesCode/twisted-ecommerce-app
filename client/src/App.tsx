import './App.css';
import Navbar from './components/Navbar';
import DesktopImage from './assets/images/BobbleHeads2.png';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes/Routes';

function App() {
  return (
    <AuthProvider>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div
          className='flex-grow bg-cover bg-center bg-no-repeat'
          style={{ backgroundImage: `url(${DesktopImage})` }}
        >
          <div className='flex-grow'>
            <Routes />
          </div>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
