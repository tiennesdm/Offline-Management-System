import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { loadLotties } from '../../redux/lottie/lottieActions';
import LottieCard from '../LottieCard';
import './LottieList.scss';
import { SearchLotties } from '../SearchLottie';
import { NO_LOTTIE_FILE } from '../../locale/locale';

/**
 * A component to display a list of Lottie files.
 * @returns {JSX.Element} The rendered component.
 */
const LottieList: React.FC = () => {
  const [isSearchEmptyEnabled, setSearchEmptyEnabled] = useState<boolean>(false);
  const dispatch = useDispatch();
  const lotties = useSelector((state: RootState) => state.lottie.lotties);
  const error = useSelector((state: RootState) => state.lottie.error);

  /**
   * Loads Lottie files when the component mounts.
   */
  useEffect(() => {
    // @ts-ignore
    dispatch(loadLotties());
  }, [dispatch]);

  /**
   * Reloads Lottie files if the search is empty.
   */
  useEffect(() => {
    if (isSearchEmptyEnabled) {
      // @ts-ignore
      dispatch(loadLotties());
      setSearchEmptyEnabled(false);
    }
  }, [dispatch, isSearchEmptyEnabled]);

  if (error && lotties?.length== 0) {
    return <div>{JSON.stringify(error?.error)}</div>;
  }

  return (
    <div className="p-4">
      <div className="container-file">
        <h2 className="text-2xl mb-4">Lottie Files</h2>
        <SearchLotties isSearchEmptyEnabled={isSearchEmptyEnabled} setSearchEmptyEnabled={setSearchEmptyEnabled} />
      </div>

      {lotties.length === 0 ? (
        <p>{NO_LOTTIE_FILE}</p>
      ) : (
        <ul className="container">
          {lotties.map((lottie) => (
            <li key={lottie?.id} className="item">
              <div className="flex-1">
                <LottieCard
                  name={lottie?.name}
                  url={lottie?.url}
                  description={lottie?.description}
                  filename={lottie.filename}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LottieList;
