import React, { useLayoutEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux'

import { db } from '../../Config/firebase'
import { getDoc, doc , updateDoc, arrayUnion, arrayRemove, onSnapshot, collection, deleteDoc} from 'firebase/firestore'
import { Button, Input } from 'antd'
import Comment from '../../Components/Comment'
import TextArea from 'antd/es/input/TextArea'



function PostDetailed() {
    let {userData} = useSelector(state => state)
    const navigate = useNavigate() 

    const [comments, setComments] = useState([])
    const [commentData, setCommentData] = useState({
        text: null,
        ...userData,
    })
    
    const [currentPost, setCurrentPost] = useState(null)
    const [isEdit, setIsEdit] = useState(false)
    
    let {postId} = useParams()
    // const allPosts = collection(db, 'posts')
    
    const PostsCollection = collection(db, 'posts')
    const currentDoc = doc(db, 'posts', postId)

    useLayoutEffect(() =>{
        onSnapshot(PostsCollection, () => {
            Get()
        })    
    }, [])

    function Get() {
        getDoc(currentDoc).then((data) => {
            setCurrentPost(data.data())
            setComments(data.data().comments)
            // console.log(data.data().comments);
        })
    }

    let PublishComment = (e) => {
        e.preventDefault()

        if(commentData.text != null || commentData.text.length !== 0) {
            updateDoc(currentDoc, {
                comments: arrayUnion(commentData)
            })
            setCommentData({text: null, ...userData})
        }
    }

    async function Delete() {
        let document = doc(db, "posts", currentDoc.id)
        await deleteDoc(document).then((data) => console.log(data))
        navigate('/posts')
    }

    async function Edit(e) {
        e.preventDefault()

        await updateDoc(currentDoc, {
            title: currentPost.title,
            text: currentPost.text,
        })
        Get()
        setIsEdit(false)
    }

    return (
        <>
            <div className={styles.detailed}>
                <div className={styles.postDetailed}>
                    <div>
                        <img src={currentPost?.user.userPhoto} alt="" />
                    </div>
                    <div>
                        <h2>{currentPost?.title}</h2>
                        <br />
                        <p>{currentPost?.text}</p>
                    </div>
                    
                </div>
                {
                    userData.email == currentPost?.user?.email ?
                    <div className={styles.btns}>
                        <Button type='primary' onClick={Delete}>Delete</Button>
                        <Button type='primary' onClick={() => setIsEdit(true)}>Edit</Button>
                    </div>
                    :
                    null
                }
                <br />
                <div className={styles.form}>
                    <form onSubmit={PublishComment}>
                        <TextArea required value={commentData.text} onChange={(e) => setCommentData({...commentData, text: e.target.value})} placeholder='Write a comment' /> 
                        {/* <Button type='primary' >Publish</Button> */}
                        <button>Publish</button>
                    </form>
                </div>
                <br />
                <h3>Comments:</h3>
                <br />
                <div className={styles.comments}>
                    {
                        comments?.map(comment => <Comment comment={comment} />) 
                    }
                </div>
            </div>
            {
                isEdit == true ? 
                <div className={styles.edit}>
                    <div className={styles.close} onClick={() => setIsEdit(!isEdit)}></div>
                    <form className={styles.editForm} onSubmit={Edit}>
                       <Input value={currentPost.title} onChange={(e) => setCurrentPost({...currentPost, title: e.target.value})} placeholder='enter title' /> 
                       <Input value={currentPost.text} onChange={(e) => setCurrentPost({...currentPost, text: e.target.value})} placeholder='enter text' /> 
                       <button>Edit</button>
                    </form>
                </div>
                :
                null
            }
        </>
    )
}

export default PostDetailed