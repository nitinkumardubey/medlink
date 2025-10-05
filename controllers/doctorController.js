const Doctor = require('../models/doctor');

// GET /api/v1/doctors - Public
const listDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({ status: 'active' });
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: 'Failed to load doctors' });
  }
};

// GET /api/v1/doctors/:id - Public
const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: 'Doctor not found' });
    res.json(doctor);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch doctor' });
  }
};

// POST /api/v1/doctors - Admin only
const createDoctor = async (req, res) => {
  try {
    const doctor = new Doctor(req.body);
    const saved = await doctor.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create doctor', error: err.message });
  }
};

// PUT /api/v1/doctors/:id - Admin only
const updateDoctor = async (req, res) => {
  try {
    const updated = await Doctor.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!updated) return res.status(404).json({ message: 'Doctor not found' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: 'Failed to update doctor', error: err.message });
  }
};

// DELETE /api/v1/doctors/:id - Admin only
const deleteDoctor = async (req, res) => {
  try {
    const deleted = await Doctor.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Doctor not found' });
    res.json({ message: 'Doctor deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete doctor' });
  }
};

module.exports = {
  listDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
};
