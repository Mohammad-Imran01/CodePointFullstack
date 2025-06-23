import * as mcqAPI from "../../api/mcq/mcq";
import * as CONST from "../../constants/mcqConstants";

// ==================================================
// ✅ Fetch all MCQs
// ==================================================
export const getMCQsAction = () => async (dispatch) => {
    dispatch({ type: CONST.FETCH_MCQs_REQUEST });

    try {
        const { error, data } = await mcqAPI.getAllMCQs();
        if (error) throw new Error(error);

        dispatch({ type: CONST.FETCH_MCQs_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: CONST.FETCH_MCQs_FAILURE, payload: err.message });
    }
};

// ==================================================
// ✅ Get MCQ by ID
// ==================================================
export const getMCQByIdAction = (id) => async (dispatch) => {
    dispatch({ type: CONST.FETCH_MCQs_REQUEST });

    try {
        const { error, data } = await mcqAPI.getMCQById(id);
        if (error) throw new Error(error);

        dispatch({ type: CONST.FETCH_MCQs_SUCCESS, payload: [data] });
    } catch (err) {
        dispatch({ type: CONST.FETCH_MCQs_FAILURE, payload: err.message });
    }
};

// ==================================================
// ✅ Add a new MCQ
// ==================================================
export const addMCQAction = (mcqData) => async (dispatch) => {
    dispatch({ type: CONST.ADD_MCQ_REQUEST });

    try {
        const { error, data } = await mcqAPI.addMCQ(mcqData);
        if (error) throw new Error(error);

        dispatch({ type: CONST.ADD_MCQ_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: CONST.ADD_MCQ_FAILURE, payload: err.message });
    }
};

// ==================================================
// ✅ Update MCQ by ID
// ==================================================
export const setMCQByIdAction = (id, updatedData) => async (dispatch) => {
    dispatch({ type: CONST.UPDATE_MCQ_REQUEST });
    try {
        const { error, data } = await mcqAPI.setMCQById(id, updatedData);
        if (error) throw new Error(error);

        dispatch({ type: CONST.UPDATE_MCQ_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: CONST.UPDATE_MCQ_FAILURE, payload: err.message });
    }
};

// ==================================================
// ✅ Delete MCQ by ID
// ==================================================
export const deleteMCQAction = (id) => async (dispatch) => {
    dispatch({ type: CONST.DELETE_MCQ_REQUEST });

    try {
        const { error } = await mcqAPI.deleteMCQById(id);
        if (error) throw new Error(error);

        dispatch({ type: CONST.DELETE_MCQ_SUCCESS, payload: id });
    } catch (err) {
        dispatch({ type: CONST.DELETE_MCQ_FAILURE, payload: err.message });
    }
};
