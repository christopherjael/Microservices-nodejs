const { model, Schema } = require('mongoose');
const { nanoid } = require('nanoid');

const ShortURLsSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    shortURL: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

ShortURLsSchema.pre('save', async function (next) {
  this.shortURL = nanoid();
  next();
});

module.exports = model('shortURLs', ShortURLsSchema);
