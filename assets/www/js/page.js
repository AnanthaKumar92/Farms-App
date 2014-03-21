//index.html
$(document).ready(function(){
        var toppos=($(window).height()/3.5) - ($("#alertdiv").height()/3.5);
        var leftpos=($(window).width()/2) - ($("#alertdiv").width()/2);
        $("#alertdiv").css("top", toppos).css("left",leftpos);
      });
//home.html
function user_logout() {
        window.localStorage.removeItem('login_token');
        window.location ='index.html'
      }

//Inventory.html
function check_treat(){
    if($('#treatment').val()=="Yes")
        window.location ='#demo-page4'
    else
       window.location ='#demo-page5' 
}
function check_pig_death(){
    if($('#death').val()=="Yes")
         window.location ='#demo-page2'
    else
        window.location ='#demo-page3'
}

//order.html