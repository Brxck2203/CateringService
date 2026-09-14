import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/siteHeader.css';

function SiteHeader() {
  const { session, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleDocumentClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleDocumentClick);
    return () => document.removeEventListener('mousedown', handleDocumentClick);
  }, []);

  const handleLoginClick = () => {
    navigate('/acceso', { state: { returnTo: location.pathname } });
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);

    const quotationMatch = location.pathname.match(/^\/catering\/([^/]+)\/cotizacion$/);
    if (quotationMatch) {
      navigate(`/catering/${quotationMatch[1]}`);
    }
  };

  return (
    <header className="site-header">
      <div className="site-header__inner">
        <span className="site-header__brand">Catering Services</span>

        {!session ? (
          <button type="button" className="site-header__login" onClick={handleLoginClick}>
            Iniciar sesión
          </button>
        ) : (
          <div className="site-header__profile" ref={menuRef}>
            <button
              type="button"
              className="site-header__profile-button"
              onClick={() => setIsOpen((current) => !current)}
              aria-expanded={isOpen}
            >
              <span aria-hidden="true">👤</span> {session.name}
            </button>

            {isOpen && (
              <div className="site-header__dropdown">
                <div className="site-header__account-info">
                  <strong>{session.email}</strong>
                  <span>Rol: {session.role}</span>
                </div>
                <button type="button" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default SiteHeader;
