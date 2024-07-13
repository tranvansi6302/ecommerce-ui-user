/* eslint-disable react-hooks/exhaustive-deps */
import { Box, CircularProgress, Typography } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { API_URL } from '~/configs/api.config'
import pathConfig from '~/configs/path.config'
import { AppContext } from '~/contexts/app.context'
import { saveProfileToLS, saveTokenToLS } from '~/utils/auth'
import http from '~/utils/http'

export default function Authenticate() {
    const { setIsAuthenticated, setProfile } = useContext(AppContext)
    const navigate = useNavigate()
    const authCodeRegex = /code=([^&]+)/
    const isMatch = window.location.href.match(authCodeRegex)
    useEffect(() => {
        if (isMatch) {
            const authCode = isMatch[1]

            http.post(`${API_URL.LOGIN_GOOGLE}?code=${authCode}`).then((response) => {
                const data = response.data
                saveProfileToLS(data?.result?.user)
                setProfile(data?.result?.user)
                saveTokenToLS(data?.result?.token)
                setIsAuthenticated(true)
                navigate(pathConfig.home)
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
