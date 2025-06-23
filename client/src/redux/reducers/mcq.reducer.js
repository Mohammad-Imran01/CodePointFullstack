import {
    FETCH_MCQs_REQUEST,
    FETCH_MCQs_SUCCESS,
    FETCH_MCQs_FAILURE,
    ADD_MCQ_REQUEST,
    ADD_MCQ_SUCCESS,
    ADD_MCQ_FAILURE,
    UPDATE_MCQ_REQUEST,
    UPDATE_MCQ_SUCCESS,
    UPDATE_MCQ_FAILURE,
    DELETE_MCQ_REQUEST,
    DELETE_MCQ_SUCCESS,
    DELETE_MCQ_FAILURE,
} from "../constants/mcqConstants";


const initialState = {
    loading: false,
    data: [],
    error: null,
}

const mcqReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MCQs_REQUEST:
        case ADD_MCQ_REQUEST:
        case UPDATE_MCQ_REQUEST:
        case DELETE_MCQ_REQUEST:
            return { ...state, loading: true, error: null };

        case FETCH_MCQs_SUCCESS:
            return { ...state, loading: false, data: action.payload }

        case ADD_MCQ_SUCCESS:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload]
            }
        case UPDATE_MCQ_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.map(
                    (mcq) => (mcq._id === action.payload._id ? action.payload : mcq)
                )
            }

        case DELETE_MCQ_SUCCESS:
            return {
                ...state,
                loading: false,
                data: state.data.filter((mcq) => mcq._id !== action.payload)
            }

        case FETCH_MCQs_FAILURE:
        case ADD_MCQ_FAILURE:
        case UPDATE_MCQ_FAILURE:
        case DELETE_MCQ_FAILURE:
            return { ...state, loading: false, error: action.payload }

        default:
            return state;
    }
}

export default mcqReducer