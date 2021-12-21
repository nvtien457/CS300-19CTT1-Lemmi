const router = require("express").Router();

const PostService = require("../services/post_service");
const VoteService = require("../services/vote_service");

const sPost = new PostService();
const sVote = new VoteService();

router.post("/create", async (req, res) => {
    try {
        let post = await sPost.createPost(req.body);
        return res.status(201).json({
            status: "OK",
            message: "Success",
            data: post,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("", async (req, res) => {
    try {
        let posts = await sPost.getAllPosts();
        return res.status(201).json({
            status: "OK",
            message: "Success",
            data: posts,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("/detail", async (req, res) => {
    try {
        const post = await sPost.getPostByID(req.query.id);
        const vote = await sVote.getPostVote(req.query.id);
        return res.status(201).json({
            status: "OK",
            message: "Success",
            data: [post, vote],
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.get("/user", async (req, res) => {
    try {
        let posts = await sPost.getAllPostsByUser(req.query.id);
        return res.status(201).json({
            status: "OK",
            message: "Success",
            data: posts,
        });
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
});

router.delete("", async (req, res) => {
    try {
        await sPost.deletePostByID(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
})

router.delete("/user", async (req, res) => {
    try {
        await sPost.deletePostByUser(req.query.id);
        return res.status(200).json({
            status: "OK",
            message: "success",
        })
    }
    catch (err) {
        return res.status(err.statusCode).json(err);
    }
})

module.exports = router;