import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Spinner from './Spinner';
import { useHistory, useParams } from 'react-router-dom';
import PostManipulation from './PostManipulation/PostManipulation';

export default function PostEditPage() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState('');
  const [coverUrl, setCoverUrl] = useState('');
  const [content, setContent] = useState('');
  const [isSaveButtonDisabled, setSaveButtonDisable] = useState(false);
  const history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:4001/posts/${postId}`).then(response => {
      const post=response.data
      setPost(post);
      setTitle(post.title);
      setCoverUrl(post.coverUrl);
      setContent(post.content);
      console.log(response)
    })
  }, [postId]);

  function onPostSaveButtonClick() {
    setSaveButtonDisable(true)
    const body={
      title,
      coverUrl,
      content
    }
    axios.put(`http://localhost:4001/posts/${postId}`,body).then(response =>{
      console.log("Working")
      setSaveButtonDisable(false)
      history.push(`/posts/${postId}`);
    })
  } 

  if (!post || !content) return <Spinner />;

  return (
    <PostManipulation
      title={title}
      onTitleChange={(newTitle) => setTitle(newTitle)}
      coverUrl={coverUrl}
      onCoverUrlChange={(newCoverUrl) => setCoverUrl(newCoverUrl)}
      content={content}
      onContentChange={(newContent) => setContent(newContent)}
      onPostSaveButtonClick={onPostSaveButtonClick}
      postId={postId}
    />
  );
}
