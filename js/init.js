$(document).ready(function(){

  // Remove button removes the selected slot.
  $('.remove').click(function(){
    $(this).closest('.slot').remove();
  });

  // Begin a new round: update the counter, remove and reset effects.
  $('#end-turn').click(function(){

    $('#round-count').html(function(i, val) { return +val+1 });

    $('.slot').each(function(){
      $(this).removeClass('finished active');
      $('.slot:first-child').addClass('active');
    });

  });

  // Add and order each new combatant.
  $('.add-pc').click(function(){

    var success = $('#success-roll').val();
    var advantage = $('#advantage-roll').val();

    $('.tracker-list').

  });

});
