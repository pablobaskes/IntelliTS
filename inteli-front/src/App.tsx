import { Route, Switch } from 'wouter'
import Header from './components/Header/Header.component'
import Home from './pages/Home/Home.page'
import Details from './pages/Details/Details.page'
import UserProfile from './pages/UserProfile/UserProfile.page'
import Login from './pages/Login/Login.page'
import Registration from './pages/Registration/Registration.page'
import Search from './pages/Search/Search.page'
import { AuthProvider } from './context/AuthContext'
import { useAxiosInterceptors } from './hooks/auth.hooks'
import NotFound from './pages/NotFound/NotFound.page'

function App() {
  useAxiosInterceptors()
  return (
    <AuthProvider>
      <Header />
      <Switch>
        <Route component={Home} path='/' />
        <Route component={Details} path='/movie/:id' />
        <Route component={Search} path='/search/:keyword' />
        <Route component={UserProfile} path='/profile' />
        <Route component={Login} path='/login' />
        <Route component={Registration} path='/signup' />
        <Route component={NotFound} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
