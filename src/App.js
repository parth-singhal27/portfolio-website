import {BrowserRouter as Router} from 'react-router-dom';
import MainLayout from './MainLayout'

function App() {
  return (
    <div>
      <Router>
        <MainLayout />
      </Router>
    </div>
  );
}

export default App;
