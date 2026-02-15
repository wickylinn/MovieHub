import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SignInModal from "./SignInModal";
import "./navbar.css";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);     // ✅ для бургер-меню
  const [modalOpen, setModalOpen] = useState(false);   // ✅ для модалки
  const [isAuthed, setIsAuthed] = useState(!!localStorage.getItem("token"));
  const [username, setUsername] = useState(localStorage.getItem("username") || "User");

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsAuthed(!!localStorage.getItem("token"));
    setUsername(localStorage.getItem("username") || "User");
    setMenuOpen(false); // ✅ закрываем меню при переходе
  }, [location.pathname]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsAuthed(false);
    setUsername("User");
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <header className="navWrap">
      <div className="container">
        <div className="nav glass">
          <Link className="brand" to="/">
            <span className="logoDot" />
            <div className="brandText">
              <div className="brandName">MovieHub</div>
              <div className="brandSub">ratings • trailers • reviews</div>
            </div>
          </Link>

          <div className="navRight">
            <button
              className="btn navBurger"
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
              aria-expanded={menuOpen}
            >
              ☰
            </button>

            <div className={`navMenu ${menuOpen ? "open" : ""}`}>
              <Link className="navLink" to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>

              {isAuthed ? (
                <>
                  <Link className="navLink" to="/profile" onClick={() => setMenuOpen(false)}>
                    Profile
                  </Link>
                  <button className="btn" onClick={logout}>
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link className="navLink" to="/login" onClick={() => setMenuOpen(false)}>
                    Login
                  </Link>
                  <Link className="navLink" to="/register" onClick={() => setMenuOpen(false)}>
                    Register
                  </Link>
                  <button
                    className="btn btnPrimary"
                    onClick={() => {
                      setMenuOpen(false);
                      setModalOpen(true); // ✅ открываем модалку
                    }}
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <SignInModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onAuth={() => {
          setIsAuthed(true);
          setUsername(localStorage.getItem("username") || "User");
          setModalOpen(false);
          navigate("/profile");
        }}
      />
    </header>
  );
}
