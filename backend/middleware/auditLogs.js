const { AuditLog } = require("../models/initModels");

const auditLog = async (req, res, next) => {
  const { method, originalUrl, body } = req;
  const timestamp = new Date().toISOString();

  try {
    await AuditLog.create({
      method,
      url: originalUrl,
      body: JSON.stringify(body),
      timestamp,
    });

    next();
  } catch (error) {
    console.error("Error creating audit log:", error);
    next(error); // Pass error to the error handling middleware
  }
};

module.exports = { auditLog };
