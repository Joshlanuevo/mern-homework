import axios from 'axios';

const API_URL = '/api/homeworks/';

// Create new homework
const createHomework = async (homeworkData, token) => {
    const config = {
         headers: {
            Authorization: `Bearer ${token}`
         }
    }

    const response = await axios.post(API_URL, homeworkData, config);

    return response.data;
}

// Get user homeworks
const getHomework = async (token) => {
    const config = {
         headers: {
            Authorization: `Bearer ${token}`
         }
    }

    const response = await axios.get(API_URL, config);

    return response.data;
}

// Update homework
const updateHomework = async (homeworkData, token) => {
    const config = {
         headers: {
            Authorization: `Bearer ${token}`
         }
    }

    const response = await axios.put(API_URL+ homeworkData._id, homeworkData, config);

    return response.data;
}

// Delete user homework
const deleteHomework = async (homeworkId, token) => {
    const config = {
         headers: {
            Authorization: `Bearer ${token}`
         }
    }

    const response = await axios.delete(API_URL+ homeworkId, config);

    return response.data;
}

const homeworkService = {
    createHomework,
    getHomework,
    updateHomework,
    deleteHomework
}

export default homeworkService;