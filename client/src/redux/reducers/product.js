import {
    FETCH_COURSES_REQUEST,
    FETCH_COURSES_SUCCESS,
    FETCH_COURSES_FAILURE,
    ADD_COURSE_REQUEST,
    ADD_COURSE_SUCCESS,
    ADD_COURSE_FAILURE,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAILURE,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAILURE,
} from "../constants/productConstants";

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const coursesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COURSES_REQUEST:
        case ADD_COURSE_REQUEST:
        case UPDATE_COURSE_REQUEST:
        case DELETE_COURSE_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_COURSES_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case ADD_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload],
            };

        case UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.map((course) =>
                    course._id === action.payload._id ? action.payload : course
                ),
            };

        case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.filter((course) => course._id !== action.payload),
            };

        case FETCH_COURSES_FAILURE:
        case ADD_COURSE_FAILURE:
        case UPDATE_COURSE_FAILURE:
        case DELETE_COURSE_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default coursesReducer;
