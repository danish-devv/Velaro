import React from 'react'

const Footer = () => {
  return (
    <footer className="border-t">
      <div className="max-w-7xl mx-auto px-6 py-6">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Velaro. All rights reserved.
        </p>
      </div>
    </footer>
  );
};


export default Footer