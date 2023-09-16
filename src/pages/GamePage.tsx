import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import slots from '../db/slots.json';
import { setLoadingTrue, setLoadingFalse } from '../redux/slices/UserSlice';

function GamePage() {
    const { slug } = useParams();
    const dispatch = useDispatch()
   const isLoading = useSelector((state: RootState) => state.User.isLoading);
    const user = useSelector((state: RootState) => state.User.user);
    const isUser = useSelector((state: RootState) => state.User.isUser);
    const navigate = useNavigate()
    useEffect(() => {
      dispatch(setLoadingTrue())
        if (slug) {
            console.log(isLoading)

            if(isUser && user){
              console.log(user)
              if(user.balance === 0){
                navigate('/profile/deposit')
                setTimeout(() => {
                  dispatch(setLoadingFalse())
                }, 1000);
              } else{
                navigate('/')
                setTimeout(() => {
                  dispatch(setLoadingFalse())
                }, 5000);
              }
            }
        }
    }, [isUser, slug, user, navigate, dispatch]);
    return (
        <>
            {isUser ? (
              <>
              {user.balance === 0 ? (
                <div className="back-to-main-from-demo">
                
                </div>
                
              ) : null}
              </>
            ): null}
        </>
    );
}

export default GamePage;
