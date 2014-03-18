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
