//index.html
$(document).ready(function(){
        var toppos=($(window).height()/3.5) - ($("#alertdiv").height()/3.5);
        var leftpos=($(window).width()/2) - ($("#alertdiv").width()/2);
        $("#alertdiv").css("top", toppos).css("left",leftpos);
        // setTimeout("ind()",100);
        //SearchText();
     var token = window.localStorage.getItem('login_token');

 
  // GET Farms
    $.ajax({
      type: "GET",
      url: 'http://localhost:3000/farms.json?user_credentials='+token,
      dataType: "json",
      cache: false,
      success: function(data) {        
        console.log(data)
        list  = []
        $.each(data, function(x, v) {
            list.push("<li><a href='#' data-id="+v.id+">"+v.name+"</a></li>")
        });        
        $('#admin_farms').append(list);
        $('#admin_farms').listview('refresh');
        get_locations();
         get_barns();
        return false;
      },
      error: function(data,status){
        alert('Error in connection. Check your internet')
      },

      complete: function(data){
        // alert('completed')
      },

      denied: function(data){
        alert('Access denied')
      }
    });
       
  // GET Sites
 

    
});

function get_locations(){
  var token = window.localStorage.getItem('login_token');

  $("#admin_farms li a").on('click', function(){      
     $('#farm_locations').empty();
    var id = $(this).data('id');
      $.ajax({
        type: "GET",
        url: 'http://localhost:3000/farms/'+id+'/locations.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {        
          console.log(data)
          
          list  = []
          $.each(data, function(x, v) {
              list.push("<div data-role='collapsible' class='location_list' data-id="+v.id+" data-collapsed='true' data-theme='a'><h3>"+v.name+"</h3>")
          });        

          $('#farm_locations').append(list);         
          window.location ="#demo-page2"
          get_barns();
          $('[data-role=collapsible-set]').collapsibleset().trigger('create');

          // $('#admin_farms').listview('refresh');

          return false;
        },
        error: function(data,status){
          alert('Error in connection. Check your internet')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
   });
}

function get_barns(){

  var token = window.localStorage.getItem('login_token');
  
  $(".location_list h3").on('click', function(){   
      $(".location_list h3 ul").empty();
        var $this = $(this),
        id = $(this).parent().data('id');

      $.ajax({
        type: "GET",
        url: 'http://localhost:3000/locations/'+id+'/barns.json?user_credentials='+token,
        dataType: "json",
        cache: false,
        success: function(data) {                            
          list  = []
          $.each(data, function(x, v) {
              list.push("<ul data-role='listview'><li><a href='#' data-id="+v.id+">"+v.name+"</a></li></ul>")
          });        
          $this.append(list);          
          $('[data-role=collapsible]').collapsibleset().trigger('create');
          return false;
        },
        error: function(data,status){
          alert('Error in connection. Check your internet')
        },

        complete: function(data){
          // alert('completed')
        },

        denied: function(data){
          alert('Access denied')
        }
      });
   });
}



//home.html





function user_logout() {
        window.localStorage.removeItem('login_token');
        window.localStorage.removeItem('location');
        window.location ='index.html'
}

//Inventory.html
function check_treat(){
    if($('#treatment').val()=="Yes")
        window.location ='#demo-page4'
    else
       window.location ='#demo-page7' 
       //location.reload();
}
function check_pig_death(){
    if($('#death').val()=="Yes"){
         window.location ='#demo-page2'
         }
    else{
        window.location ='#demo-page3'
        }
         
       
}
function demopage3(){
  window.location ='#demo-page3'
  //location.reload();
}
function demopage5(){
  window.location ='#demo-page5'
  //location.reload();
}
function back(){
  window.location ='#demo-page1'
  //history.back();
}
function back2(){   
 history.back();
}
function back3(){
  history.back();
  //location.reload();
  
}
function back4(){
  history.back();
  //location.reload();
  
}
/*function reason(){

  var num = $('#report_number_of_pig_deaths').val();
  //alert(num);
  $( "#reasons" ).empty();
  var j=2;
  for (i = 0; i < num-1; i++) {
  var a = $('#cause').clone();
  var b = a;
  //var  = $('<br>'+ j + '</br>' + a);

  b.appendTo('#reasons');
  //$("#main" ) ("<label for='report_death' id='causeof' class='select'>Cause Of Death for Pig "+j" </label></br>")
  $('#causeof').text("Cause Of Death for Pig " + j);
  j= j+1;
  }
};*/
function reason(){
  var num = $('#report_number_of_pig_deaths').val();
  //alert(num);
  $( "#reasons" ).empty();
  var j=2;
  for (i = 0; i < num-1; i++) {
  //$('#cause').clone().appendTo('#reasons');
  var c = "Cause of Death for Pig" + j;
   var data = {
      'foo': 'Belly Rupture',
      'foo2': 'Scrotal Rupture',
      'foo3': 'Lame/BadLeg',
      'foo4': 'Humpback',
      'foo5': 'Strep',
      'foo6': 'Greasy pig',
      'foo7': 'Tail Bite',
      'foo8': 'Prolapse',
      'foo9': 'Abcess',
      'foo10': 'Hematoma Ear',
      'foo11': 'Euthanized'
    }
    var s = $('<br>'+ c + '</br><select />');
    var d = "";
    for(var val in data) {   
      d +=  $('<option />', {value: val, text: data[val]}).appendTo(s);
    }
    s.appendTo('#reasons');
    $('select').selectmenu();
    $('[type="text"]').textinput();    
    j= j+1;
  }
};
/*function treat(){
   var a = $('#report_number_of_pigs_treated').val();
  //alert(a);
  $( "#medicine" ).empty();
  var j=2;
  for (i = 0; i < a-1; i++) {
    //$('#details').text("Details of Pig" + j);
    $('#pig').clone().appendTo('#medicine');
    j= j+1;
  }
}*/
function treat(){
  var a = $('#report_number_of_pigs_treated').val();
  //alert(a);
  $( "#medicine" ).empty();
  var j=2;
  for (i = 0; i < a-1; i++) {
    
  var head ="Details of Pig" + j;
  var m = "Name of medicine given for Pig" + j;
  var am = "Dosage Amount given for Pig" + j;
  var h ="How Adminstered for Pig" + j;
  //var t = $('<label>'+ l +'</label>');
  //alert(label);
  var s = $('<br>'+ head +'</br><br></br>' + m + '<br></br><input type="text" /><br></br>'+ am + '<br></br><input type="text" /><br></br>'+ h + '<br></br><input type="text" /><br></br>');
  s.appendTo('#medicine');
  $('[type="text"]').textinput();   
  //$("#medicine").trigger('create');
  j= j+1;
  }
  $( "#dosage" ).empty();
  for (i = 0; i < a-1; i++) {
  $('#dosage_amount').clone().appendTo('#dosage');
  }
  $( "#adminis" ).empty();
  for (i = 0; i < a-1; i++) {
  $('#adminstered').clone().appendTo('#adminis');
  }
}

/*function SearchText() {
$("#report_name_of_product_given").autocomplete({
source: function(request, response) {
$.ajax({
type: "POST",
contentType: "application/json; charset=utf-8",
url: "Default.aspx/GetAutoCompleteData",
data: "{'username':'" + extractLast(request.term) + "'}",
dataType: "json",
success: function(data) {
response(data.d);
},
error: function(result) {
alert("Error");
}
});
},
focus: function() {
// prevent value inserted on focus
return false;
},
select: function(event, ui) {
var terms = split(this.value);
// remove the current input
terms.pop();
// add the selected item
terms.push(ui.item.value);
// add placeholder to get the comma-and-space at the end
terms.push("");
this.value = terms.join(", ");
return false;
}
});
$("#report_name_of_product_given").bind("keydown", function(event) {
if (event.keyCode === $.ui.keyCode.TAB &&
$(this).data("autocomplete").menu.active) {
event.preventDefault();
}
})
function split(val) {
return val.split(/,\s*//*);*/
/*}
function extractLast(term) {
return split(term).pop();
}
}*/
//order.html


// shipments
$(function() {    

  var token = window.localStorage.getItem('login_token');

  $('#new_shipment').on("submit", function(){        
      $.ajax({
      type: "POST",
      url: 'http://farms.herokuapp.com/shipments.json?user_credentials='+token,
      data: $(this).serialize(),
      dataType: "json",
      cache: false,
      success: function(data) {        
        $('#new_shipment')[0].reset()
        alert("Shipment created successfully")
        return false
      },
      error: function(data,status){
        alert('Require valid data. Please try again!')
      },

      complete: function(data){
          // alert('completed')
      },

      denied: function(data){
            alert('Access denied')
      }
    });
      e.preventDefault();
      return false    
  });


  $('#new_report').on("submit", function(){        
      $.ajax({
      type: "POST",
      url: 'http://farms.herokuapp.com/reports.json?user_credentials='+token,
      data: $(this).serialize(),
      dataType: "json",
      cache: false,
      success: function(data) {        
        $('#new_report')[0].reset()
        alert("Inventory created successfully")
        return false
      },
      error: function(data,status){
        alert('Require valid data. Please try again!')
      },

      complete: function(data){
          // alert('completed')
      },

      denied: function(data){
            alert('Access denied')
      }
    });
      e.preventDefault();
      return false  
  });
});
 // function ind() {
 //  //alert("ddd");
 //      $("input[type='number']").TouchSpin({
 //            min: 1,
 //            max: 1000000000,
 //            step: 1,
 //            stepinterval: 50,
 //            maxboostedstep: 10000000,
 //            initval: 1
 //            //prefix: '%'
 //        });
 //  }
