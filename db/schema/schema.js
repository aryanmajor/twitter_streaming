const {mongoose} = require('./../mongoose');
const mongoosePaginate = require('mongoose-paginate');

var Schema=mongoose.Schema;

var TweetSchema=new Schema({
  timestamp_ms:{
    type:Number,
    minlength:13
  },
  text:{
    type: String
  },
  user:{
    name:{
      type: String
    },
    screen_name:{
      type: String
    },
    followers_count:{
      type:Number
    },
    favourites_count:{
      type: Number
    },
    friends_count:{
      type: Number
    }
  },
  entities:{
    hashtags:[String],
    user_mentions:[String],
    urls:[String]
  },
  lang:{
    type: String
  },
  quote_count:{
    type: Number
  },
  reply_count:{
    type: Number
  },
  retweet_count:{
    type: Number
  },
  favorite_count:{
    type: Number
  }
});
TweetSchema.plugin(mongoosePaginate);

var Tweet=mongoose.model('Tweet',TweetSchema);

module.exports={Tweet};
