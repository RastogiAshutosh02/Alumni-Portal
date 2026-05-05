const { body, validationResult } = require('express-validator');

// Middleware: check validation results and return errors
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
};

// Allowed email domains
const getAllowedDomains = () => {
  const domains = process.env.ALLOWED_EMAIL_DOMAINS || 'iitism.ac.in,ismu.ac.in';
  return domains.split(',').map((d) => d.trim());
};

// ── Registration Validators ──
const registerValidation = [
  body('email')
    .isEmail().withMessage('Valid email is required')
    .custom((value) => {
      const domain = value.split('@')[1];
      if (!getAllowedDomains().includes(domain)) {
        throw new Error('Only @iitism.ac.in or @ismu.ac.in email addresses are allowed');
      }
      return true;
    }),
  body('password')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/[A-Z]/).withMessage('Password must contain an uppercase letter')
    .matches(/[0-9]/).withMessage('Password must contain a number')
    .matches(/[!@#$%^&*]/).withMessage('Password must contain a special character'),
  body('full_name')
    .trim().notEmpty().withMessage('Full name is required')
    .isLength({ max: 255 }).withMessage('Name too long'),
  body('batch_year')
    .optional()
    .isInt({ min: 1926, max: 2030 }).withMessage('Invalid batch year'),
  body('department')
    .optional()
    .isLength({ max: 255 }),
  validate,
];

// ── Login Validators ──
const loginValidation = [
  body('email').isEmail().withMessage('Valid email is required'),
  body('password').notEmpty().withMessage('Password is required'),
  validate,
];

// ── Job Post Validators ──
const jobValidation = [
  body('title').trim().notEmpty().withMessage('Job title is required'),
  body('company').trim().notEmpty().withMessage('Company name is required'),
  body('description').trim().notEmpty().withMessage('Description is required'),
  body('job_type').optional().isIn(['Full-time', 'Part-time', 'Internship', 'Contract', 'Remote']),
  body('visibility').optional().isIn(['public', 'admin']),
  validate,
];

// ── Message Validators ──
const messageValidation = [
  body('content').trim().notEmpty().withMessage('Message content is required')
    .isLength({ max: 5000 }).withMessage('Message too long'),
  validate,
];

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  jobValidation,
  messageValidation,
};
