import db from "../config/db.js";

export const deleteUser = (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ error: 'Missing user ID' });
    }

    const sql = "DELETE FROM users WHERE id = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting user:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('user deleted');
        res.status(200).json({ message: "User deleted successfully" });
    });
};

export const deleteSeller = (req, res) => {
    const id = req.params.id;
    console.log(id);

    if (!id) {
        return res.status(400).json({ error: 'Missing  ID' });
    }

    const sql = "DELETE FROM sellers WHERE id = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting ', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('seller center deleted');
        res.status(200).json({ message: "Deleted successfully" });
    });
};

export const deleteProduct = (req, res) => {
    const id = req.params.id;
    
    console.log("hyy",id);
    if (!id) {
        return res.status(400).json({ error: 'Missing product ID' });
    }

    const sql = "DELETE FROM products WHERE id = ?";
    const values = [id];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error deleting product:', err);
            return res.status(500).json({ error: 'Internal server error' });
        }
        console.log('product deleted');
        res.status(200).json({ message: "product deleted successfully" });
    });
};
