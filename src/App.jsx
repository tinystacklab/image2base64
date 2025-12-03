import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import ImageUploader from './components/ImageUploader';
import UrlInput from './components/UrlInput';
import ResultViewer from './components/ResultViewer';
import { fileToBase64, urlToBase64 } from './utils/imageUtils';

function App() {
  const [base64, setBase64] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageSelected = async (file) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fileToBase64(file);
      setBase64(result);
      setImageFile(file);
    } catch (err) {
      setError('Failed to process image file.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUrlSubmit = async (url) => {
    setLoading(true);
    setError(null);
    try {
      const result = await urlToBase64(url);
      setBase64(result);
      setImageFile({ name: 'remote-image', size: 0 }); // Size unknown for URL
    } catch (err) {
      setError('Failed to load image from URL. It might be blocked by CORS policy.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setBase64('');
    setImageFile(null);
    setError(null);
  };

  return (
    <>
      <Header />

      <main className="flex-grow w-full max-w-4xl mx-auto">
        {!base64 ? (
          <>
            <ImageUploader onImageSelected={handleImageSelected} />
            <div className="flex items-center my-6">
              <div className="flex-grow h-px bg-white/10"></div>
              <span className="px-4 text-muted text-sm uppercase tracking-wider">OR</span>
              <div className="flex-grow h-px bg-white/10"></div>
            </div>
            <UrlInput onUrlSubmit={handleUrlSubmit} isLoading={loading} />
          </>
        ) : (
          <ResultViewer
            base64={base64}
            imageFile={imageFile}
            onClear={handleClear}
          />
        )}

        {loading && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {error && !base64 && (
          <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-center animate-fade-in">
            {error}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;
