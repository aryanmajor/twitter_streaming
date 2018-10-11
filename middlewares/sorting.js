var sorting=(req,res,next)=>{
  var msort={
    timestamp_ms: req.body.sortParam=='timestamp_ms'? req.body.ordering : undefined,
    text:req.body.sortParam=='text'? req.body.ordering : undefined,
    quote_count:req.body.sortParam=='quote_count'? req.body.ordering : undefined,
    reply_count:req.body.sortParam=='reply_count'? req.body.ordering : undefined,
    favorite_count:req.body.sortParam=='favorite_count'? req.body.ordering : undefined,
    retweet_count:req.body.sortParam=='retweet_count'? req.body.ordering : undefined
  };

  req.msort=msort;
  next();
};

module.exports ={sorting};
