const { Comment } = require('../models/comment.model');
const { Post } = require('../models/post.model');
const { User } = require('../models/user.model');

const { catchAsync } = require('../util/catchAsync');
const { AppError } = require('../util/appError');
const { filterObj } = require('../util/filterObj');

// Get all users
exports.getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({
        where: { status: 'active' },
        include: [
            {
                model: Post,
                include: [{ model: Comment, include: [{ model: User }] }]
            },
            { model: Comment, include: [{ model: Post }] }
        ]
    });

    res.status(200).json({
        status: 'success',
        data: { users }
    });
});

// Get user by ID
exports.getUserById = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const user = await User.findOne({
        where: { id },
        include: [
            {
                model: Post,
                include: [{ model: Comment, include: [{ model: User }] }]
            },
            { model: Comment, include: [{ model: Post }] }
        ]
    });

    if (!user) {
        return next(new AppError(404, 'User Not Found'));
    }

    res.status(200).json({
        status: 'success',
        data: { user }
    });

    console.log(error);
});

// Save new user
exports.createNewUser = catchAsync(async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
        	return next(new AppError( 400, 'te hacen falta datos wey' ))
        }

        // MUST ENCRYPT PASSWORD
        const newUser = await User.create({
            name,
            email,
            password
        });

        res.status(201).json({
            status: 'success',
            data: { newUser }
        });
    } catch (error) {
        console.log(error);
    }
})

// Update user (patch)
exports.updateUser = (req, res) => {
    const { id } = req.params;
    const data = filterObj(req.body, 'name', 'age');

    // const userIndex = users.findIndex(user => user.id === +id);

    if (userIndex === -1) {
    	res.status(404).json({
    		status: 'error',
    		message: 'Cant update user, not a valid ID',
    	});
    	return;
    }

    // let updatedUser = users[userIndex];

    // updatedUser = { ...updatedUser, ...data };

    // users[userIndex] = updatedUser;

    res.status(204).json({ status: 'success' });
};

// Delete user
exports.deleteUser = (req, res) => {
    const { id } = req.params;

    // const userIndex = users.findIndex(user => user.id === +id);

    // if (userIndex === -1) {
    // 	res.status(404).json({
    // 		status: 'error',
    // 		message: 'Cant delete user, invalid ID',
    // 	});
    // 	return;
    // }

    // users.splice(userIndex, 1);

    res.status(204).json({ status: 'success' });
};
