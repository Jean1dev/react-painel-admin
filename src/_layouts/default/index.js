import React from 'react'
import { ThemeProvider } from 'styled-components'
import Header from 'components/Header'
import { Container } from './styles'
import usePersistedState from '../../hooks/usePersistedState'
import darkTheme from '../../styles/theme/dark'
import lightTheme from '../../styles/theme/light'
import GlobalStyle from '../../styles/global'

export default function DefaultLayout({ children }) {
    const [theme, setTheme] = usePersistedState('@USER_THEME', lightTheme)

    function toggleTheme() { setTheme(theme.title === 'light' ? darkTheme : lightTheme) }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle></GlobalStyle>
            <Container>
                <Header toggleTheme={toggleTheme}></Header>
                {children}
            </Container>
        </ThemeProvider>
    )
}
