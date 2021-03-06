const Orders = require('../models/orderModel');
const Users = require('../models/userModel');
const Products = require('../models/productModel');

const orderController = {
  getOrders: async (req, res) => {
    try {
      const orders = await Orders.find();
      res.json(orders);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createOrder: async (req, res) => {
    try {
      const user = await Users.findById(req.user.id).select(
        'name email address'
      );
      if (!user)
        return res.status(500).json({ msg: 'Người dùng không tôn tại.' });

      const { cart, total } = req.body;
      const { _id, name, email, address } = user;

      const newOrder = new Orders({
        user_id: _id,
        name,
        email,
        cart,
        address,
        total,
      });

      cart.filter((item) => {
        return sold(item._id, item.quantity, item.sold);
      });
      await newOrder.save();
      res.json({ msg: 'Đặt hàng thành công !' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateOrder: async (req, res) => {
    try {
      const user = await Orders.findOneAndUpdate(
        { _id: req.params.id },
        { status: true }
      );
      console.log(user.id);
      res.json({ msg: 'Cập nhật đơn hàng thành công !' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};
const sold = async (id, quantity, oldSold) => {
  await Products.findOneAndUpdate({ _id: id }, { sold: quantity + oldSold });
};
module.exports = orderController;
