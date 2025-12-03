import React, { useCallback, useState } from 'react';
import { validateImage } from '../utils/imageUtils';

const ImageUploader = ({ onImageSelected }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState(null);

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        setIsDragging(false);
        setError(null);

        const files = e.dataTransfer.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    }, []);

    const handleFileInput = (e) => {
        setError(null);
        const files = e.target.files;
        if (files && files.length > 0) {
            processFile(files[0]);
        }
    };

    const processFile = (file) => {
        const validation = validateImage(file);
        if (!validation.valid) {
            setError(validation.error);
            return;
        }
        onImageSelected(file);
    };

    return (
        <div className="w-full mb-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div
                className={`glass-panel p-8 text-center border-2 border-dashed transition-all duration-300 ${isDragging ? 'border-primary bg-opacity-30' : 'border-gray-600 hover:border-gray-500'
                    }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                style={{ minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
                <div className="mb-4">
                    <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ width: '48px', height: '48px' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                </div>
                <p className="text-lg mb-2 font-medium">Drag & Drop your image here</p>
                <p className="text-muted text-sm mb-6">or</p>
                <label className="btn btn-primary">
                    Browse Files
                    <input
                        type="file"
                        className="hidden"
                        onChange={handleFileInput}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                </label>
                <p className="mt-4 text-xs text-muted">Supports JPG, PNG, GIF, WEBP, SVG (Max 10MB)</p>
            </div>
            {error && (
                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm text-center">
                    {error}
                </div>
            )}
        </div>
    );
};

export default ImageUploader;
