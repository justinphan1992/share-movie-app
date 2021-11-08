import { Header } from './components/Header';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import ShareVideo from './pages/ShareVideo';

function App() {  
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/share-video" element={<ShareVideo />} />
      </Routes>
    </div>
  );
}

export default App;
