import { API, ADMIN_API, handleApiError } from "../api/utils";
import * as Const from "../constants/productConstants";

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
