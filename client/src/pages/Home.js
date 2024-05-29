import BottomNav from '../components/BottomNav';
import Loading from '../components/Loading'
import NavBar from '../components/NavBar';
import Notification from '../components/Notification';
import PinDetail from '../components/Pins/PinDetail';
import Login from '../components/user/Login';

const Home = () => {
  return (
    <>
      <Loading />
      <Notification />
      <Login />
      <NavBar />
      <BottomNav />
      <PinDetail />
    </>
  );  
};

export default Home;