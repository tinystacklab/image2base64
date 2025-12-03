import React, { useState } from 'react';

const ResultViewer = ({ base64, imageFile, onClear }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(base64).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = base64;
        link.download = imageFile ? `converted-${imageFile.name}` : 'converted-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!base64) return null;

    return (
        <div className="w-full animate-fade-in glass-panel p-6" style={{ animationDelay: '0.3s' }}>
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <h2 className="text-xl font-semibold">Conversion Result</h2>
                <button onClick={onClear} className="text-sm text-muted hover:text-white transition-colors">
                    Clear
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Preview Section */}
                <div className="flex flex-col items-center justify-center bg-black/20 rounded-lg p-4">
                    <p className="text-sm text-muted mb-4 self-start">Preview</p>
                    <img
                        src={base64}
                        alt="Preview"
                        className="max-w-full max-h-[300px] object-contain rounded shadow-lg"
                    />
                    {imageFile && (
                        <div className="mt-4 text-xs text-muted text-center">
                            <p>{imageFile.name}</p>
                            <p>{(imageFile.size / 1024).toFixed(2)} KB</p>
                        </div>
                    )}
                </div>

                {/* Output Section */}
                <div className="flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-muted">Base64 String</p>
                        <div className="flex gap-2">
                            <button
                                onClick={handleDownload}
                                className="text-xs bg-white/5 hover:bg-white/10 px-3 py-1 rounded transition-colors"
                            >
                                Download Image
                            </button>
                        </div>
                    </div>

                    <div className="relative flex-grow mb-4">
                        <textarea
                            readOnly
                            value={base64}
                            className="w-full h-full min-h-[400px] bg-black/40 border border-white/10 rounded-lg p-3 text-xs font-mono text-gray-300 resize-none focus:outline-none focus:border-primary/50"
                        />
                    </div>

                    <button
                        onClick={handleCopy}
                        className={`btn w-full ${copied ? 'bg-green-600 hover:bg-green-700' : 'btn-primary'}`}
                    >
                        {copied ? (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                                </svg>
                                Copy to Clipboard
                            </>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultViewer;
