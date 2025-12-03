import React from 'react';

const Header = () => {
    return (
        <header className="mb-8 text-center animate-fade-in">
            <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500" style={{ backgroundClip: 'text', WebkitBackgroundClip: 'text', backgroundImage: 'linear-gradient(to right, #60a5fa, #a78bfa)' }}>
                Image to Base64
            </h1>
            <p className="text-muted text-lg">
                Convert your images to Base64 strings instantly. Secure, fast, and client-side.
            </p>
        </header>
    );
};

export default Header;
