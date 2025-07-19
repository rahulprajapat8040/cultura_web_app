'use client'

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from 'js-cookie'
import { setLoggedIn } from "@/lib/redux/slices/authSlice";

const AuthInit = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const accessToken = Cookies.get("accessToken")
        dispatch(setLoggedIn(!!accessToken))
    }, [dispatch])

    return null
}

export default AuthInit;