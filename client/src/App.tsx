import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import Routes from './routes/Routes';

function App() {
  return (
    <AuthProvider>
      <div className='flex flex-col min-h-screen'>
        <Navbar />
        <div className='flex-auto bg-mobile-image sm:bg-desktop-image bg-no-repeat bg-cover sm:bg-cover sm:bg-center sm:bg-no-repeat'>
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
