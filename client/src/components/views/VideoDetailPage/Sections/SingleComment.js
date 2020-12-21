import React, { useState } from 'react'
import { Comment, Avatar, button, Input } from 'antd'
import Axios from 'axios'
import { useSelector } from 'react-redux'
import LikeDislikes from './LikeDislikes'

function SingleComment(props) {

    const [OpenReply, setOpenReply] = useState(false)
    const user = useSelector(state => state.user)

    const onClickReplyOpen = () => {
        setOpenReply(!OpenReply)
    }

    const actions = [
        <LikeDislikes userId={localStorage.getItem('userId')} commentId={props.comment._id}/>
        ,<span onClick={onClickReplyOpen} key="comment-basic-reply-to">Reply to</span>
    ]

    const [CommentValue, setCommentValue] = useState("")

    const onHandleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        const variables = {
            content: CommentValue,
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id
        }

        Axios.post('/api/comment/saveComment', variables)
        .then(response => {
            if(response.data.success) {
                console.log(response.data.result);
                setCommentValue("")
                setOpenReply(false)
                props.refreshFunction(response.data.result)
            } else {
                alert('저장실패')
            }
        })

    }

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt />}
                content={ <p> {props.comment.content} </p>}
            />

            {OpenReply && 
                <form style={{ display: 'flex'}} onSubmit={onSubmit} >
                    <textarea 
                        style={{ width: '100%', borderRadius: '5px'}}
                        onChange={onHandleChange}
                        value={CommentValue}
                        placeholder="코멘트"

                    />
                    <br />
                    <button style={{ width: '20%', height: '52px'}} onClick={onSubmit} >Submit</button>

                </form>
            }

        </div>
    )
}

export default SingleComment
