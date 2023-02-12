import './scss/app.scss';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { NotFound } from './pages/NotFound';
import { Routes, Route } from 'react-router-dom';
import { FullPie } from './pages/FullPie';
import { HeaderLayout } from './layouts/HeaderLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HeaderLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pies/:id" element={<FullPie />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
