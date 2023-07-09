'use client'; 

import React from 'react'; 
import type { RootState } from '@/app/GlobalRedux/store';
import { useSelector } from 'react-redux';

const Feed = () => {
  const posts = useSelector((state: RootState) => state.posts); 
  return (
    <p>re</p>
  )
}

export default Feed