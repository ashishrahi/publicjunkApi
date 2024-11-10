const ContactUs = require('../../models/contactus/contactus.model')


// Create Contact
exports.createContact = async (req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        console.log(req.body)
        const newContact = new ContactUs({ name, email, phone, message });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: 'Error creating message', error });
    }
};

// get Contact

exports.getContact = async (req, res) => {
    try {
        const contact = await ContactUs.find();
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.json(contact);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving contact', error });
    }
};