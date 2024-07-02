const express = require('express');
const Account = require('./accounts-model');
const { checkAccountPayload, checkAccountId, checkAccountNameUnique } = require('./accounts-middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
})

router.get('/:id', checkAccountId, (req, res) => {
  res.json(req.account);
})

router.post('/', checkAccountPayload, checkAccountNameUnique, async (req, res, next) => {
  try {
    const { name, budget } = req.body;
    const trimmedName = name.trim();
    const newAccount = await Account.create({ name: trimmedName, budget });
    res.status(201).json(newAccount);
  } catch (err) {
    next(err);
  }
})

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try {
    const { name, budget } = req.body;
    const trimmedName = name.trim();
    const updatedAccount = await Account.updateById(
      req.params.id, { name: trimmedName, budget });
    res.json(updatedAccount);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deletedAccount = await Account.deleteById(req.params.id);
    res.json(deletedAccount);
  } catch (err) {
    next(err);
  }
})

router.use((err, req, res, next) => { // eslint-disable-line
  const status = err.status || 500;
  const message = err.message || 'Something went wrong';

  res.status(status).json({
    error: {
      message,
    }
  })
})

module.exports = router;
