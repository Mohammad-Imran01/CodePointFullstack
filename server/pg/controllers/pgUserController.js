const {
    getAllUsersService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService,
} = require('../models/pgUserModel');

const handleResponse = (res, status, message, data = null) => {
    res.status(status).json({ status, message, data });
};

const createUser = async (req, res, next) => {
    const { name, email } = req.body;
    console.log('we are here', '\n\n\n\n', name, '\n\n', email, '\n\n\n\n\n\n')
    try {
        const newUser = await createUserService({ name, email });
        handleResponse(res, 201, 'User created successfully.', newUser);
    } catch (e) {
        next(e);
    }
};

const getAllUsers = async (req, res, next) => {
    try {
        const users = await getAllUsersService();
        handleResponse(res, 200, 'Users fetched successfully.', users);
    } catch (e) {
        next(e);
    }
};

const getUserById = async (req, res, next) => {
    try {
        const user = await getUserByIdService(req.params.id);
        if (!user) return handleResponse(res, 404, 'User Not Found');
        handleResponse(res, 200, 'User fetched successfully.', user);
    } catch (err) {
        next(err);
    }
};

const updateUser = async (req, res, next) => {
    const { name, email } = req.body;
    try {
        const updatedUser = await updateUserService(req.params.id, name, email);
        if (!updatedUser) return handleResponse(res, 404, 'User Not Found');
        handleResponse(res, 200, 'User updated successfully.', updatedUser);
    } catch (err) {
        next(err);
    }
};

const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await deleteUserService(req.params.id);
        if (!deletedUser) return handleResponse(res, 404, 'User Not Found');
        handleResponse(res, 200, 'User removed successfully.', deletedUser);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};
