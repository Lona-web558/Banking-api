const { loadDB, saveDB } = require("./database");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        const db = loadDB();

        // Check local JSON array instead of MongoDB
        const existingUser = db.users.find(u => u.email === email);
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const accountNumber = Math.floor(1000000000 + Math.random() * 9000000000).toString();

        const newUser = {
            _id: Date.now().toString(), // Generate a simple ID
            fullName,
            email,
            password: hashedPassword,
            accountNumber,
            balance: 0 // Ensure balance is initialized for dashboard.js!
        };

        db.users.push(newUser);
        saveDB(db);

        // Don't send the password back in the response
        const { password: _, ...userWithoutPassword } = newUser;

        res.status(201).json({
            message: "Registration Successful",
            user: userWithoutPassword
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
