import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home/Home';
// import Donate from '@/pages/Donate/Donate';
import Registeration from '@/pages/Registeration/Registeration';
import GeneratePoster from '@/pages/GeneratePoster/GeneratePoster';
import Layout from './components/Layout/layout';

function App() {
  return (
    <Router>
      <Routes>
        {/* Layout route wrapper for all other pages */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> {/* Home route (default) */}
          {/* <Route path="donate" element={<Donate />} /> */}
          <Route path="register" element={<Registeration />} />
          <Route path="generateposter" element={<GeneratePoster />} />
          <Route path="*" element={<Home />} /> {/* 404 route */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
