var clickedEl = null;
var posx = 0;
var posy = 0;


if (document.addEventListener) {
        document.addEventListener('contextmenu', function(e) {
            //e.preventDefault();
            posx = e.pageX;
            posy = e.pageY;
            clickedEl = e;
        }, true);
    } else {
        document.attachEvent('oncontextmenu', function(e) {
        });
    }

var modal = false;

var content = "<div id=\"modal\" class=\"modal\"> <img id=\"modalclose\" src=\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABw0lEQVR4Xu2a0Q3CMAxEzSaMApvAZMAmbAKjoEjkg5CCa98ZlLi/xLHv5dw0LRuZ/NpMrl8SQDpgcgLZApMbIG+C2QLZApMTyBaY3AC5C6BaYCsi92A37UTk6s2JAHAQkZOIHEXk7C1IGV9zlnwlr/nyAqiF1AIiILQ5XRA8AIrtbx30TAit+Jp+b20HD4CSfKkgBgRKLi+AKAgU8aV4BAA2BJp4JAAWBKp4NAA0BLp4BgAUhBDxLABeCGHimQCsEELFswGshRAuPgKAFsJPxEcB+Aah/F4OU+3FeJp8S4J6ENKcxpZWuRcbIj7SAVWkBkKY+F8A+NQO5bdQ8QkAeBjS3AO+rX6dI9QFeRPULp1z3Kd9fvhtUPOQoxnjXIN+OLsF1ghbMxYGgwnAIsgS44LBAuAR4oldDYMBACEAMYcKBhoAsnDkXIswkAAYBTPmfIGBAsAslDk35LsAtcDnctFyeB1AK6zTtJRcHgD5cbTzcTTiJNc64fKsQ7XttYM8Dmjf8kSIb3O6xCNfiEz9FxmT9f4lCNEC/6LFVEcCMGEbKCgdMNBimqSkA0zYBgpKBwy0mCYp6QATtoGC0gEDLaZJygMWMX5Bic2YDQAAAABJRU5ErkJggg==\" > <a class=\"modallink\"href=\"\" target=\"_blank\"><img class=\"modalimg\"src=\"\" /></a> <h3 class=\"modaltitle\"></h3> <p class=\"modaldate\"></p> </div>"



chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

        sendResponse({value: clickedEl});

        searchapi(request);

          $('body').append(content);
          $('.modalimg').css({'opacity':'0'});
          $('#modal').css({
                  'position' : 'absolute',
                  'left' : posx,
                  'top' : posy
                });
          document.querySelector('#modalclose').addEventListener('click',   function(){
                  modal = false;
                  $('#modal').remove();
                  posx = 0;
                  posy = 0;
          });
});



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function searchapi(argument){
  query= argument;
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
   var dplaAPI = 'https://api.dp.la/v2/items?q=' + query + extra + after + before + auth
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
          $('.modalimg').attr("src",result_api).delay(3000,function(){
            $('.modalimg').css({'opacity':'1'});
          });

          $('.modallink').attr("href",link);
          $('.modaltitle').text(title);
          $('.modaldate').text(date);

          /*$('#modalfail').fadeOut(200,function(){
            $('#modalok').fadeIn(200);
          })*/
       }
       else{
         modal = false;
         $('#modal').remove();
         posx = 0;
         posy = 0;
         $('.modalimg').attr("src","");
         $('.modallink').attr("href","")
         $('.modaltitle').text("");
         $('.modaldate').text("");
         /*$('#modalok').fadeOut(200,function(){
           $('#modalfail').fadeIn(200);
         })*/
       }
     });
}
