import { AlignJustify, X } from "lucide-react";
import {useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

function Navbar() {
  const navItems = [
    {item:"Home", path:'/'},
    {item:"Stories", path:'/scripts'},
    {item:"Admin", path:'/admin'}
  ];

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleRoute = (index) => {
    const selected = navItems[index];
    if (selected) {
      navigate(selected.path);
      setOpen(false);
    }
  };

  return (
    <header className="bg-blue-50 text-black px-5 py-3 lg:px-10 flex justify-between items-center relative">
      <Link to={"/"}>
        <h1 className="text-2xl font-bold text-blue-600">
          Story<span className="text-black">Spot</span>
        </h1>
      </Link>

      <nav className="hidden lg:block">
        <ul className="flex gap-x-10 text-md">
          {navItems.map((item, index) => (
            <li
              className={`cursor-pointer font-regular hover:text-blue-700 duration-75 ${
                location.pathname === item.path ? `text-blue-600 border-t-2 text-lg` : `text-black text-lg`
              }`}
              onClick={() => handleRoute(index)}
              key={index}
            >
              {item.item}
            </li>
          ))}
        </ul>
      </nav>

      <button className="block lg:hidden" onClick={() => setOpen(!open)}>
        {open ? <X color={'black'}/> : <AlignJustify color={'black'}/>}
      </button>

      <nav
        className={`absolute h-screen w-screen top-12 left-0 bg-blue-100 text-black lg:hidden transition-all duration-400 ease-in-out
          ${open ? `translate-x-0` : `-translate-x-full`}`}
      >
        <ul className="flex flex-col gap-y-4 text-md px-5 py-5">
          {navItems.map((item, index) => (
            <li
              className={`cursor-pointer px-4 hover:text-blue-500 duration-75 ${
                location.pathname === item.path ? `bg-blue-500 text-white rounded-2xl py-1.5 font-medium` : `text-black font-medium`
              }`}
              key={index}
              onClick={() => handleRoute(index)}
            >
              {item.item}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
