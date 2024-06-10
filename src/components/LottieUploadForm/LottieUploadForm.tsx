import React, { useState, useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import Ajv from 'ajv';
import lottieSchema from '../../schemas/LottieSchema.json';
import { useDispatch } from 'react-redux';
import { uploadNewLottie } from '../../redux/lottie/lottieActions';
import { INVALID_JSON_FILE, INVALID_JSON_FILE_LOTTIE_MESSAGE, INVALID_LOTTIE_FILE, UPLOAD, VALID_JSON_FILE_MESSAGE } from '../../locale/locale';

/** Initialize Ajv for JSON schema validation */
const ajv = new Ajv();
const validate = ajv.compile(lottieSchema);

/**
 * Props for the LottieUploadForm component.
 * @typedef {Object} LottieUploadFormProps
 */

/**
 * A component to upload a new Lottie file with validation and preview.
 * @returns {JSX.Element} The rendered component.
 */
const LottieUploadForm: React.FC = () => {
  const dispatch = useDispatch();
  const containerRef = useRef<HTMLDivElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [animationData, setAnimationData] = useState<any>(null);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  /**
   * Handles file input change event.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The file input change event.
   */
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === 'application/json') {
      setFile(selectedFile);
    } else {
      alert(VALID_JSON_FILE_MESSAGE);
      setFile(null);
    }
  };

  /**
   * Handles form submission.
   * @param {React.FormEvent} e - The form submit event.
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file && name && description && isValid) {
     // @ts-ignore
      dispatch(uploadNewLottie(file, name, description));
      setFile(null);
      setName('');
      setDescription('');
      setAnimationData(null);
    }
  };

  useEffect(() => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          const valid = validate(json);
          setIsValid(valid);
          if (valid) {
            setAnimationData(json);
          } else {
            alert(INVALID_JSON_FILE_LOTTIE_MESSAGE);
          }
        } catch (error) {
          alert(INVALID_JSON_FILE);
          setIsValid(false);
        }
      };
      reader.readAsText(file);
    } else {
      setAnimationData(null);
      setIsValid(null);
    }
  }, [file]);

  useEffect(() => {
    if (animationData && containerRef.current) {
      const animation = lottie.loadAnimation({
        container: containerRef.current,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        animationData: animationData,
      });

      return () => animation.destroy();
    }
  }, [animationData]);

  return (
    <div className="p-4 border rounded-lg">
      {animationData && (
        <div
          ref={containerRef}
          className='p-2'
          style={{ width: '100%', height: '400px', border: '1px solid #ddd' }}
        >
          {isValid === false && <p style={{ color: 'red' }}>{INVALID_LOTTIE_FILE}</p>}
        </div>
      )}
      <form onSubmit={handleSubmit} >
        {!animationData && (<h2 className="text-2xl mb-4">Upload New Lottie</h2>)}
        <div className="mb-4">
          <label htmlFor="lottie-upload" className="block text-gray-700">File</label>
          <input
            className="w-full p-2 border rounded"
            id="lottie-upload" 
            type="file"
            accept=".json"
            onChange={handleFileChange}
            style={{ marginBottom: '10px' }}
          />
        </div>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
             id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
            required
          ></textarea>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          {UPLOAD}
        </button>
      </form>
    </div>
  );
};

export default LottieUploadForm;
