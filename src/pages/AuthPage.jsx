import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PROVIDER_CATERING_ID } from '../context/CateringCatalogContext';
import { useAuth } from '../context/AuthContext';
import {
  findAccountByEmail,
  registerAccount,
  validateCredentials
} from '../services/authStorage';
import '../styles/authPage.css';

const initialRegisterForm = {
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  role: 'cliente'
};

const initialLoginForm = {
  email: '',
  password: ''
};

const RECOVERY_MESSAGE =
  'Si el correo existe en nuestra plataforma, se ha enviado un enlace de recuperación.';

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const isValidPhone = (phone) => String(phone || '').replace(/\D/g, '').length >= 8;
const isStrongPassword = (password) =>
  password.length >= 8 && /[A-Za-z]/.test(password) && /\d/.test(password);

function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mode, setMode] = useState('login');
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [isRecoveryOpen, setIsRecoveryOpen] = useState(false);
  const [isRecoveryModalOpen, setIsRecoveryModalOpen] = useState(false);

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setMessage('');
    setError('');
  };

  const handleRegister = (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    const { name, email, phone, password, confirmPassword, role } = registerForm;

    if (!name.trim() || !email.trim() || !phone.trim() || !password || !confirmPassword) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (!isValidEmail(email.trim())) {
      setError('Ingresa un correo electrónico válido.');
      return;
    }

    if (!isValidPhone(phone)) {
      setError('Ingresa un número de teléfono válido de al menos 8 dígitos.');
      return;
    }

    if (!isStrongPassword(password)) {
      setError('La contraseña debe tener al menos 8 caracteres, incluyendo letras y números.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    const result = registerAccount({
      name,
      email,
      phone,
      password,
      role,
      businessId: role === 'proveedor' ? PROVIDER_CATERING_ID : undefined
    });

    if (!result.success) {
      setError(result.error);
      return;
    }

    setRegisterForm(initialRegisterForm);
    setMessage(
      role === 'proveedor'
        ? 'Cuenta de proveedor creada y vinculada a tu perfil comercial (Catering Fiesta). En una versión conectada, accederías directamente al Panel de Control Privado. Próximo paso: configurar tu perfil comercial.'
        : 'Cuenta creada correctamente. En una versión conectada, serías redirigido al catálogo principal.'
    );
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setMessage('');
    setError('');

    const account = validateCredentials(loginForm.email, loginForm.password);

    if (!account) {
      setError('Credenciales incorrectas, intente nuevamente.');
      return;
    }

    login(account);
    const returnTo = location.state?.returnTo;
    navigate(
      account.role === 'proveedor' ? '/proveedor/panel' : returnTo || '/',
      { replace: true }
    );
  };

  const handleRecovery = (event) => {
    event.preventDefault();
    findAccountByEmail(recoveryEmail);
    setIsRecoveryModalOpen(true);
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <header className="auth-header">
          <p className="auth-eyebrow">Catering Services</p>
          <h1>Acceso a la plataforma</h1>
          <p>Administra tu cuenta como cliente o proveedor.</p>
        </header>

        <div className="auth-tabs" role="tablist">
          <button
            type="button"
            className={mode === 'login' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => switchMode('login')}
          >
            Iniciar sesión
          </button>
          <button
            type="button"
            className={mode === 'register' ? 'auth-tab active' : 'auth-tab'}
            onClick={() => switchMode('register')}
          >
            Registrarme
          </button>
        </div>

        {error && <div className="auth-alert error">{error}</div>}
        {message && <div className="auth-alert success">{message}</div>}

        {mode === 'login' ? (
          <form className="auth-form" onSubmit={handleLogin}>
            <label>
              Correo electrónico
              <input
                type="email"
                value={loginForm.email}
                onChange={(event) =>
                  setLoginForm((current) => ({ ...current, email: event.target.value }))
                }
                required
              />
            </label>
            <label>
              Contraseña
              <input
                type="password"
                value={loginForm.password}
                onChange={(event) =>
                  setLoginForm((current) => ({ ...current, password: event.target.value }))
                }
                required
              />
            </label>
            <button className="auth-primary-btn" type="submit">Iniciar sesión</button>
            <button
              className="auth-link-btn"
              type="button"
              onClick={() => {
                setError('');
                setIsRecoveryOpen((current) => !current);
              }}
            >
              Olvidé mi contraseña
            </button>
          </form>
        ) : (
          <form className="auth-form" onSubmit={handleRegister}>
            <label>
              Nombre completo
              <input
                value={registerForm.name}
                onChange={(event) =>
                  setRegisterForm((current) => ({ ...current, name: event.target.value }))
                }
                required
              />
            </label>
            <label>
              Correo electrónico
              <input
                type="email"
                value={registerForm.email}
                onChange={(event) =>
                  setRegisterForm((current) => ({ ...current, email: event.target.value }))
                }
                required
              />
            </label>
            <label>
              Número de teléfono
              <input
                type="tel"
                value={registerForm.phone}
                onChange={(event) =>
                  setRegisterForm((current) => ({ ...current, phone: event.target.value }))
                }
                placeholder="Ejemplo: 8888-8888"
                required
              />
              <small>Quedará guardado en tu cuenta para facilitar el contacto relacionado con las cotizaciones.</small>
            </label>
            <label>
              Contraseña
              <input
                type="password"
                value={registerForm.password}
                onChange={(event) =>
                  setRegisterForm((current) => ({ ...current, password: event.target.value }))
                }
                required
              />
              <small>Usa al menos 8 caracteres, incluyendo letras y números.</small>
            </label>
            <label>
              Confirmar contraseña
              <input
                type="password"
                value={registerForm.confirmPassword}
                onChange={(event) =>
                  setRegisterForm((current) => ({
                    ...current,
                    confirmPassword: event.target.value
                  }))
                }
                required
              />
            </label>
            <label>
              Rol
              <select
                value={registerForm.role}
                onChange={(event) =>
                  setRegisterForm((current) => ({ ...current, role: event.target.value }))
                }
              >
                <option value="cliente">Cliente</option>
                <option value="proveedor">Proveedor</option>
              </select>
            </label>
            <button className="auth-primary-btn" type="submit">Registrarme</button>
          </form>
        )}

        {isRecoveryOpen && mode === 'login' && (
          <form className="auth-recovery" onSubmit={handleRecovery}>
            <h2>Recuperar contraseña</h2>
            <label>
              Correo electrónico
              <input
                type="email"
                value={recoveryEmail}
                onChange={(event) => setRecoveryEmail(event.target.value)}
                required
              />
            </label>
            <button className="auth-secondary-btn" type="submit">Enviar enlace</button>
          </form>
        )}
      </section>

      {isRecoveryModalOpen && (
        <div className="auth-modal-backdrop" role="presentation">
          <div className="auth-modal" role="dialog" aria-modal="true">
            <h2>Recuperación de contraseña</h2>
            <p>{RECOVERY_MESSAGE}</p>
            <button
              className="auth-primary-btn"
              type="button"
              onClick={() => setIsRecoveryModalOpen(false)}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default AuthPage;
