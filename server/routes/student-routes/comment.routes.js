import express from "express";
import { authenticateMiddleware } from "../../middleware/auth-middleware.js";
import {
  createComment,
  deleteComment,
  editComment,
  getCourseComments,
} from "../../controllers/student-controller/comment.controller.js";

const router = express.Router();

router.post("/create-comment", authenticateMiddleware, createComment);
router.get("/getAllcomments/:courseId", getCourseComments);
router.put("/editComment/:commentId", editComment);
router.delete("/deleteComment/:commentId", deleteComment);

export default router;
