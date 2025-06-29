const Community = require("../models/community.model");
const User = require("../models/user.model");
const Post = require("../models/post.model");
const Course = require('../models/course.model')
const Instructor = require('../models/instructor.model')

const search = async (req, res) => {
  try {
    const searchQuery = req.query.q;
    const userId = req.userId || null;
    const communities = userId ?
      await Community.find({ members: userId }).distinct(
        "_id"
      ) : []

    const joinedCommunity = userId
      ? await Community.findOne({
        $text: { $search: searchQuery },
        members: { $in: [userId] }, // wrap in array
      }).select("_id name description banner members")
      : null;
    const community = userId
      ? await Community.findOne({
        $text: { $search: searchQuery },
        members: { $nin: [userId] }, // wrap in array
      }).select("_id name description banner members")
      : await Community.findOne({
        $text: { $search: searchQuery }
      }).select("_id name description banner members");


    const [users, posts, /*joinedCommunity, community,*/ courses, instructors] = await Promise.all([
      User.find(
        { $text: { $search: searchQuery } },
        { score: { $meta: "textScore" } }
      )
        .select("_id name email avatar")
        .sort({ score: { $meta: "textScore" } })
        .lean(),
      Post.find({
        community: { $in: communities },
        $text: { $search: searchQuery },
      })
        .select("_id content")
        .populate("user", "name avatar")
        .populate("community", "name")
        .lean()
        .exec(),
      // Community.findOne({
      //   $text: { $search: searchQuery },
      //   members: { $in: userId },
      // }).select("_id name description banner members"),
      // Community.findOne({
      //   $text: { $search: searchQuery },
      //   members: { $nin: userId },
      // }).select("_id name description banner members"),
      Course.find(
        { $text: { $search: searchQuery } },
        { score: { $meta: "textScore" } }
      ).select("_id title description price level")
        .sort({ score: { $meta: "textScore" } })
        .lean(),

      Instructor.find(
        { $text: { $search: searchQuery } },
        { score: { $meta: "textScore" } }
      ).select("_id name expertise experience")
        .sort({ score: { $meta: "textScore" } })
        .lean(),
    ]);

    posts.forEach((post) => {
      if (post.content.length > 30) {
        post.content = post.content.substring(0, 30) + "...";
      }
    });

    res.status(200).json({
      posts,
      users,
      community,
      joinedCommunity,
      courses,
      instructors,
    });
  } catch (error) {
    res.status(500).json({ message: "An error occurred" });
  }
};

module.exports = search;
