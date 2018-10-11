  var data="";
$(document).ready(function(){

  $('.findButton').click(function () {
    data=$('form').serialize();
    data+='&page=0'
    var xhttp=new XMLHttpRequest();
    xhttp.onreadystatechange=function() {
      if(this.readyState==4 && this.status==200){

        var response=JSON.parse(this.responseText);
        var str="";

        for(i in response){

          // alert(i);
          let st=`<div class="card" style="margin-bottom:2%;">
            <div class="card-header">
              <div class="row">
                <div class="col-md-7" style="font-size:1.5em;letter-spacing:2px;">
                  <span data-toggle="tooltip" data-placement="right" title="User Name">`
                    +response[i].user.name+
                  `</span><br>
                  <span data-toggle="tooltip" data-placement="right" title="User Screen Name">`
                  +response[i].user.screen_name+
                `</span>
                </div>
                <div class="col-md-5 font-weight-bold">
                  User Followers:`+response[i].user.followers_count+ `<br>
                  User Favorites:` +response[i].user.favourites_count+`<br>
                </div>
              </div>
            </div>
            <div class="card-body">
              <h3 style="color:#1da1f2;">`+response[i].text+`</h3><br>
              <span class="font-italic font-weight-bold">#`+response[i].entities.hashtags+`</span><br>
              `+response[i].entities.user_mentions+`<br>
              <a href="`+response[i].entities.urls+`">`+response[i].entities.urls+`</a><br>
              <br><span class="font-weight-bold">`+response[i].lang+`</span>
            </div>
            <div class="card-footer">
              <div class="row">
                <div class="col-md-6">
                    Quote Count `+response[i].quote_count+`<br>
                    Reply Count `+response[i].reply_count+`
                </div>
                <div class="col-md-6">
                  Favorite Count `+response[i].favorite_count+`<br>
                  Retweet Count `+response[i].retweet_count+`
                </div>
              </div>


            </div>
          </div>`;
          str+=st;
          // alert('poooooooooow');

        }
        str+='<ul class="pagination"><li class="page-item disabled"><a class="page-link">Previous</a></li><li class="page-item"><a class="page-link" onclick="fetchPage('+1+')">Next</a></li></ul>';
        $('.displayData').html(str);
        // alert(str.length);
      }
      // else{
      //   alert(this.readyState+' <-----> '+this.status);
      // }
    };
    xhttp.open("POST", "http://localhost:3000/fetch", true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send(data);
  });


});

function fetchPage(page) {
  data = data.substring(0, data.length-1);
  data=data+page;
  var xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
    if(this.readyState==4 && this.status==200){

      var response=JSON.parse(this.responseText);
      var str="";

      for(i in response){

        // alert(i);
        let st=`<div class="card" style="margin-bottom:2%;">
          <div class="card-header">
            <div class="row">
              <div class="col-md-7" style="font-size:1.5em;letter-spacing:2px;">
                <span data-toggle="tooltip" data-placement="right" title="User Name">`
                  +response[i].user.name+
                `</span><br>
                <span data-toggle="tooltip" data-placement="right" title="User Screen Name">`
                +response[i].user.screen_name+
              `</span>
              </div>
              <div class="col-md-5 font-weight-bold">
                User Followers:`+response[i].user.followers_count+ `<br>
                User Favorites:` +response[i].user.favourites_count+`<br>
              </div>
            </div>
          </div>
          <div class="card-body">
            <h3 style="color:#1da1f2;">`+response[i].text+`</h3><br>
            <span class="font-italic font-weight-bold">#`+response[i].entities.hashtags+`</span><br>
            `+response[i].entities.user_mentions+`<br>
            <a href="`+response[i].entities.urls+`">`+response[i].entities.urls+`</a><br>
            <br><span class="font-weight-bold">`+response[i].lang+`</span>
          </div>
          <div class="card-footer">
            <div class="row">
              <div class="col-md-6">
                  Quote Count `+response[i].quote_count+`<br>
                  Reply Count `+response[i].reply_count+`
              </div>
              <div class="col-md-6">
                Favorite Count `+response[i].favorite_count+`<br>
                Retweet Count `+response[i].retweet_count+`
              </div>
            </div>


          </div>
        </div>`;
        str+=st;
        // alert('poooooooooow');

      }
      str+='<ul class="pagination"><li class="page-item"><a class="page-link" onclick="fetchPage('+(page-1)+')">Previous</a></li><li class="page-item"><a class="page-link" onclick="fetchPage('+(page+1)+')">Next</a></li></ul>';
      $('.displayData').html(str);
    }
    // else{
    //   alert(this.readyState+' <-----> '+this.status);
    // }
  };
  xhttp.open("POST", "http://localhost:3000/fetch", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(data);
}

function findButton() {
  let fetchinfo=$('form').serialize();
  var xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
    if(this.readyState==4 && this.status==200){
      // alert('done');
      $('.success').show();
      $('.loader').hide();
    }
    else{
      $('.loader').show();
      $('.success').hide();
      // alert(this.readyState+' <-----> '+this.status);
    }
  };
  xhttp.open("POST", "http://localhost:3000/insert", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(fetchinfo);
}

function GenerateCSV() {
  let genCSV=$('form').serialize();
  var xhttp=new XMLHttpRequest();
  xhttp.onreadystatechange=function() {
    if(this.readyState==4 && this.status==200){
      alert(this.responseText);
    }
    else{
      // alert(this.readyState+' <-----> '+this.status);
    }
  };
  xhttp.open("POST", "http://localhost:3000/csv", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send(genCSV);
}
