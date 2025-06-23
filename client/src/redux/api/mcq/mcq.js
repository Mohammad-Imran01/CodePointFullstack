// Imports
import { API, ADMIN_API, handleApiError } from "../../api/utils";

// ============================================
// ✅ Get all generic MCQs
// Method: GET /products/genericMCQs
// ============================================
export const getAllMCQs = async () => {
    try {
        const { data } = await API.get("/products/genericMCQs");
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

// ============================================
// ✅ Get a single MCQ by ID
// Method: GET /products/genericMCQs/:id
// ============================================
export const getMCQById = async (idParam) => {
    try {
        const { data } = await API.get(`/products/genericMCQs/${idParam}`);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

// ============================================
// ✅ Add a new MCQ
// Method: POST /products/genericMCQs
// ============================================
export const addMCQ = async (mcqData) => {
    try {
        const { data } = await ADMIN_API.post(`/products/genericMCQs`, mcqData);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

// ============================================
// ✅ Update an existing MCQ by ID
// Method: PUT /products/genericMCQs/:id
// ============================================
export const setMCQById = async (idParam, mcqData) => {
    try {
        console.log('const setMCQById = async (idParam, mcqData)', mcqData)
        const { data } = await ADMIN_API.put(`/products/genericMCQs/${idParam}`, mcqData);
        return { error: null, data };
    } catch (error) {
        return handleApiError(error);
    }
};

// ============================================
// ✅ Delete an MCQ by ID
// Method: DELETE /products/genericMCQs/:id
// ============================================
export const deleteMCQById = async (idParam) => {
    try {
        const { data } = await ADMIN_API.delete(`/products/genericMCQs/${idParam}`);

        console.log('after delete', data)
        return { error: null, data };
    } catch (error) {
        console.log('error', error)
        return handleApiError(error);
    }
};
