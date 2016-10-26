function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function searchapi(){
  query= $('#search-input').val();
  date_after= "";
  date_before= "";

  var result_api;
  var content;
  var img_sm = "";
  var img_lg ="";
  var title="";
  var link="";
  var date="";

  var number_result= getRandomInt(0,9);

   var auth = '&api_key=d051e30a6fc5cf3173f95233b1707fcb'
   var extra = '&sourceResource.type=image&provider.name=The New York Public Library'
   var after = '&sourceResource.date.after=' + (date_after || '1800')
   var before = '&sourceResource.date.before=' + (date_before || '2017')
   var dplaAPI = 'http://api.dp.la/v2/items?q=' + query + extra + after + before + auth
   $.getJSON( dplaAPI )
     .done(function( data ) {
       $.each( data.docs, function(i,elem) {
        if ( i == number_result ) {
        img_sm = elem.object;
        img_lg = img_sm.substring(0, img_sm.length-1) + 'w';
        title = elem.sourceResource.title;
        link = elem.isShownAt;
         date = elem.sourceResource.date.displayDate;
        result_api = img_lg;
        }
       });
       if(result_api != undefined && query != "" && query != " "){
          if (title.length >40){
            title = title.substring(0,40) + "..";
          }
          $('.result_search_img').attr("src",result_api);
          $('.result_search_link').attr("href",link);
          $('.result_search_title').text(title);
          $('.result_search_date').text(date);

          $('#search_nope').fadeOut(200,function(){
            $('#search_ok').fadeIn(200);
          })
       }
       else{
         $('.result_search_img').attr("src","");
         $('.result_search_link').attr("href","")
         $('.result_search_title').text("");
         $('.result_search_date').text("");
         $('#search_ok').fadeOut(200,function(){
           $('#search_nope').fadeIn(200);
         })
       }
     });
}


document.addEventListener('DOMContentLoaded', function () {
    if (document.querySelector('.search_button') != undefined){
      document.querySelector('.search_button').addEventListener('click', searchapi);
    }
});


document.addEventListener('DOMContentLoaded', function () {
      document.querySelector('#search-input').addEventListener('keypress', function (e) {
        console.log(e);
          var key = e.keyCode;
          if (key === 13) { // 13 is enter
            searchapi();
          }
      });

});
