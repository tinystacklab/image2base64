import React, { useState } from 'react';

const UrlInput = ({ onUrlSubmit, isLoading }) => {
    const [url, setUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (url.trim()) {
            onUrlSubmit(url);
        }
    };

    return (
        <div className="w-full mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <form onSubmit={handleSubmit} className="glass-panel p-4 flex gap-4 items-center flex-col sm:flex-row">
                <div className="flex-grow w-full">
                    <input
                        type="text"
                        placeholder="Paste image URL here..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        disabled={isLoading}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-secondary w-full sm:w-auto whitespace-nowrap"
                    disabled={isLoading || !url.trim()}
                >
                    {isLoading ? 'Loading...' : 'Load from URL'}
                </button>
            </form>
            <p className="mt-2 text-xs text-muted text-center">
                Note: Some URLs may not work due to CORS restrictions.
            </p>
        </div>
    );
};

export default UrlInput;
