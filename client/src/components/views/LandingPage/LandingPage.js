import React, {useEffect, useState} from 'react'
import { FaCode } from "react-icons/fa";
import { Card, Icon, Avatar, Col, Typography, Row} from 'antd';
import Axios from 'axios';
import moment from 'moment';

const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {

    const [Video, setVideo] = useState([])

    useEffect(() => {
        Axios.get('/api/video/getVideos')
            .then(response => {
                if(response.data.success){
                    console.log(response.data);
                    setVideo(response.data.videos);
                } else {
                    alert('비디오 가져오기 실패');
                }
            })
    }, [])

    const renderCards = Video.map((video, index) => {
        let minutes = Math.floor(video.duration / 60);
        let seconds = Math.floor((video.duration - minutes * 60));

        return <Col lg={6} md={8} xs={24}>
            <a href={`/video/${video._id}`} >
                <div style={{ position: 'relative'}}>
                    <img style={{ width: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} />
                    <div className="duration">
                        <span>{minutes} : {seconds}</span>
                    </div>
                </div>
            </a>
            <br/>
            <Meta
                avatar={
                    <Avatar src={video.writer.image} />
                }
                title={video.title}
                description=""
            />
            <span>{video.writer.name}</span>
            <br/>
            <span style={{ marginLeft:'3rem'}}>{video.views} views</span> - <span>{moment(video.createAt).format("MMM Do YY")}</span>
        </Col>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto'}}>
            <Title level={2} > Recommended</Title>
            <hr />
            <Row gutter={[32, 16]}>
                {renderCards}

                

            </Row>
        </div>
    )
}

export default LandingPage
