import React from 'react';
import './App.css'; // Import the main CSS file

// Assuming your logo is still in assets/loginlg.png
import logoImage from './assets/loginlg.png';

const Footer = () => {
    // Define the navigation links
    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Bulletin', href: '/bulletin' },
        { name: 'About', href: '/about' },
        { name: 'Dashboard', href: '/dashboard' },
        { name: 'Contact', href: '/contact' },
    ];

    return (
        <footer className="main-footer">
            <div className="footer-content-wrapper">
                
                {/* 1. Navigation Links */}
                <div className="footer-links">
                    {navLinks.map((link) => (
                        <a key={link.name} href={link.href} className="footer-link">
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* 2. Logo and Copyright */}
                <div className="footer-info">
                    {/* Logo (same as header) */}
                    <img src={logoImage} alt="Logo" className="footer-logo" />
                    
                    {/* Copyright Text */}
                    <p className="footer-copyright">
                        Copyright 2025 All rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;