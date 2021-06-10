import React, { useState, useEffect } from 'react';
import PostList from './PostList/PostList';
import axios from 'axios';

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4001/posts').then(response => {
      setPosts(response.data)
      console.log(response)
  })
  }, []);

  return (
    <PostList name="Daily stories" posts={posts} />
  );
}
