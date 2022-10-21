import { useState, useEffect } from 'react';
import storage from "local-storage-fallback";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';

const Dark = ({ dark, setDark }) => {
    const GlobalStyle = createGlobalStyle`
    body {
    background-color: ${props => (props.theme.mode === "dark" ? "#1f1c2e" : "#f3f6fd")};
    color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
    }

    h1, h2, h3 {
        color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
    }
    
    .header {
        color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
    }

    .logo-title {
        color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
    }

    .auth-btn {
        color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
    }

    .login-title {
        color: ${props => (props.theme.mode === "dark" ? "#fff" : "000")};
    }

    .login-link {
        color: ${props => (props.theme.mode === "dark" ? "#2192FF" : "#2192FF")};
    }

    .register-link {
        color: ${props => (props.theme.mode === "dark" ? "#2192FF" : "#2192FF")};
    }

    .heading p {
        color: ${props => (props.theme.mode === "dark" ? "EEEEEE" : "#828282")};
    }

    .homework {
        background-color: ${props => (props.theme.mode === "dark" ? "#1f2937" : "#fff")};
    }

    .homework:hover {
        background-color: ${props => (props.theme.mode === "dark" ? "#2a3b52" : "#eee")};
    }

    .total {
        color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
    }

    .icon {
        background-color: ${props => (props.theme.mode === "dark" ? "#1f2937" : "#fff")};
        color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
    }

    .edit {
        color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
    }

    .delete {
        color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
    }

    .homework-text {
        color: ${props => (props.theme.mode === "dark" ? "#fff" : "#000")};
    }
    `;
    const [theme, setTheme] = useState(getInitialTheme);
    useEffect(() => {
    storage.setItem("theme", JSON.stringify(theme));
    }, [theme]);

    function getInitialTheme() {
        const savedTheme = storage.getItem("theme");
    
        return savedTheme ? JSON.parse(savedTheme) : { mode: "light" };
      }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <div className='dark' onClick={() => setTheme(theme.mode === "dark" ? { mode: "light" } : { mode: "dark" })}>
                {dark ? <MdOutlineDarkMode /> : <MdDarkMode /> }
            </div>
        </ThemeProvider>
    )
}

export default Dark;