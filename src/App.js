import Navbar from './components/Navbar/Navbar';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkAuth } from './redux/user.reduser';
import Activation from './pages/Activation/Activation';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Cryptocurrency from './pages/Cryptocurrency/Cryptocurrency';
import CreateProfile from './pages/CreateProfile/CreateProfile';
import Profile from './pages/Profile/Profile';
import Subscribe from './pages/Subscribe/Subscribe';
import Investments from './pages/Investments/Investments';
import Manage from './pages/Manage/Manage';
import { getUserProfile } from './redux/profile.reducer';
import { isUserAuth } from './redux/user.selector';
import Support from './pages/Support/Support';



function App(props) {

  useEffect(() => {
    if (localStorage.getItem('token')) {
      props.checkAuth()
    }
  }, [])

  useEffect(()=>{
    if(props.isAuth){
      props.getUserProfile()
    }
  },[props.isAuth])



  return (<BrowserRouter>
    <div className="App">
      <Navbar />
      <div className='body-wrapper'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cryptocurrency' element={<Cryptocurrency />} />
          <Route path='/investments' element={<Investments />} />
          <Route path='/profile' element={<Profile />} />
        <Route path='/support' element={<Support/>} />
          <Route path='/activation' element={<Activation />} />
          <Route path='/createprofile' element={<CreateProfile />} />
          <Route path='/subscribe' element={<Subscribe />} />
          <Route path='/manage' element={<Manage />} />       
        </Routes>
      </div>
    </div>
    <Footer />
  </BrowserRouter>
  );
}

let mapStateToProps = (state) => ({
  isAuth: isUserAuth(state)
})




export default connect(mapStateToProps, { checkAuth, getUserProfile })(App);
