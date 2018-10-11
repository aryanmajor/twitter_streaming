const express = require('express');
const bodyParser = require('body-parser');
const Twitter = require('twitter');
const {mongoose} = require('./db/mongoose');
const {Tweet} = require('./db/schema/schema');
const _ = require('lodash');
const {filteration} = require('./middlewares/filteration');
const {sorting} = require('./middlewares/sorting');
const fs = require('fs');
const csv = require('fast-csv');

var app=express();
app.use(express.static(__dirname + '/UI'));
//sudo npm config rm proxy
//sudo npm config rm https-proxy


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var client = new Twitter({
  consumer_key: process.env.MY_CONSUMER_KEY,
  consumer_secret: process.env.MY_CONSUMER_SECRET,
  access_token_key: process.env.MY_ACCESS_TOKEN,
  access_token_secret: process.env.MY_ACCESS_SECRET
  // request_options: {
  //   proxy: 'http://172.16.25.10:8080'
  // }
});

app.post('/insert',(req,res,cb)=>{
   var count=req.body.not;
   var i=1;

   let tracker={
     track: req.body.term,
     language: 'en'
   };

   // streaming
  client.stream('statuses/filter',tracker,  function(stream) {
      stream.on('data', function(doc) {
        var tweet=_.pick(doc,['timestamp_ms','text','lang','quote_count','reply_count','favorite_count','retweet_count']);
        tweet.user={};
        tweet.user.name=doc.user.name;
        tweet.user.screen_name=doc.user.screen_name;
        tweet.user.followers_count=doc.user.followers_count;
        tweet.user.favourites_count=doc.user.favourites_count;
        tweet.entities={
          hashtags:[],
          urls:[],
          user_mentions:[]
        };
        let c=0;
        for(c=0;c<doc.entities.hashtags.length;c++){
          tweet.entities.hashtags.push(doc.entities.hashtags[c].text);
        }
        for(c=0;c<doc.entities.urls.length;c++){
          tweet.entities.urls.push(doc.entities.urls[c].expanded_url);
        }
        for(c=0;c<doc.entities.user_mentions.length;c++){
          tweet.entities.user_mentions.push(doc.entities.user_mentions[c].name);
        }

        var new_tweet=new Tweet(tweet);
        new_tweet.save().then(()=>{
          if(i>=count){
            stream.destroy();
            res.send('Done');

          }
          else{
            i++;
          }


        });

      });

      stream.on('error', function(error) {
        console.log(error);

      });
  });
});

app.post('/fetch',filteration,sorting,(req,res)=>{
  var page=req.body.page;

  Tweet.find(req.mfilter).limit(5).skip(page*5).sort(req.msort).then((doc)=>{
      res.send(doc);
  }).catch((e)=>{
    console.log(e);
  });
});

app.post('/csv',filteration,sorting,(req,res)=>{
  Tweet.find(req.mfilter).sort(req.msort).then((doc)=>{
    let name=Math.floor(Math.random() * 100)+'.csv';
    var ws=fs.createWriteStream(name);
    let csvData=[["text","lang","quote_count","reply_count","favorite_count","retweet_count","user_follow_count","user_favorite_count","hashtags","user_mentions"]];
    let len=doc.length;
    for(i=0;i<len;i++){
      let arr=[];
      arr.push(doc[i].text,doc[i].lang,doc[i].quote_count,doc[i].reply_count,doc[i].favorite_count,doc[i].retweet_count,doc[i].user.followers_count,doc[i].user.favourites_count,
      doc[i].entities.hashtags,doc[i].entities.user_mentions);
      csvData.push(arr);
    }
    csv.write(csvData,{headers:true}).pipe(ws);
    res.send(name+ '  file generated.')
  }).catch((e)=>{
    console.log(e);
  });
})

app.listen(3000);
