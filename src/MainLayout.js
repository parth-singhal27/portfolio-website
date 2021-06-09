import React from 'react'
import { Route, Switch } from 'react-router-dom';
// import ThemeContextProvider from './context/ThemeContextProvider';
import LandingPage from './pages/LandingPage/LandingPage';

const MainLayout = () => {
  return (
    <div>
        <Switch>
          <Route path="/" component={LandingPage} />
        </Switch>
    </div>
  )
}

export default MainLayout
