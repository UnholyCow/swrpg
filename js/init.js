//DECLARING EVERYTHING IMMEDIATELY

//Creating the tracker.
function Tracker() {
  this.slots = [];
  this.activeIndex = 0;
  this.rounds = 1;
}

//Example of a slot.
function Slot(type, success, advantage, triumph) {
  this.type = type;
  this.success = success;
  this.advantage = advantage;
  this.triumph = triumph;
  this.boost = 0;
  this.setback = 0;
  this.active = false;
  this.finished = false;
}

var init = new Tracker();

$(document).ready(function () {
  
  /* ======================================== */
  /* ========== INITIATIVE TRACKER ========== */
  /* ======================================== */
  
  //Enables manual sorting for the initiative tracker.
  $(function () {
    $("#sortable").sortable();
    $("#sortable").disableSelection();
  });
  
  //Reset function.
  var reset = function () {
    $('#success-roll').val("");
    $('#advantage-roll').val("");
    $('#triumph-roll').val("");
    $('#char-name').val("");
    $('#wound-thr').val("");
    $('#strain-thr').val("");
  };
  
  //Sorting function
  function compare(a, b) {
    if (a.success < b.success)
      return 1;
    if (a.success > b.success)
      return -1;
    if (a.success === b.success) {
      if (a.advantage < b.advantage)
        return 1;
      if (a.advantage < b.advantage)
        return -1;
      if (a.advantage === b.advantage) {
        if (a.type < b.type)
          return 1;
        if (a.type === b.type || a.type > b.type)
          return 0;
      }
    }
  }

  Tracker.prototype.beginCombat = function () {
    for (var i = 0; i < this.slots.length; i++) {
      var el = this.slots[i];
      el.active = false;
      el.finished = false;
    }
    this.rounds = 1;
    this.slots.sort(compare);
    var currentSlot = this.slots[this.activeIndex];
    currentSlot.active = true;
    this.renderHTML();
  }

  Tracker.prototype.endTurn = function () {
    var currentSlot = this.slots[this.activeIndex];
    currentSlot.active = false;
    currentSlot.finished = true;
    currentSlot.boost = 0;
    currentSlot.setback = 0;
    this.activeIndex++;
    if (this.activeIndex > this.slots.length - 1) {
      this.activeIndex = 0;
      this.endRound();
    } else {
      this.beginTurn();
    }
  }
  
  Tracker.prototype.beginTurn = function () {
    var currentSlot = this.slots[this.activeIndex];
    currentSlot.active = true;
    this.renderHTML();
  }
  
  Tracker.prototype.endRound = function () {
    var currentSlot = this.slots[this.activeIndex];
    for (var i = 0; i < this.slots.length; i++) {
      var el = this.slots[i];
      el.active = false;
      el.finished = false;
    }
    this.rounds++;
    currentSlot.active = true;
    this.renderHTML();
  }

  Tracker.prototype.addBoost = function () {
    var currentSlot = this.slots[this.activeIndex];
    currentSlot.boost++;
  }

  Tracker.prototype.addSetback = function () {
    var currentSlot = this.slots[this.activeIndex];
    currentSlot.setback++;
  }

  Tracker.prototype.renderHTML = function () {
    $(".tracker-list").empty();
    for (var i = 0; i < init.slots.length; i++) {
      var el = init.slots[i];
      var roundCount = init.rounds;
      var htmlString = '<li class="slot';
      if (el.active === true) {
        htmlString += ' active-slot">';
      } else {
        if (el.finished === true) {
          htmlString += ' finished">';
        } else {
          htmlString += '">';
        }
      }
      if (el.type === 3) {
        htmlString += '<div class="type player">PC</div>'
      }
      if (el.type === 2) {
        htmlString += '<div class="type ally">NPC</div>'
      }
      if (el.type === 1) {
        htmlString += '<div class="type enemy">NPC</div>'
      }
      htmlString += '<div class="slot-field">' + el.success + ' <span class="eote su"></span></div>';
      htmlString += '<div class="slot-field">' + el.advantage + ' <span class="eote ad"></span></div>';
      htmlString += '<div class="slot-field">' + el.triumph + ' <span class="eote tr"></span></div>';
      htmlString += '<div class="slot-field boost-count">' + el.boost + ' <span class="eote bo2"></span></div>';
      htmlString += '<div class="slot-field setback-count">' + el.setback + ' <span class="eote se2"></span></div>';
      htmlString += '<div class="remove"><span class="icon icon-cross"></span></div>';
      htmlString += '</li>';

      $(".tracker-list").append(htmlString);
    }
    $("#round-count").text(init.rounds);
  }
  
  //Adding a PC Slot.
  $(document).on("click", ".add-pc", function () {
    var success = document.getElementById("success-roll").value;
    var advantage = document.getElementById("advantage-roll").value;
    var triumph = document.getElementById("triumph-roll").value;

    if (success > 0 || advantage > 0 || triumph > 0) {
      init.slots.push({ type: 3, success: success, advantage: advantage, triumph: triumph, boost: 0, setback: 0, active: false, finished: false });
    }

    reset();
    init.renderHTML();
  });
  
  //Adding an Ally slot.
  $(document).on("click", ".add-ally", function () {
    var success = document.getElementById("success-roll").value;
    var advantage = document.getElementById("advantage-roll").value;
    var triumph = document.getElementById("triumph-roll").value;

    if (success > 0 || advantage > 0 || triumph > 0) {
      init.slots.push({ type: 2, success: success, advantage: advantage, triumph: triumph, boost: 0, setback: 0, active: false, finished: false });
    }

    reset();
    init.renderHTML();
  });
  
  //Adding an Enemy slot.
  $(document).on("click", ".add-enemy", function () {
    var success = document.getElementById("success-roll").value;
    var advantage = document.getElementById("advantage-roll").value;
    var triumph = document.getElementById("triumph-roll").value;

    if (success > 0 || advantage > 0 || triumph > 0) {
      init.slots.push({ type: 1, success: success, advantage: advantage, triumph: triumph, boost: 0, setback: 0, active: false, finished: false });
    }

    reset();
    init.renderHTML();
  });

  $("#begin-combat").click(function () {
    init.beginCombat();
  })

  $("#end-turn").click(function () {
    init.endTurn();
  })
  
  $("#end-round").click(function () {
    init.endRound();
  })
  
  $("#end-combat").click(function () {
    
  })
  
  $("#init-clear").click(function () {
    init.rounds = 1;
    init.slots.length = 0;
    init.renderHTML();
  })
  
  $(document).on("click", ".boost-count", function() {
    var parentSlot = $(this).closest("li");
    var boostObject = $(".tracker-list li").index(parentSlot);
    
    init.slots[boostObject].boost++;
    init.renderHTML();
  })
  
  $(document).on("click", ".setback-count", function() {
    var parentSlot = $(this).closest("li");
    var boostObject = $(".tracker-list li").index(parentSlot);
    
    init.slots[boostObject].setback++;
    init.renderHTML();
  })
  
  /* ======================================== */
  /* ========== CHARACTER MONITOR =========== */
  /* ======================================== */
  
  //Declare Characters for the character monitor.
  function Character(name, woundThr, strainThr) {
    this.name = name;
    this.woundThr = woundThr;
    this.strainThr = strainThr;
    this.boost = 0;
    this.setback = 0;
    this.crits = [];
  }

  function Crit(name, severity) {
    this.name = name;
    this.severity = severity;
  }
  
  //Set the selected character for manipulation.
  $(document).on("click", ".character", function () {
    $(".character").removeClass("selected-char");
    $(this).addClass("selected-char");
  });

});