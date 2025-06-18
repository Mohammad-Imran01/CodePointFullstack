import {
    FETCH_INSTRUCTORS_REQUEST,
    FETCH_INSTRUCTORS_SUCCESS,
    FETCH_INSTRUCTORS_FAILURE,
    ADD_INSTRUCTOR_REQUEST,
    ADD_INSTRUCTOR_SUCCESS,
    ADD_INSTRUCTOR_FAILURE,
    UPDATE_INSTRUCTOR_REQUEST,
    UPDATE_INSTRUCTOR_SUCCESS,
    UPDATE_INSTRUCTOR_FAILURE,
    DELETE_INSTRUCTOR_REQUEST,
    DELETE_INSTRUCTOR_SUCCESS,
    DELETE_INSTRUCTOR_FAILURE,
} from "../constants/productConstants";

const initialState = {
    loading: false,
    data: [],
    error: null,
};

const instructorReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_INSTRUCTORS_REQUEST:
        case ADD_INSTRUCTOR_REQUEST:
        case UPDATE_INSTRUCTOR_REQUEST:
        case DELETE_INSTRUCTOR_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_INSTRUCTORS_SUCCESS:
            return { ...state, loading: false, data: action.payload };

        case ADD_INSTRUCTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload],
            };

        case UPDATE_INSTRUCTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.map((instructor) =>
                    instructor._id === action.payload._id ? action.payload : instructor
                ),
            };

        case DELETE_INSTRUCTOR_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.filter((instructor) => instructor._id !== action.payload),
            };

        case FETCH_INSTRUCTORS_FAILURE:
        case ADD_INSTRUCTOR_FAILURE:
        case UPDATE_INSTRUCTOR_FAILURE:
        case DELETE_INSTRUCTOR_FAILURE:
            return { ...state, loading: false, error: action.payload };

        default:
            return state;
    }
};

export default instructorReducer;
