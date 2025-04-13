import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion';
import { AppContext } from '../context/AppContext';
import jsPDF from 'jspdf'; 

const Result = () => {
  const [image, setImage] = useState(assets.sample_img_1);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  const { credits, setCredits, generateImage } = useContext(AppContext);

  // 👇 Generate image only once
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (credits <= 0) {
      alert('Insufficient credits!');
      return;
    }

    setLoading(true);

    if (input) {
      const generatedImage = await generateImage(input);
      if (generatedImage) {
        setImage(generatedImage);
        setIsImageLoaded(true);
        setCredits((prev) => prev - 1); // reduce only once here!
      }
    }

    setLoading(false);
  };


const downloadImage = (format) => {
  if (format === 'pdf') {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imgData = canvas.toDataURL('image/jpeg'); // convert to base64

      const pdf = new jsPDF({
        orientation: img.width > img.height ? 'landscape' : 'portrait',
        unit: 'px',
        format: [img.width, img.height],
      });

      pdf.addImage(imgData, 'JPEG', 0, 0, img.width, img.height);
      pdf.save('generated-image.pdf');
    };
    img.src = image;
  } else {
    // JPG / PNG download
    const a = document.createElement('a');
    a.href = image;
    a.download = `generated-image.${format}`;
    a.click();
  }

  setShowDownloadOptions(false); // hide options after download
};


  const handleGenerateAnother = () => {
    setIsImageLoaded(false);
    setShowDownloadOptions(false);
    setInput('');
  };

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-col min-h-[90vh] justify-center items-center"
    >
      <div>
        <div className="relative">
          <img src={image} alt="Generated" className="max-w-sm rounded" />
          {loading && (
            <>
              <span className="absolute bottom-0 left-0 h-1 w-full bg-blue-500 animate-pulse" />
              <p>Loading...</p>
            </>
          )}
        </div>
      </div>

      {!isImageLoaded && (
        <div className="flex w-full max-w-xl bg-neutral-500 text-white text-sm p-0.5 mt-10 rounded-full">
          <input
            type="text"
            placeholder="Describe what you want to generate"
            className="flex-1 bg-transparent outline-none ml-8 max-sm:w-20 placeholder-color"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button
            type="submit"
            className="bg-zinc-900 px-10 sm:px-16 py-3 rounded-full"
            disabled={loading}
          >
            Generate
          </button>
        </div>
      )}

      {isImageLoaded && (
        <div className="flex flex-col items-center gap-4 mt-10">
          <div className="flex gap-4 flex-wrap justify-center text-white text-sm">
            <button
              onClick={handleGenerateAnother}
              className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
            >
              Generate Another
            </button>

            <button
              type="button"
              onClick={() => setShowDownloadOptions((prev) => !prev)}
              className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
            >
              Your Image, Your Way
            </button>
          </div>

          {showDownloadOptions && (
            <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col gap-2 text-black">
              <button
                onClick={() => downloadImage('jpg')}
                className="bg-zinc-900 text-white px-6 py-2 rounded-full text-sm"
              >
                📸 Save as JPG
              </button>
              <button
                onClick={() => downloadImage('png')}
                className="bg-zinc-900 text-white px-6 py-2 rounded-full text-sm"
              >
                🖼️ Save as PNG
              </button>
              <button
                onClick={() => downloadImage('pdf')}
                className="bg-zinc-900 text-white px-6 py-2 rounded-full text-sm"
              >
                📄 Save as PDF
              </button>
            </div>
          )}
        </div>
      )}
    </motion.form>
  );
};

export default Result;
