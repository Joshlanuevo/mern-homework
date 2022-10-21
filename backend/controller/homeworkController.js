const asyncHandler = require('express-async-handler');

const Homework = require('../models/homeworkModel');
const User = require('../models/userModel');

// @desc Get Homework
// @route GET /api/homework
// @access Private
const getHomework = asyncHandler(async (req, res) => {
    const homeworks = await Homework.find({ user: req.user.id });

    res.status(200).json(homeworks);
});

// @desc Set Homework
// @route POST /api/homework
// @access Private
const setHomework = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    const homework = await Homework.create({
        text: req.body.text,
        user: req.user.id
    })

    res.status(200).json(homework);
});

// @desc Update Homework
// @route PUT /api/homework:id
// @access Private
const updateHomework = asyncHandler(async (req, res) => {
    const homework = await Homework.findById(req.params.id);

    if (!homework) {
        req.status(400);
        throw new Error('Homework not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the goal user
    if (homework.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedHomework = await Homework.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedHomework);
});

// @desc Delete Homework
// @route DELETE /api/homework:id
// @access Private
const deleteHomework = asyncHandler(async (req, res) => {
    const homework = await Homework.findById(req.params.id);

    if (!homework) {
        req.status(400);
        throw new Error('Homework not found');
    }

    // Check for user
    if (!req.user) {
        res.status(401);
        throw new Error('User not found');
    }

    // Make sure the logged in user matches the goal user
    if (homework.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await homework.remove();

    res.status(200).json({ id: req.params.id });
});

module.exports = {
    getHomework,
    setHomework,
    updateHomework,
    deleteHomework
}