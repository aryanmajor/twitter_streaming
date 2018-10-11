var filteration=(req,res,next)=>{
  var mfilter={
    text: req.body.tweetSearch=="0" || req.body.tweetSearch=="contains" ? { $regex : req.body.tweetText, $options: 'i'} : (req.body.tweetSearch=="start"? {$regex: '^'+req.body.filter[0], $options: 'i'} :(req.body.tweetSearch=="end"? {$regex: req.body.filter[0]+'$', $options: 'i'} : {$eq: req.body.filter[0]})),
    'user.name': req.body.userFilter=="contains" ? { $regex : req.body.filter[1], $options: 'i'} : (req.body.userFilter=="start"? {$regex: '^'+req.body.filter[1], $options: 'i'} :(req.body.userFilter=="end"? {$regex:req.body.filter[1]+'$', $options: 'i'} :
                  (req.body.userFilter=="0" ? {$regex: req.body.userName, $options: 'i'}: {$eq: req.body.filter[1]})))
  };
  if(req.body.screenName!="0"){
    mfilter["user.screen_name"]= req.body.screenName=="contains" ? { $regex : req.body.filter[2], $options: 'i'} : (req.body.screenName=="start"? {$regex: '^'+req.body.filter[2], $options: 'i'} :(req.body.screenName=="end"? {$regex:req.body.filter[2]+'$', $options: 'i'} :
                  (req.body.screenName=="0" ? {$regex: '', $options: 'i'}: {$eq: req.body.filter[2]})));
  }
  if(req.body.URL!="0"){
    mfilter["entities.urls"]=req.body.URL=="contains" ? { $regex : req.body.filter[3], $options: 'i'} : (req.body.URL=="start"? {$regex: '^'+req.body.filter[3], $options: 'i'} :
    (req.body.URL=="end"? {$regex:req.body.filter[3]+'$', $options: 'i'} :(req.body.URL=="0" ? {$regex: null, $options: 'i'}: {$eq: req.body.filter[3]})));
  }
  if(req.body.userMentions!="0"){
    mfilter["entities.user_mentions"]=req.body.userMentions=="contains" ? { $regex : req.body.filter[4], $options: 'i'} : (req.body.userMentions=="start"? {$regex: '^'+req.body.filter[4], $options: 'i'} :
    (req.body.userMentions=="end"? {$regex:req.body.filter[4]+'$', $options: 'i'} :(req.body.userMentions=="0" ? {$regex: '', $options: 'i'}: {$eq: req.body.filter[4]})));
  }
  if(req.body.hashTags!="0"){
    mfilter["entities.hashtags"]=req.body.hashTags=="contains" ? { $regex : req.body.filter[5], $options: 'i'} : (req.body.hashTags=="start"? {$regex: '^'+req.body.filter[5], $options: 'i'} :
    (req.body.hashTags=="end"? {$regex:req.body.filter[5]+'$', $options: 'i'} :(req.body.hashTags=="0" ? {$regex: '', $options: 'i'}: {$eq: req.body.filter[5]})));
  }
  if(req.body.quoteCount!="0"){
    mfilter.quote_count= req.body.quoteCount=="less" ? { $lt : req.body.filter[6]} : (req.body.quoteCount=="more"? {$gt: req.body.filter[6]} : {$eq: req.body.filter[6]} );
  }
  if(req.body.replyCount!="0"){
    mfilter.reply_count= req.body.replyCount=="less" ? { $lt : req.body.filter[7]} : (req.body.replyCount=="more"? {$gt: req.body.filter[7]} : {$eq: req.body.filter[7]} );
  }
  if(req.body.favoriteCount!="0"){
    mfilter.favorite_count= req.body.favoriteCount=="less" ? { $lt : req.body.filter[8]} : (req.body.favoriteCount=="more"? {$gt: req.body.filter[9]} : {$eq: req.body.filter[8]} );
  }
  if(req.body.retweetCount!="0"){
    mfilter.retweet_count= req.body.retweetCount=="less" ? { $lt : req.body.filter[9]} : (req.body.retweetCount=="more"? {$gt: req.body.filter[9]} : {$eq: req.body.filter[9]} );
  }
  if(req.body.uFollowCount!="0"){
    mfilter["user.followers_count"]= req.body.uFollowCount=="less" ? { $lt : req.body.filter[10]} : (req.body.uFollowCount=="more"? {$gt: req.body.filter[10]} : {$eq: req.body.filter[10]} );
  }
  if(req.body.uFavCount!="0"){
    mfilter["user.favourites_count"]= req.body.uFavCount=="less" ? { $lt : req.body.filter[11]} : (req.body.uFavCount=="more"? {$gt: req.body.filter[11]} : {$eq: req.body.filter[11]} );
  }

  req.mfilter=mfilter;
  next();
};

module.exports={filteration};
