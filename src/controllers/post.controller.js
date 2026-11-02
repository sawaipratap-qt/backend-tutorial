import mongoose from "mongoose";
import Post from "../models/post.model.js";

// Helper — validate MongoDB ObjectId
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// POST /api/v1/posts/create
export const createPost = async (req, res, next) => {
  try {
    const { name, description, age } = req.body;

    if (!name || !description || age === undefined) {
      return res
        .status(400)
        .json({ success: false, message: "name, description, and age are required" });
    }

    const post = await Post.create({ name, description, age });

    return res.status(201).json({
      success: true,
      message: "Post created successfully",
      data: post,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/posts
export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: posts.length,
      data: posts,
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/v1/posts/:id
export const getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const post = await Post.findById(id);
    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({ success: true, data: post });
  } catch (error) {
    next(error);
  }
};

// PUT /api/v1/posts/:id
export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const { name, description, age } = req.body;

    if (!name && !description && age === undefined) {
      return res.status(400).json({
        success: false,
        message: "Provide at least one field to update (name, description, age)",
      });
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { ...(name && { name }), ...(description && { description }), ...(age !== undefined && { age }) },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /api/v1/posts/:id
export const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid post ID" });
    }

    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
      return res
        .status(404)
        .json({ success: false, message: "Post not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Post deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    next(error);
  }
};
