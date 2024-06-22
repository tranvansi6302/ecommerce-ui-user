/* eslint-disable react-hooks/exhaustive-deps */
import { Box, CircularProgress, Typography } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '~/contexts/app.context'
import { saveProfileToLS, saveTokenToLS } from '~/utils/auth'

export default function Authenticate() {
    const { setIsAuthenticated, setProfile } = useContext(AppContext)
    const navigate = useNavigate()
    const authCodeRegex = /code=([^&]+)/
    const isMatch = window.location.href.match(authCodeRegex)
    useEffect(() => {
        if (isMatch) {
            const authCode = isMatch[1]

            fetch(`http://localhost:8080/api/v1/auth/oauth2/google?code=${authCode}`, {
                method: 'POST'
            })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    saveProfileToLS(data.result.user)
                    setProfile(data.result.user)
                    saveTokenToLS(data.result.token)
                    setIsAuthenticated(true)
                    navigate('/')
                })
        }
    }, [])

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '30px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <CircularProgress></CircularProgress>
                <Typography>Đăng đang nhập...</Typography>
            </Box>
        </>
    )
}
