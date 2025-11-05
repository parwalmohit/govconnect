import express from "express";
import {
  createIssue,
  getUserIssues,
  getAllIssues,
  updateIssueStatus,
  deleteIssue,
} from "../controllers/issueController.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// USER ROUTES
router.post("/", protect, upload.single("image"), createIssue);
router.get("/my", protect, getUserIssues);

// ADMIN ROUTES
router.get("/", protect, adminOnly, getAllIssues);
router.put("/:id", protect, adminOnly, updateIssueStatus);
router.delete("/:id", protect, adminOnly, deleteIssue);

export default router;
