$(document).ready(function(){
      
     var token = window.localStorage.getItem('login_token');
 
  // GET Farms
    $.ajax({
      type: "GET",
      url: 'http://farmcentral.softimum.com/farms.json?user_credentials='+token,
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
        url: 'http://farmcentral.softimum.com/farms/'+id+'/locations.json?user_credentials='+token,
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
        url: 'http://farmcentral.softimum.com/locations/'+id+'/barns.json?user_credentials='+token,
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
});

