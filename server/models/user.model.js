const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    location: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
    },

    interests: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["general", "moderator", "admin"],
      default: "general",
    },

    savedPosts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
        default: [],
      },
    ],
    coursesTaken: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        default: [],
      },
    ],
    coursesCreated: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
        default: [],
      },
    ],

    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    ttlDeleteAt: {
      type: Date,
      default: null,
      index: { expireAfterSeconds: 0 }, // TTL triggers deletion
    },
  },
  {
    timestamps: true,
  }
);

userSchema.index({ name: "text" });
module.exports = mongoose.model("User", userSchema);
