const Job = require('../models/Job');

exports.createJob = async (req, res) => {
  try {
    const { title, description, experienceLevel, candidates, endDate } = req.body;
    const job = new Job({
      company: req.company._id,
      title,
      description,
      experienceLevel,
      candidates,
      endDate,
    });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find({ company: req.company._id });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};