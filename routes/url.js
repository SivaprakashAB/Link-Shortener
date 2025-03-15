const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');
const Url = require('../models/Url');

const baseUrl = config.get('baseUrl');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;

  // Validate base URL
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json({ message: 'Invalid base URL' });
  }

  // Validate long URL
  if (!validUrl.isUri(longUrl)) {
    return res.status(401).json({ message: 'Invalid long URL' });
  }

  try {
    // Check if the URL already exists in the database
    let url = await Url.findOne({ longUrl });
    if (url) {
      return res.json(url);
    } else {
      // Generate unique code and construct short URL
      const urlCode = shortid.generate();
      const shortUrl = `${baseUrl}/${urlCode}`;

      url = new Url({
        longUrl,
        shortUrl,
        urlCode,
        date: new Date()
      });

      await url.save();
      return res.json(url);
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
