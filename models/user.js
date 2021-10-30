const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Путешественник, исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://avatars.mds.yandex.net/get-zen_doc/2391871/pub_5ee229a599422b3358f32814_5ee229e53b44f16ea3db0835/scale_1200',
  },
});
module.exports = mongoose.model('user', userSchema);
