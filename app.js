
  $('#rajouter').click(function(){ 
  var text=$("#new-text").val();
  $("#todolist").append('<li>'+text+ '<button>clean</button></li>');
  $("#new-text").val('');
})
  $(".btn").click(function(){
    $(".a").css("text-decoration", "line-through");

    })
  $(".clean").click(function(){
    $(".b").css("text-decoration", "line-through");

    })

$(function(){

$("#rajouter").on('click');




});