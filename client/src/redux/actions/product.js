import { API, ADMIN_API, handleApiError } from "../api/utils";
import {
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_FAILURE,
    ADD_COURSE_REQUEST,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_FAILURE,
} from "../constants/productConstants";

export const fetchCourses = () => async (dispatch) => {
    dispatch({ type: FETCH_COURSES_REQUEST });

    try {
        const response = await API.get("/products/courses");
        console.log("res", response.data)
        dispatch({ type: FETCH_COURSES_SUCCESS, payload: response.data });
    } catch (error) {
        const { error: message } = await handleApiError(error);
        dispatch({ type: FETCH_COURSES_FAILURE, payload: message });
    }
};

export const addCourse = (courseData) => async (dispatch) => {
    dispatch({ type: ADD_COURSE_REQUEST });

    try {
        const response = await ADMIN_API.post("/courses/addCourse", courseData);
        dispatch({ type: ADD_COURSE_SUCCESS, payload: response.data.course });
    } catch (error) {
        const { error: message } = await handleApiError(error);
        dispatch({ type: ADD_COURSE_FAILURE, payload: message });
    }
};
