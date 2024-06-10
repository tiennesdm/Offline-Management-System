import React , {lazy} from "react";
const LottieUploadForm  = lazy(()=> import('../components/LottieUploadForm/LottieUploadForm'));
const LottieList =  lazy(()=> import('../components/LottieList/LottieList'));
const Home : React.FC = () => {
    return (
      <div>
         <LottieUploadForm />
         <LottieList />
      </div>
    );
  };
  
  export default Home;