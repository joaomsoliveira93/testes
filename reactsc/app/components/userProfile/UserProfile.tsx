'use client'
import React from 'react'
import { useNavigate } from 'react-router-dom';

import { useStateContext } from '../../contexts/ContextProvider';
import { UserProfileSvr } from './UserProfileSvr';

export const UserProfile = () => {
    const { user, setUser, userProfile, setUserProfile } = useStateContext();
    const navigate = useNavigate();
    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        setUserProfile(false);
        navigate('/');
    };
    return (
       <UserProfileSvr userProfile={userProfile} user={user} setUserProfile={setUserProfile} logout={logout}/>
    )
}
