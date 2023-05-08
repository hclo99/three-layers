const express = require("express");
const router = express.Router();
const { Likes } = require("../models");
const { Posts } = require("../models");
const authMiddleware = require("../middlewares/auth-middleware");

// 좋아요 누르기랑 취소하기
router.put("",authMiddleware, async (req,res) => {
    
})



// 좋아요누른 게시글 조회





module.exports = router;