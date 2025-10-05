const express = require('express');
const {
  listDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');

const protect = require('../middlewares/authMiddleware');
const authorizeRoles = require('../middlewares/authorizeRoles');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management
 */

/**
 * @swagger
 * /api/v1/doctors:
 *   get:
 *     summary: Get all active doctors (public)
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: List of active doctors
 */
router.get('/', listDoctors);

/**
 * @swagger
 * /api/v1/doctors:
 *   post:
 *     summary: Create a new doctor (admin only)
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - specialization
 *             properties:
 *               name:
 *                 type: string
 *               specialization:
 *                 type: string
 *               experience:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       201:
 *         description: Doctor created
 */
router.post('/', protect, authorizeRoles('admin'), createDoctor);

/**
 * @swagger
 * /api/v1/doctors/{id}:
 *   get:
 *     summary: Get a doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor found
 *       404:
 *         description: Doctor not found
 */
router.get('/:id', getDoctorById);

/**
 * @swagger
 * /api/v1/doctors/{id}:
 *   put:
 *     summary: Update a doctor (admin only)
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               specialization:
 *                 type: string
 *               experience:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [active, inactive]
 *     responses:
 *       200:
 *         description: Doctor updated
 */
router.put('/:id', protect, authorizeRoles('admin'), updateDoctor);

/**
 * @swagger
 * /api/v1/doctors/{id}:
 *   delete:
 *     summary: Delete a doctor (admin only)
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Doctor deleted
 */
router.delete('/:id', protect, authorizeRoles('admin'), deleteDoctor);

module.exports = router;
