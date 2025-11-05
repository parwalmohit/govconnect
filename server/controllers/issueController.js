import Issue from "../models/issueModel.js";

// USER: Report a new issue
export const createIssue = async (req, res) => {
  try {
    const { title, description, category, state, location } = req.body;

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null; 

    const issue = new Issue({
      title,
      description,
      category,
      state,
      location,
      imageUrl,
      user: req.user._id,
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
    const issues = await Issue.find({ user: req.user._id }).sort({ createdAt: -1 });
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
