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

 // Resets for after adding a combatant.
	var reset = function () {
  	$('#success-roll').val("");
    $('#advantage-roll').val("");
    $('#triumph-roll').val("");
    $('#char-name').val("");
    $('#wound-thr').val("");
    $('#strain-thr').val("");
  };

  //Function to create the common bits of an initiative slot.
  var fill = function () {
  	var success = $('#success-roll').val();
    var advantage = $('#advantage-roll').val();
    var triumph = $('#triumph-roll').val();

    if (success > 0 || advantage > 0 || triumph > 0) {
      $('.slot:last-child').append('<div class="field success-roll"><span>'+ success +'</span><span class="eote su init"></span></div>');
      $('.slot:last-child').append('<div class="field advantage-roll"><span>'+ advantage +'</span><span class="eote ad init"></span></div>');
      $('.slot:last-child').append('<div class="field triumph-roll"><span>'+ triumph +'</span><span class="eote tr init"></span></div>');
      $('.slot:last-child').append('<div class="field"><div class="remove">X</div></div>');
    } else {
      return false;
    }
  };
  
  //Function to create a monitor entry.
  var monitor = function () {
    var name = $('#char-name').val();
    var wounds = $('#wound-thr').val();
    var strain = $('#strain-thr').val();
    
    if (name.length > 0) {
      
      $("#monitor-container").append("<div class='char-block working'></div>");
      $("div.working").append("<h3>" + name + "</h3>")
      
      if (wounds.length > 0) {
        $("div.working").append(
          "<div class='stat-small-wide'>"+
            "<div class='tag-small clear-wounds'>Wounds / Threshold</div>"+
            "<div class='value-small adj-wounds'><span class='wounds'>0</span> / <span class='wound-thr'>"+wounds+"</span></div>"+
          "</div> ")
      }
      
      if (strain.length > 0) {
        $("div.working").append(
          "<div class='stat-small-wide'>"+
            "<div class='tag-small clear-strain'>Strain / Threshold</div>"+
            "<div class='value-small adj-strain'><span class='strain'>0</span> / <span class='strain-thr'>"+strain+"</span></div>"+
          "</div> ")
      }
      
      $("div.working").append(
        "<div class='stat-small'>"+
          "<div class='tag-small clear-boost'><span class='eote bo2'></span></div>"+
          "<div class='value-small adj-boost'>0</div>"+
        "</div> ")
        $("div.working").append(
        "<div class='stat-small'>"+
          "<div class='tag-small clear-setback'><span class='eote se2'></span></div>"+
          "<div class='value-small adj-setback'>0</div>"+
        "</div>")
      
      $("div.working").removeClass("working");
    } else {
      return false;
    }
  };

  // Add new combatants.
  $('.add-pc').click(function(){
    var success = $('#success-roll').val();
    var advantage = $('#advantage-roll').val();
    var triumph = $('#triumph-roll').val();
    
    if (success > 0 || advantage > 0 || triumph > 0) {
      $('.tracker-list').append('<li class="slot"></div>');
      $('.slot:last-child').append('<div class="field player"><span>PC</span></div>');
    }

    fill();
    monitor();
    reset();
  });

  $('.add-ally').click(function(){
    var success = $('#success-roll').val();
    var advantage = $('#advantage-roll').val();
    var triumph = $('#triumph-roll').val();
    
    if (success > 0 || advantage > 0 || triumph > 0) {
      $('.tracker-list').append('<li class="slot"></div>');
      $('.slot:last-child').append('<div class="field ally"><span>NPC</span></div>');
    }

    fill();
    monitor();
    reset();
  });

  $('.add-enemy').click(function(){
    var success = $('#success-roll').val();
    var advantage = $('#advantage-roll').val();
    var triumph = $('#triumph-roll').val();
    
    if (success > 0 || advantage > 0 || triumph > 0) {
      $('.tracker-list').append('<li class="slot"></div>');
      $('.slot:last-child').append('<div class="field enemy"><span>NPC</span></div>');
    }

    fill();
    monitor();
    reset();
  });

  // Remove button removes the selected slot.
  $(document).on("click", ".remove", function() {
    $(this).parent().parent().remove();
  });

  $(document).on("click", "#clear", function() {
    $(".tracker-list").children('li').remove();
    $("#monitor-container").empty();
  });

});