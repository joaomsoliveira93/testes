import React from 'react';

const Header = ({ title }) => (
  <div className="mt-2 ml-1 mb-4">
    <p className="text-xl font-extrabold tracking-tight text-slate-900">
      {title}
    </p>
  </div>
);

export default Header;
