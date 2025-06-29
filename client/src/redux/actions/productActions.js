import { API, ADMIN_API, handleApiError } from "../api/utils";
import * as Const from "../constants/productConstants";

//***************************************************************** */
//******************* ------- COURSES ------ ********************** */
// ✅ Fetch all courses (Public API)
export const fetchCourses = () => async (dispatch) => {
    dispatch({ type: Const.FETCH_COURSES_REQUEST });

    try {
        const response = await API.get("/products/courses");
        dispatch({ type: Const.FETCH_COURSES_SUCCESS, payload: response.data });
    } catch (error) {
        const { error: message } = await handleApiError(error);
        dispatch({ type: Const.FETCH_COURSES_FAILURE, payload: message });
    }
};

// ✅ Fetch a course by id (Public API)
export const fetchCourseById = (id) => async (dispatch) => {
    dispatch({ type: Const.FETCH_COURSE_BY_ID_REQUEST });
    try {
        const response = await API.get(`/products/course/${id}`);
        dispatch({ type: Const.FETCH_COURSE_BY_ID_SUCCESS, payload: response });
        console.log('response.data', response.data)
        return response.data; // <-- Add this!
    } catch (error) {
        const { error: message } = await handleApiError(error);
        dispatch({ type: Const.FETCH_COURSE_BY_ID_FAILURE, payload: message });
        throw error; // <-- Optionally throw for error handling
    }
};


// actions/productActions.js

export const fetchTakenCourses = (courseIds) => async (dispatch) => {
    dispatch({ type: Const.FETCH_TAKEN_COURSES_REQUEST });
    try {
        const taken = [];
        for (let id of courseIds) {
            const res = await dispatch(fetchCourseById(id));
            if (res) taken.push(res);
        }
        dispatch({ type: Const.FETCH_TAKEN_COURSES_SUCCESS, payload: taken });
    } catch (error) {
        dispatch({ type: Const.FETCH_TAKEN_COURSES_FAILURE, payload: error.message });
    }
};
export const fetchCreatedCourses = (courseIds) => async (dispatch) => {
    dispatch({ type: Const.FETCH_CREATED_COURSES_REQUEST });
    try {
        const created = [];
        for (let id of courseIds) {
            const res = await dispatch(fetchCourseById(id));
            if (res) created.push(res);
        }
        dispatch({ type: Const.FETCH_CREATED_COURSES_SUCCESS, payload: created });
    } catch (error) {
        dispatch({ type: Const.FETCH_CREATED_COURSES_FAILURE, payload: error.message });
    }
};


// ✅ Add new course (Admin API)
export const addCourse = (courseData) => async (dispatch) => {
    dispatch({ type: Const.ADD_COURSE_REQUEST });

    try {
        const response = await ADMIN_API.post("/products/course", courseData);
        dispatch({ type: Const.ADD_COURSE_SUCCESS, payload: response.data.course });
    } catch (error) {
        const { error: message } = await handleApiError(error);
        dispatch({ type: Const.ADD_COURSE_FAILURE, payload: message });
    }
};

// ✅ Update a course (Admin API)
export const updateCourse = (courseId, updatedData) => async (dispatch) => {
    dispatch({ type: Const.UPDATE_COURSE_REQUEST });

    try {
        const response = await ADMIN_API.put(`/products/course/${courseId}`, updatedData);
        dispatch({ type: Const.UPDATE_COURSE_SUCCESS, payload: response.data.course });
    } catch (error) {
        const { error: message } = await handleApiError(error);
        dispatch({ type: Const.UPDATE_COURSE_FAILURE, payload: message });
    }
};

// ✅ Delete a course (Admin API)
export const deleteCourse = (courseId) => async (dispatch) => {
    dispatch({ type: Const.DELETE_COURSE_REQUEST });

    try {
        await ADMIN_API.delete(`products/course/${courseId}`);
        dispatch({ type: Const.DELETE_COURSE_SUCCESS, payload: courseId });
    } catch (error) {
        const { error: message } = await handleApiError(error);
        dispatch({ type: Const.DELETE_COURSE_FAILURE, payload: message });
    }
};

//***************************************************************** */
//******************* ----- INSTRUCTOR ----- ********************** */
// ✅ Fetch all instructors (Public API)
export const fetchInstructors = () => async (dispatch) => {
    dispatch({ type: Const.FETCH_INSTRUCTORS_REQUEST });

    try {
        const response = await API.get("/products/instructors");
        dispatch({ type: Const.FETCH_INSTRUCTORS_SUCCESS, payload: response.data });
    } catch (error) {
        const { error: message } = await handleApiError(error);
        dispatch({ type: Const.FETCH_INSTRUCTORS_FAILURE, payload: message });
    }
};

// ✅ Add new instructor (Admin API)
export const addInstructor = (instructorData) => async (dispatch) => {
    dispatch({ type: Const.ADD_INSTRUCTOR_REQUEST });

    try {
        const response = await ADMIN_API.post("/products/instructor", instructorData);
        dispatch({
            type: Const.ADD_INSTRUCTOR_SUCCESS,
            payload: response.data.instructor,
        });
    } catch (error) {
        const { error: message } = await handleApiError(error);
        dispatch({ type: Const.ADD_INSTRUCTOR_FAILURE, payload: message });
    }
};

// ✅ Update an instructor (Admin API)
export const updateInstructor = (instructorId, updatedData) => async (dispatch) => {
    dispatch({ type: Const.UPDATE_INSTRUCTOR_REQUEST });

    try {
        console.log('productaction.js updated data', updatedData)
        const response = await ADMIN_API.put(`/products/instructor/${instructorId}`, updatedData);
        dispatch({
            type: Const.UPDATE_INSTRUCTOR_SUCCESS,
            payload: response.data.instructor,
        });
    } catch (error) {
        const { error: message } = await handleApiError(error);
        dispatch({ type: Const.UPDATE_INSTRUCTOR_FAILURE, payload: message });
    }
};

// ✅ Delete an instructor (Admin API)
export const deleteInstructor = (instructorId) => async (dispatch) => {
    dispatch({ type: Const.DELETE_INSTRUCTOR_REQUEST });

    try {
        console.log('request to remove this instructor', instructorId)

        await ADMIN_API.delete(`/products/instructor/${instructorId}`);
        dispatch({ type: Const.DELETE_INSTRUCTOR_SUCCESS, payload: instructorId });
    } catch (error) {
        const { error: message } = await handleApiError(error);
        dispatch({ type: Const.DELETE_INSTRUCTOR_FAILURE, payload: message });
    }
};
//***************************************************************** */