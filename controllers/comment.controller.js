// Models
const { Comment } = require('../models/comment.model');
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');
const { AppError } = require('../util/appError');
const { catchAsync } = require('../util/catchAsync');

exports.getAllComments = catchAsync (async (req, res, next) => {
        const comments = await Comment.findAll({
            where: {
                status: 'active'
            },
            include: [{ model: Post }, { model: User }]
        });

        res.status(200).json({
            status: 'success',
            data: { comments }
        });
});

exports.getCommentById = catchAsync (async (req, res, next) => {
        const { id } = req.params;

        const comment = await Comment.findOne({
            where: { status: 'active', id },
            include: [{ model: Post }, { model: User }]
        });

        if (!comment) {
            return next(new AppError(404, 'id not found'))
        }

        res.status(200).json({
            status: 'success',
            data: { comment }
        });
});

exports.createComment = catchAsync (async (req, res, next) => {

        const { text, postId, userId } = req.body;

        if (!text || !postId || !userId) {
            return next(new AppError(400, 'te hacen falta datos la ptm'))
        }

        const newComment = await Comment.create({ text, postId, userId });

        res.status(201).json({
            status: 'success',
            data: { newComment }
        });
    
});
