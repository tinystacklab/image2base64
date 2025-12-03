import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-auto pt-12 pb-6 text-center text-muted text-sm animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <p>&copy; {new Date().getFullYear()} Image to Base64 Tool. All rights reserved.</p>
            <p className="mt-2 text-xs opacity-60">
                Images are processed locally in your browser. No data is sent to any server.
            </p>
        </footer>
    );
};

export default Footer;
