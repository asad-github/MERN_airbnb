import './App.css'
import Index from './assets/indexpage'
import { Routes,Route } from 'react-router-dom'
import Layout from './Layout'
import Login from './assets/login_page'
import Signup from './assets/signup'
import AccountNav from './assets/accountnav'
import AccountPage from './assets/account_detail'
import PlacesPage from './assets/myplacespage'
import PlacesForm from './assets/placesform'
import BookingsPage from './assets/bookingspage'
import axios from 'axios'
import { UserContext, UserContextProvider } from './UserContext'
import SinglePlace from './assets/SinglePlace'

axios.defaults.baseURL='http://localhost:3000/api/v1/airbnb'
axios.defaults.withCredentials=true

function App() {
  return (
    <UserContextProvider>
      <Routes >
        <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Index/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/places/:action' element={<SinglePlace/>}/>
          {/* <Route path='/account/bookings/new' element={<BookingsPage/>}/> */}
          <Route path='/account/:subpage' element={<AccountPage/>}/>
          <Route path='/account/:subpage/:action?' element={<AccountPage/>}/>
          <Route path='/account/:subpage/:id?' element={<AccountPage/>}/>
          {/* <Route path='/account/places' element={<PlacesPage/>}/>
          <Route path='/account/places/new' element={<PlacesForm/>}/>
          <Route path='/account/bookings' element={<BookingsPage/>}/>
          <Route path='/account/bookings/:id' element={<BookingsPage/>}/> */}
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
