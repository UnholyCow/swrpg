$(document).ready(function(){

  //Enables sorting for the init list.
  $(function() {
      $( "#sortable" ).sortable();
      $( "#sortable" ).disableSelection();
    });

  // Begin combat resets round counter and selects the first slot.
  $(document).on("click", "#begin-combat", function() {

    $('#round-count').html(function(i, val) { return 1 });

    $('.slot').each(function(){
      $(this).removeClass('finished active-slot');
      $('.slot:first-child').addClass('active-slot');
    });

  });

  //End combat removes all slot modifiers and resets round count.
  $(document).on("click", "#end-combat", function() {

    $('#round-count').html(function(i, val) { return 1 });

    $('.slot').each(function(){
      $(this).removeClass('finished active-slot');
    });

  });

  // End turn finishes current slot, activates next slot.
  $(document).on("click", "#end-turn", function(){

    $('li.active-slot').addClass('finished').next().addClass('active-slot');

  });

  // Begin a new round: update the counter, remove and reset effects.
 $(document).on("click", "#end-round", function(){

    $('#round-count').html(function(i, val) { return +val+1 });

    $('.slot').each(function(){
      $(this).removeClass('finished active-slot');
      $('.slot:first-child').addClass('active-slot');
    });

  });

  // Add new combatants, probably 3 different funtions.
  $('.add-pc').click(function(){

    var success = $('#success-roll').val();
    var advantage = $('#advantage-roll').val();

    $('.tracker-list').append('<li class="slot"></div>');
    $('.slot:last-child').append('<div class="field player"><span>PC</span></div>');
    $('.slot:last-child').append('<div class="field success-roll"><span>'+ success +'</span><div class="successBig"></div></div>');
    $('.slot:last-child').append('<div class="field advantage-roll"><span>'+ advantage +'</span><div class="advantageBig"></div></div>');
    $('.slot:last-child').append('<div class="field"><div class="remove">X</div></div>');

    $('#success-roll').val("");
    $('#advantage-roll').val("");

  });
  $('.add-ally').click(function(){

    var success = $('#success-roll').val();
    var advantage = $('#advantage-roll').val();

    $('.tracker-list').append('<li class="slot"></div>');
    $('.slot:last-child').append('<div class="field ally"><span>NPC</span></div>');
    $('.slot:last-child').append('<div class="field success-roll"><span>'+ success +'</span><div class="successBig"></div></div>');
    $('.slot:last-child').append('<div class="field advantage-roll"><span>'+ advantage +'</span><div class="advantageBig"></div></div>');
    $('.slot:last-child').append('<div class="field"><div class="remove">X</div></div>');

    $('#success-roll').val("");
    $('#advantage-roll').val("");

  });
  $('.add-enemy').click(function(){

    var success = $('#success-roll').val();
    var advantage = $('#advantage-roll').val();

    $('.tracker-list').append('<li class="slot"></div>');
    $('.slot:last-child').append('<div class="field enemy"><span>NPC</span></div>');
    $('.slot:last-child').append('<div class="field success-roll"><span>'+ success +'</span><div class="successBig"></div></div>');
    $('.slot:last-child').append('<div class="field advantage-roll"><span>'+ advantage +'</span><div class="advantageBig"></div></div>');
    $('.slot:last-child').append('<div class="field"><div class="remove">X</div></div>');

    $('#success-roll').val("");
    $('#advantage-roll').val("");

  });

  // Remove button removes the selected slot.
  $(document).on("click", ".remove", function() {
    $(this).parent().parent().remove();
  });

  $(document).on("click", "#clear", function() {
    $(".tracker-list").children('li').remove();
  });

});