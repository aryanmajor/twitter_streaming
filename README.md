To Run MVP:
1. Start server
  "node app.js"
2. Open "localhost:3000/fetchTweets" in a web browser
3. The UI is made as easy as possible for a user of MVP

This MVP contains 3 API Routes
1. http://localhost:3000/insert
  It is triggered by HTTP POST method. The Accepted Content Types are 'application/json' and 'application/url-encoded'.
  JSON format:
  {
    "term":"Streaming trigger",
    "count":"Number Of Tweets to be fetched"
  }
2. http://localhost:3000/fetch
  It is triggered by HTTP POST method. The Accepted Content Types are 'application/json' and 'application/url-encoded'.
  It filters upon the supplied triggers.
3. http://localhost:3000/fetch
  It is triggered by HTTP POST method. The Accepted Content Types are 'application/json' and 'application/url-encoded'.
  It filters upon the supplied triggers and generates CSV file in root directory.
