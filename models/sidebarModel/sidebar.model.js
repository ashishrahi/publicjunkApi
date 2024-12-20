const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a schema for the grandchildren
const GrandchildSchema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
});

// Define a schema for the subItems
const SubItemSchema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  grandchildren: [GrandchildSchema], 
});

const MenuItemSchema = new Schema({
  sectionName: { type: String, required: true },
  name: { type: String, required: true },
  path: { type: String, required: true },
  subItems: [SubItemSchema], // Array of subItems
});

// Create the model for the MenuItems
const Sidebar = mongoose.model('Sidebar', MenuItemSchema);

module.exports = Sidebar;
