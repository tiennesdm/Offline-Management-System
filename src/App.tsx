
import React, { lazy, Suspense } from 'react';
const Header  = lazy(()=> import('./components/Header'));
const AppRouter = lazy(()=> import('./navigation/AppRouter'));
const  Footer = lazy(() => import('./components/Footer'));

const App: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
     <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow p-4">
        <AppRouter />
      </main>
      <Footer />
    </div>
    </Suspense>
  );
};

export default App;
