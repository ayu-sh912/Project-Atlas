require('dotenv').config();

const mongoose = require('mongoose');

const Building = require('../models/Building');
const Facility = require('../models/Facility');

const buildings = require('../../../campus-data/buildings.json');
const facilities = require('../../../campus-data/facilities.json');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log('MongoDB connected');

    await Building.deleteMany({});
    await Facility.deleteMany({});

    await Building.insertMany(buildings);
    await Facility.insertMany(facilities);

    console.log('Campus data seeded successfully');

    await mongoose.connection.close();

    console.log('MongoDB connection closed');

    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error.message);

    process.exit(1);
  }
};

seedDatabase();