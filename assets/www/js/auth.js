// $(function() {        
//   var token = window.localStorage.getItem('login_token');
//   var username = window.localStorage.getItem('username');
//   var location = window.localStorage.getItem('location');
//   var id = window.localStorage.getItem('id');
//   var role = window.localStorage.getItem('role');
//   var farm = window.localStorage.getItem('farm');




//   if(token === undefined || token==null){
//     console.log("login must")
//   }else{
//     window.location ="home.html"
//   }

//   $('#new_user_session').submit(function(e) {
//     //alert('ada')
//     $('#menu').css('background-color','blue');
//     $('#menu').css('background-color','rgb(0,125,208)');   
//      //jQuery('#loading-image').show()
//     $.ajax({
//       type: "POST",
//       ContentType: "application/json",
//       //url: 'http://farms.herokuapp.com/user_sessions.json',
//       //data: '{"username":"fcho","password":"demouser"}' ,
//       data: $(this).serialize(),
//       url: 'http://farmcentral.softimum.com/user_sessions.json',
//       //dataType: "json",
//       cache: false,
//       success: function(data) { 
//       alert();       
//         // return value example {single_access_token: "hvq01zyIs9C2k1yDHXO3", username: "adminuser", location_id: 0} 
//         console.log(data);
//         window.localStorage.setItem('login_token', data.single_access_token);
//         window.localStorage.setItem('location', data.location_id);
//         window.localStorage.setItem('id', data.id);
//         window.localStorage.setItem('role', data.location_id);
//         window.localStorage.setItem('email', data.email);
//         window.localStorage.setItem('first_name', data.first_name);
//         window.localStorage.setItem('last_name', data.last_name);
//         window.localStorage.setItem('farm', data.farm_id);
//         window.localStorage.setItem('username', data.username);

//         if (role === "Admin"){
//           window.location ="main_dashboard.html"  
//         }
//         else if(role==="SiteManager"){
//            window.location ="main_dashboard.html#demo-page2"
//         }
//         else{
//           window.location ="home.html"  
//         } 
//         return false;
//       },
//       error: function(data,status){
//         alert('Invalid username/password')
//       },

//       complete: function(data){
// 	      // alert('completed')
//       },

//       denied: function(data){
// 		    alert('Access denied')
//       }
//     });
//       return false
//     e.preventDefault();
//   });

// });

$(function() {        
  var item_value = window.localStorage.getItem('login_token');

  if(item_value === undefined || item_value==null){
    console.log("login must")
  }else{
    window.location ="home.html"
  }

  $('#new_user_session').submit(function(e) {
    $('#menu').css('background-color','blue');
   
     //jQuery('#loading-image').show()
    $.ajax({
      type: "GET",
      url: 'http://farms.herokuapp.com/api/sites/user_login',
      data: $(this).serialize(),
      dataType: "jsonp",
      cache: false,
      success: function(data) {
        console.log(data);
        alert();
         $('#menu').css('background-color','rgb(0,125,208)');
        //jQuery('#loading-image').hide();
        if (data.error=="invalid_grant"){
          alert('Invalid username/password')
          return false
        }else{
          user_login(data);  
          return false
        }   

      },
      error: function(data,status){
        alert('Invalid username/password')
      },

      complete: function(data){
        // alert('completed')
      },

      denied: function(data){
        alert('Access denied')
      }
    });
      return false
    e.preventDefault();
  });

});

function user_login(user){
  window.localStorage.setItem('login_token', user.access_token);
  window.location ='home.html'
}
