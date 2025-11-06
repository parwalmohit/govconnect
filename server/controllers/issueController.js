import Issue from "../models/issueModel.js";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// USER: Report a new issue
export const createIssue = async (req, res) => {
  try {
    const { title, description, category, state, location } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }
    const imageUrl = `/uploads/${req.file.filename}`;

    // Default priority
    let priority = "medium";

    // Try AI prioritization
    try {
      const prompt = `You are an AI civic issue prioritization assistant.
Your task is to read a user's complaint and assign one of three priority levels:

- "high" → Urgent, affects safety, health, or essential public services (e.g., water leaks, electrical hazards, major road damage, sewage overflow, public health risks)
- "medium" → Important but not life-threatening, affects daily comfort or convenience (e.g., potholes, streetlight issues, garbage collection delays)
- "low" → Minor or aesthetic issues (e.g., park maintenance, graffiti, minor cosmetic issues)

Input from user:
Title: ${title}
Description: ${description}
Category: ${category}
State: ${state}
Location: ${location}

Analyze the severity and impact of this issue. If the title or description is gibberish, empty, or irrelevant, return "low".

Respond with ONLY ONE lowercase word: high, medium, or low.
No explanation, no punctuation, just the word.`;

      const result = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
      });

      const aiResponse = result.text.trim().toLowerCase().replace(/[^a-z]/g, '');

      if (["high", "medium", "low"].includes(aiResponse)) {
        priority = aiResponse;
        console.log("✅ AI Priority set to:", priority);
      } else {
        console.log("⚠️ Invalid AI response:", aiResponse, "- using default priority");
      }
    } catch (aiError) {
      console.error("⚠️ AI Priority Generation Error:", aiError.message);
      console.log("📌 Using default priority: medium");
    }

    const issue = new Issue({
      title,
      description,
      category,
      state,
      location,
      imageUrl,
      status: "pending",
      user: req.user._id,
      priority,
    });

    await issue.save();
    res.status(201).json({ message: "Issue reported successfully", issue });
  } catch (error) {
    console.error("Create Issue Error:", error.message);
    res.status(500).json({ message: "Failed to create issue" });
  }
};

// USER: Get all issues created by logged-in user
export const getUserIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(issues);
  } catch (error) {
    console.error("Get User Issues Error:", error.message);
    res.status(500).json({ message: "Failed to fetch user issues" });
  }
};

// ADMIN: Get all issues
export const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });
    res.json(issues);
  } catch (error) {
    console.error("Get All Issues Error:", error.message);
    res.status(500).json({ message: "Failed to fetch all issues" });
  }
};

// ADMIN: Update issue status
export const updateIssueStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const issue = await Issue.findById(id);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    issue.status = status;
    await issue.save();

    res.json({ message: "Issue status updated", issue });
  } catch (error) {
    console.error("Update Issue Error:", error.message);
    res.status(500).json({ message: "Failed to update issue" });
  }
};

// ADMIN: Delete issue
export const deleteIssue = async (req, res) => {
  try {
    const { id } = req.params;
    await Issue.findByIdAndDelete(id);
    res.json({ message: "Issue deleted successfully" });
  } catch (error) {
    console.error("Delete Issue Error:", error.message);
    res.status(500).json({ message: "Failed to delete issue" });
  }
};