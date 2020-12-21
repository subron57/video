const express = require('express');
const router = express.Router();
const { Subscriber } = require("../models/Subscriber");


//=================================
//             Subscribe
//=================================

router.post('/subscribeNumber', (req, res) => {
    // 구독자수 가져오기
    Subscriber.find({ 'userTo': req.body.userTo})
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, subscribeNumber: subscribe.length});
        })

})


router.post('/subscribed', (req, res) => {
    // 구독중 여부 가져오기
    Subscriber.find({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err);
            let result = false;
            if(subscribe.length !==0){
                result = true;
            }

            return res.status(200).json({ success: true, subscribed: result});
        })

})


router.post('/unSubscibe', (req, res) => {
    // 구독 취소
    Subscriber.findOneAndDelete({ 'userTo': req.body.userTo, 'userFrom': req.body.userFrom})
        .exec((err, subscribe) => {
            if(err) return res.status(400).send(err);
            return res.status(200).json({ success: true, subscribe});
        })

})


router.post('/subscibe', (req, res) => {
    // 구독 신청
    const subscribe = new Subscriber(req.body)

    subscribe.save((err, doc)=> {
        if(err) return res.status(400).send(err);
        return res.status(200).json({ success: true, doc});
    })

})


module.exports = router;
