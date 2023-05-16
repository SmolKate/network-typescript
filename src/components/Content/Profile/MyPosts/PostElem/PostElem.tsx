import React, { FC } from "react";
import s from './PostElem.module.css'
import Like from '../../../../../assets/like.png'

const PostElem: FC<PostElemType> = (props) => {
    return (
        <div className = {s.item}>
            <div className = {s.likesCount}>
                <img src={Like}/>
                {props.likesCount}
            </div>
            <div className = {s.likeBtn}><button>Like</button></div>
            <div className = {s.postText}>
                <div><b>Post #{props.id}</b></div>
                <div>{props.message}</div> 
            </div>
        </div>  
    )
}
export default PostElem;

// Types

type PostElemType = {
    key: number
    id: number 
    message: string
    likesCount: number
}