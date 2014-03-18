$(function() {         
  return  authorize();
});

function authorize() {
	var item_value = window.localStorage.getItem('login_token');

	if(item_value === undefined || item_value==null){
	  window.location= 'index.html'
	}
}
