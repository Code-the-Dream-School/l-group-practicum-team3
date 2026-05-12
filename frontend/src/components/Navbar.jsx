import {useState, useRef, useEffect} from 'react';
import {Link, NavLink} from "react-router-dom";
import {
  Home,
  Refrigerator,
  CookingPot,
  ShoppingCart,
  UserCircle,
} from "lucide-react";

//User menu
function UserMenu({className = "", dropdownClass = ""}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  //close dropdown when user click outside
  useEffect(() => {  

    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside)

  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        className="hover:text-[#FDD34D] transition-colors"
        onClick={() => setOpen(!open)}
      >
        <UserCircle size={26} />
      </button>

      {open && (
        <div className={`absolute right-0 mt-2 w-40 border rounded-lg shadow-md overflow-hidden ${dropdownClass}`}>
            <Link 
              to="/profile" 
              className="block px-4 py-2 hover:bg-[#FDD34D] hover:text-[#0D631B] active:bg-[#FDD34D] active:text-[#0D631B] transition-colors" 
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>

            <button 
              className="w-full text-left px-4 py-2 hover:bg-[#FDD34D] hover:text-[#0D631B] active:bg-[#FDD34D] active:text-[#0D631B] transition-colors" 
              onClick={() => setOpen(false)}
            > 
              Logout
            </button> 
        </div>
      )}
    </div>
  )
}


export default function Navbar() {
  const baseLink = "flex items-center gap-2 transition-colors";

  function desktopLink({isActive}) {
    if (isActive) {
      return baseLink + " text-[#FDD34D] font-semibold text-xl"
    }
    return baseLink + " text-white/90 hover:text-[#FDD34D]";
  }

  function mobileLink({isActive}) {
    const base = "flex items-center justify-center p-3 rounded-xl transition-all duration-200";

    if(isActive) {
      return base + " bg-[#FDD34D] text-[#0D631B] shadow-md scale-110";
    }
    return base + " text-green-800";
  }

  return (
    <>
      {/*desktop navabar*/}      
      <nav className="hidden md:flex sticky top-0 z-50 items-center justify-between px-6 py-2 bg-[#0D631B] shadow-md text-white">
        {/*leftside navlinks*/}
        <div className="hidden md:flex gap-8">
          <NavLink to="/" className={desktopLink}>Home</NavLink>
          <NavLink to="/fridge" className={desktopLink}>Fridge</NavLink>
          <NavLink to="/recipes" className={desktopLink}>Recipes</NavLink>
          <NavLink to="/shopping-list" className={desktopLink}>Shopping</NavLink>
        </div>

        {/*desktop user*/}
        <UserMenu 
          className="hidden md:block"  
          dropdownClass="bg-[#0D631B] border-white/10 text-white"
        />
      </nav>

      {/*mobile user icon*/}
      <div className="fixed top-3 right-4 z-50 md:hidden">
        <UserMenu dropdownClass="bg-white border-gray-200 text-black" />
      </div>

      {/*Mobile bottom nav*/}

      <div className="fixed bottom-0 left-0 w-full bg-gray-100 border-t border-white/10 shadow-md flex 
            justify-around items-center py-0.5 md:hidden z-50">

        <NavLink to="/" className={mobileLink}>
          <Home size={26} />
        </NavLink>
        <NavLink to="/fridge" className={mobileLink}>
          <Refrigerator size={26} />
        </NavLink>
        <NavLink to="/recipes" className={mobileLink}>
          <CookingPot size={26} />
        </NavLink>
        <NavLink to="/shopping-list" className={mobileLink}>
          <ShoppingCart size={26} />
        </NavLink>

      </div>
    </>
  );
}
