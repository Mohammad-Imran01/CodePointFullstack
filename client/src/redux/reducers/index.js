import { combineReducers } from "redux";

import postsReducer from "./posts";
import authReducer from "./auth";
import communityReducer from "./community";
import moderationReducer from "./moderation";
import userReducer from "./user";
import adminReducer from "./admin";

import coursesReducer from "./product";
import instructorReducer from "./instructor"


const rootReducer = combineReducers({
  posts: postsReducer,
  auth: authReducer,
  community: communityReducer,
  moderation: moderationReducer,
  user: userReducer,
  admin: adminReducer,
  courses: coursesReducer,
  instructors: instructorReducer,
});

export default rootReducer;
