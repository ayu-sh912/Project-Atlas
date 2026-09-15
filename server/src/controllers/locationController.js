const Building = require('../models/Building');
const Facility = require('../models/Facility');

const getLocations = async (req, res) => {
  try {
    const [buildings, facilities] = await Promise.all([
      Building.find(),
      Facility.find(),
    ]);

    res.status(200).json({
      success: true,
      data: {
        buildings,
        facilities,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch locations',
    });
  }
};

const getBuildings = async (req, res) => {
  try {
    const buildings = await Building.find();

    res.status(200).json({
      success: true,
      data: buildings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch buildings',
    });
  }
};

const getFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();

    res.status(200).json({
      success: true,
      data: facilities,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch facilities',
    });
  }
};

module.exports = {
  getLocations,
  getBuildings,
  getFacilities,
};