// src/navigation/AppRouter.tsx
import React,{lazy} from 'react';
import { Routes, Route } from 'react-router-dom';
const Home = lazy(()=> import('./../pages/Home'));
const About = lazy(()=> import('./../pages/About'));
const Contact = lazy(()=> import('./../pages/Contact'));

const AppRouter : React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
  );
};

export default AppRouter;
