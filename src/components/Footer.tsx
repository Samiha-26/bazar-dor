import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-white py-6 border-t border-gray-200 mt-auto">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-3 px-4 md:flex-row md:gap-0">
        <p className="text-center text-sm font-semibold text-gray-800 md:text-left">
          বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
        </p>
        <p className="text-center text-sm font-semibold text-gray-800 md:text-right">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};

export default Footer;