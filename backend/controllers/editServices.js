import db from "../config/db.js";


export const updateUser = (req, res) => {
    const { id, name, email, password, phoneNumber, address} = req.body;

    const sql = "UPDATE users SET name = ?, email = ?, password = ?, phone_number = ?, address = ? WHERE user_id = ?";
    const values = [name, email, password, phoneNumber, address, id];
console.log(values);
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating user:', err);
            res.status(500).json({ error: 'Error updating User' });
            return;
        }
        console.log('User updated successfully');
        res.status(200).json({ message: 'User updated successfully' });
    });
}