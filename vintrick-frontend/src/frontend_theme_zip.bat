@echo off
:: Run this script in vintrick-frontend\src

:: Create folder structure
mkdir components\NavBar
mkdir components\Layout
mkdir components\Button

:: Create NavBar.jsx
(
  echo import styles from './NavBar.module.css';
  echo import { Link } from 'react-router-dom';
  echo.
  echo export default function NavBar() {
  echo   return (
  echo     <nav className={styles.nav}>
  echo       <Link to="/" className={styles.logo}>Vintrick</Link>
  echo       <div className={styles.links}>
  echo         <Link to="/harvestloads">Harvest Loads</Link>
  echo         <Link to="/settings">Settings</Link>
  echo       </div>
  echo     </nav>
  echo   );
  echo }
) > components\NavBar\NavBar.jsx

:: Create NavBar.module.css
(
  echo .nav {
  echo   display: flex;
  echo   justify-content: space-between;
  echo   align-items: center;
  echo   background-color: var(--color-primary);
  echo   padding: var(--space-md);
  echo   color: white;
  echo }
  echo.
  echo .logo {
  echo   font-size: var(--font-lg);
  echo   font-weight: bold;
  echo   color: white;
  echo   text-decoration: none;
  echo }
  echo.
  echo .links a {
  echo   margin-left: 1rem;
  echo   color: white;
  echo   text-decoration: none;
  echo }
) > components\NavBar\NavBar.module.css

:: Create Layout.jsx
(
  echo import NavBar from '../NavBar/NavBar';
  echo import './Layout.css';
  echo.
  echo export default function Layout({ children }) {
  echo   return (
  echo     <>
  echo       <NavBar />
  echo       <main className="main">
  echo         {children}
  echo       </main>
  echo     </>
  echo   );
  echo }
) > components\Layout\Layout.jsx

:: Create Layout.css
(
  echo .main {
  echo   padding: 1rem;
  echo   background-color: var(--color-bg);
  echo   min-height: 100vh;
  echo   font-family: Arial, sans-serif;
  echo }
) > components\Layout\Layout.css

:: Create Button.jsx
(
  echo import styles from './Button.module.css';
  echo.
  echo export default function Button({ variant = 'primary', size = 'medium', children, ...props }) {
  echo   const classNames = [
  echo     styles.Button,
  echo     styles['Button--' + variant],
  echo     styles['Button--' + size]
  echo   ].join(' ');
  echo.
  echo   return (
  echo     <button className={classNames} {...props}>
  echo       {children}
  echo     </button>
  echo   );
  echo }
) > components\Button\Button.jsx

:: Create Button.module.css
(
  echo .Button {
  echo   border: none;
  echo   border-radius: 4px;
  echo   cursor: pointer;
  echo   font-weight: 600;
  echo   padding: 0.5rem 1rem;
  echo   transition: background-color 0.3s ease;
  echo }
  echo.
  echo .Button--primary {
  echo   background-color: var(--color-primary);
  echo   color: white;
  echo }
  echo.
  echo .Button--secondary {
  echo   background-color: var(--color-secondary);
  echo   color: white;
  echo }
  echo.
  echo .Button--small {
  echo   font-size: 0.8rem;
  echo   padding: 0.25rem 0.5rem;
  echo }
  echo.
  echo .Button--medium {
  echo   font-size: 1rem;
  echo }
  echo.
  echo .Button--large {
  echo   font-size: 1.2rem;
  echo   padding: 0.75rem 1.5rem;
  echo }
) > components\Button\Button.module.css

echo NavBar, Layout, and Button components created.
pause
