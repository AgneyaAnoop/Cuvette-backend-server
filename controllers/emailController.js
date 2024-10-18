const Job = require('../models/Job');
const emailService = require('../services/emailService');

exports.sendJobAlerts = async (req, res) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate('company');
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }

    for (const candidateEmail of job.candidates) {
      await emailService.sendJobAlerts(candidateEmail, job);
    }

    res.json({ message: 'Job alerts sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}; 