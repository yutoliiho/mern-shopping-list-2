const express = require('express');
const router = express.Router();

// Item models:
const Item = require('../../models/Items');

// get all items:
router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => res.json(items))
    .catch((e) => res.send(e));
});

// // get one item by id:
// router.get('/:id', async (req, res) => {
//   const _id = req.params.id;
//   const item = await Item.findOne({
//     _id,
//   });
//   res.send(item);
//   //   Item.findById(req.params.id)
//   //     .then((item) => item.json(items))
//   //     .catch((e) => res.status(404).json({ success: false }));
// });

// create one item:
router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  newItem.save().then((item) => res.json(item));
});

// delete one item by id:
router.delete('/:id', (req, res) => {
  Item.findById(req.params.id)
    .then((item) => item.remove().then(() => res.json({ success: true })))
    .catch((e) => {
      res.status(404).json({ success: false });
    });
});

module.exports = router;
