import db from "../config/db.js";


export const updateStatus = (req, res) => {
    const { id,status} = req.body;
    const sql = "UPDATE bookings SET status = ? WHERE id = ?";
    const values = [status,id];
    console.log(values,"values");
    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error updating Order status:', err);
            res.status(500).json({ error: 'Error updating Order status' });
            return;
        }
        console.log('Accepted successfully');
        res.status(200).json({ message: 'Order status updated successfully' });
    });
}