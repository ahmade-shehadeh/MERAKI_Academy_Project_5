const pool = require("../models/db");

const createNewNotification = (req,res) => {
    const {description,status,receiver_user_id} = req.body
    const order_id  = req.params.order_id

    const data = [description || null, status || null, receiver_user_id || null,order_id||null]
    const query=`INSERT INTO notifications (description, status, receiver_user_id,order_id) VALUES($1,$2,$3,$4) RETURNING *;`
    pool
    .query(query,data)
    .then((result) => {
        res.status(200).json({
          success: true,
          message: "new notifications created",
          order: result.rows
        });
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: "server error",
          err:err.message,
        });
      });
}

const getNotificationById = (req,res) => {
    const user_id  = req.token.userId
    const query=`SELECT * FROM notifications WHERE receiver_user_id = ${user_id };`
    pool
    .query(query)
    .then((result) => {
        res.status(200).json({
          success: true,
          message: "notification get successfuly",
          notification: result.rows
        });
      })
      .catch((err) => {
        res.status(409).json({
          success: false,
          message: "server error",
          err:err.message,
        });
        console.log(err.message);
      });
}



module.exports={
    createNewNotification,
    getNotificationById
}