import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import PoliteChicky from './../../schemas/PoliteChicky.json';
import './LottieCard.scss';
import { DOWNLOAD_FILE_ERROR, DOWNLOAD_JSON, NETWORK_RESPONSE_ERROR } from '../../locale/locale';

type LottieCardProps ={
  name?: string;
  description?:string;
  url?: string;
  filename?:string;
}

/**
 * Props for the LottieCard component.
 * @typedef {Object} LottieCardProps
 * @property {string} [name] - The name of the Lottie animation.
 * @property {string} [description] - The description of the Lottie animation.
 * @property {string} [url] - The URL to the Lottie JSON file.
 * @property {string} [filename] - The filename for the downloadable JSON file.
 */

/**
 * A component to display a Lottie animation with a name, description, and a download button.
 * @param {LottieCardProps} props - The props for the component.
 * @returns {JSX.Element} The rendered component.
 */
const LottieCard: React.FC<LottieCardProps> = ({ name, description, url }) => {
  const container = useRef<HTMLDivElement>(null);

  /**
   * Loads the Lottie animation when the component mounts.
   */
  useEffect(() => {
    if (container.current) {
      lottie.loadAnimation({
        container: container.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: PoliteChicky,
      });
    }
  }, []);

  /**
   * Handles downloading the Lottie JSON file.
   * @param {string} [url] - The URL to the Lottie JSON file.
   * @param {string} [filename] - The name of the file to be downloaded.
   */
  const handleDownload = async (url?: string, filename?: string) => {
    try {
      if (url) {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(NETWORK_RESPONSE_ERROR);
        }
        const blob = await response.blob();
        const blobURL = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobURL;
        link.download = `${filename}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobURL);
      }
    } catch (error) {
      alert(DOWNLOAD_FILE_ERROR);
    }
  };

  return (
    <div className="lottie-card">
      <div className="lottie-container" ref={container}></div>
      {name && <h3 className="text-xl">{name}</h3>}
      {description && <p className="text-gray-700">{description}</p>}
      <button className="download-button" onClick={() => handleDownload(url, name)}>
        {DOWNLOAD_JSON}
      </button>
    </div>
  );
};

export default LottieCard;
