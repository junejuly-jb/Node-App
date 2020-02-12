module.exports = (express, db) => {
    const api = express.Router();

    api.get("/users", async (req, res) => {
        let sql = "SELECT * FROM users";
        const result = await db.query(sql);

        const users = [];
        for (let i = 0; i < result.length; i++) {
            users.push({
                id: result[i].id,
                lname: result[i].lname,
                fname: result[i].fname,
                age: result[i].age
            });
        }
        return res.status(200).json({
            success: true,
            message: "Users successfully retrived",
            data: users
        });
    });
    api.get("/viewUserInfo/:id", async (req, res) =>{
        const id = req.params.id;

        let viewSql = "SELECT * FROM users WHERE id = ?";
        const viewResult = await db.query(viewSql, [id]);

        user = [];
        for(let i = 0; i < viewResult.length; i++){
            user.push({
                id: viewResult[i].id,
                fname: viewResult[i].fname,
                lname: viewResult[i].lname,
                age: viewResult[i].age
            });
        }
        return res.status(200).json({
            success: true,
            data: user
        });
    });
    api.post("/createUser", async (req, res) => {
        const fname = req.body.fname;
        const lname = req.body.lname;
        const age = req.body.age;

        let sqlInsert = "INSERT INTO users(fname,lname,age) VALUES(?,?,?)";
        try {
            await db.query(sqlInsert, [fname, lname, age]);
            return res.status(200).json({
                success: true,
                message: "Successfully inserted!"
            });
        }
        catch (err) {
            return res.status(500).json({
                success: false,
                message: "User not inserted!"
            });
        }

    });

    api.delete("/deleteUser/:id", async (req, res) => {
        const id = req.params.id;
        const sqlDel = "DELETE FROM users WHERE id=?";
        try {
            await db.query(sqlDel, [id]);
        } catch (err) {
            await db.rollback();
            res.redirect('/')
        } finally {
            await db.commit();
            res.redirect('/')
            req.flash('success', 'User deleted successfully! id = ' + id)
        }
        return res.status(200).json({
            message: "Successfully Deleted!",
            success: true
        });

    });

    api.put("/updateUsers/:id", async (req, res) => {
        const id = req.params.id;
        const sqlUpdate = "UPDATE users SET fname = ?, lname = ?, age = ? WHERE id = ?";

        const { fname, lname, age } = req.body;

        try {
            await db.query(sqlUpdate, [fname, lname, age, id]);
        }
        catch (err) {
            await db.rollback();
            return res.status(500).json({
                success: false,
                message: "Update failed"
            });
        }
        finally {
            await db.commit();
        }

        return res.status(200).json({
            success: true,
            message: "Successfully edited!"
        });
    });
    return api;
}