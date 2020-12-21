import React, {useEffect, useState} from 'react'
import { Tooltip, Icon} from 'antd'
import Axios from 'axios'

function LikeDislikes(props) {

    const [Likes, setLikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [Dislikes, setDislikes] = useState(0)
    const [DislikeAction, setDislikeAction] = useState(null)

    let variable = {}

    if(props.video) {
        variable = { videoId: props.videoId , userId: props.userId}
    } else {
        variable = { commentId: props.commentId , userId: props.userId}
    }

    useEffect(() => {
        Axios.post('/api/like/getLikes', variable)
            .then(response => {
                if(response.data.success) {
                    console.log("likes==" + response.data.likes.length);
                    // like count
                    setLikes(response.data.likes.length)

                    // like 눌렀는지
                    response.data.likes.map(like => {
                        if(like.userId === props.userId) {
                            setLikeAction('liked')
                        }
                    })

                } else {
                    alert('like 정보 get 실패');
                }
            })

            Axios.post('/api/like/getDislikes', variable)
            .then(response => {
                if(response.data.success) {
                    // Dislike count
                    setDislikes(response.data.dislikes.length)

                    // Dislike 눌렀는지
                    response.data.dislikes.map(dislike => {
                        if(dislike.userId === props.userId) {
                            setDislikeAction('Disliked')
                        }
                    })

                } else {
                    alert('Dislike 정보 get 실패');
                }
            })
    }, [])

    const onLike = () => {

        if(LikeAction === null) {
            Axios.post('/api/like/upLike', variable)
                .then(response => {
                    if(response.data.success) {

                        setLikes(Likes + 1)
                        setLikeAction('liked')

                        if(DislikeAction !== null) {
                            setDislikeAction(null)
                            setDislikes(Dislikes -1)
                        }

                    } else {
                        alert('like update 오류')
                    }
                })
        } else {
            Axios.post('/api/like/unLike', variable)
                .then(response => {
                    if(response.data.success) {

                        setLikes(Likes - 1)
                        setLikeAction(null)

                    } else {
                        alert('like update 오류')
                    }
                })
        }
    }

    const onDislike = () => {

        if(DislikeAction !== null) {
            Axios.post('/api/like/unDislike', variable)
                .then(response => {
                    if(response.data.success) {
                        setDislikes(Dislikes -1)
                        setDislikeAction(null)
                    } else {
                        alert('dislike update 오류')
                    }
                })

        } else {

            Axios.post('/api/like/upDislike', variable)
                .then(response => {
                    if(response.data.success) {
                        setDislikes(Dislikes +1)
                        setDislikeAction('disliked')

                        if(LikeAction !== null) {
                            setLikeAction(null)
                            setLikes(Likes -1)
                        }

                    } else {
                        alert('dislike update 오류')
                    }
                })

        }
    }

    return (
        <div>
            <sapn key="comment-basic-like">
                    <Tooltip title="Like">
                        <Icon type="like"
                            theme={LikeAction === 'liked' ? 'filled' : 'outlined'}
                            onClick={onLike}
                        />
                    </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto'}}> {Likes} </span>
            </sapn>&nbsp;&nbsp;
            <sapn key="comment-basic-dislike">
                    <Tooltip title="Dislike">
                        <Icon type="dislike"
                            theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'}
                            onClick={onDislike}
                        />
                    </Tooltip>
                <span style={{ paddingLeft:'8px', cursor:'auto'}}> {Dislikes} </span>
            </sapn>&nbsp;&nbsp;
        </div>
    )
}

export default LikeDislikes
