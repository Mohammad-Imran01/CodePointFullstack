const {
    getAllUsersService,
    getUserByIdService,
    createUserService,
    updateUserService,
    deleteUserService,
} = require('../models/pgUserModel')

const handleResponse = (res, status, message, data = null) => {
    // userModel
    res.status(status).json({ status, message, data });
};

const createUser = async (req, res, next) => {
    const { name, email } = req.body
    try {
        const newUser = await createUserService(name, email);
        handleResponse(res, 201, 'User created succesfully.', newUser)
    } catch (e) {
        next(err)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const newUser = await getAllUsersService();
        handleResponse(res, 201, 'Users fetched succesfully.', newUser)
    } catch (e) {
        next(err)
    }
}
const getUserById = async (req, res, next) => {
    try {
        const newUser = await getUserByIdService(req.param.id);
        if (!newUser) return handleResponse(res, 404, 'User Not Found')
        handleResponse(res, 200, 'User fetched succesfully.', newUser)
    } catch (err) {
        next(err)
    }
}
const updateUser = async (req, res, next) => {
    const { name, email } = req.body
    try {
        const updatedUser = await updateUserService(res.param.id, name, email);
        if (!updatedUser) return handleResponse(res, 404, 'User Not Found')
        handleResponse(res, 200, 'User updated succesfully.', updatedUser)
    } catch (err) {
        next(err)
    }
}
const deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await deleteUserService(res.param.id);
        if (!deletedUser) return handleResponse(res, 404, 'User Not Found')
        handleResponse(res, 200, 'User removed succesfully.', deletedUser)
    } catch (err) {
        next(err)
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
};