import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { searchForLotties } from "../redux/lottie/lottieActions";
import { SEARCH_LOTTIE_MESSAGE } from "../locale/locale";

type LottieCardProps ={
    isSearchEmptyEnabled: boolean;
    setSearchEmptyEnabled:(value: boolean) => void;
}


export const SearchLotties: React.FC<LottieCardProps> = ({
    isSearchEmptyEnabled, setSearchEmptyEnabled
}) => {
    const dispatch = useDispatch();
    const [debouncedTerm, setDebouncedTerm] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
  
    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedTerm(searchTerm);
        }, 1500); // Debounce delay in milliseconds
    
        return () => {
          clearTimeout(handler);
        };
      }, [searchTerm]);
    
      useEffect(() => {
        if (debouncedTerm) {
            // @ts-ignore
          dispatch(searchForLotties(debouncedTerm));
        }
      }, [debouncedTerm, dispatch]);

    const handleSearch = (event) => {
        if(event.target.value.length==0 && !isSearchEmptyEnabled){
            setSearchEmptyEnabled(true);
        }
      setSearchTerm(event.target.value);
    };
  
    return (
      <div className="p-4">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded mb-4"
          placeholder={SEARCH_LOTTIE_MESSAGE}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    );
  };