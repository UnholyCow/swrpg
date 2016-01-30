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

//Declare Characters for the character monitor.
function Monitor() {
  this.chars = [];
}

var display = new Monitor();

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
  var resetInit = function () {
    $('#success-roll').val("");
    $('#advantage-roll').val("");
    $('#triumph-roll').val("");
  };
  
  var resetChar = function () {
    $('#char-name').val("");
    $('#wound-thr').val("");
    $('#strain-thr').val("");
  };
  
  var resetVehicle = function () {
    $('#vehicle-name').val("");
    $('#hull-thr').val("");
    $('#sys-strain-thr').val("");
    $('#silhouette').val("");
    $('#top-speed').val("");
    $('#handling').val("");
    $('#def-fore').val("");
    $('#def-aft').val("");
    $('#def-port').val("");
    $('#def-starboard').val("");
  };
  
  //Sorting function
  function compare(a, b) {
    if (a.success === b.success && a.advantage === b.advantage) {
      return b.type - a.type;
    } else {
      if (a.success === b.success) {
        return b.advantage - a.advantage;
      } else {
        return b.success - a.success;
      }
    }
  }
  
  Tracker.prototype.addPC = function () {
    var success = document.getElementById("success-roll").value;
    var advantage = document.getElementById("advantage-roll").value;
    var triumph = document.getElementById("triumph-roll").value;

    if (success > 0 || advantage > 0 || triumph > 0) {
      init.slots.push({ type: 3, success: success, advantage: advantage, triumph: triumph, boost: 0, setback: 0, active: false, finished: false });
    }

    resetInit();
    init.renderHTML();
  }
  
  Tracker.prototype.addAlly = function () {
    var success = document.getElementById("success-roll").value;
    var advantage = document.getElementById("advantage-roll").value;
    var triumph = document.getElementById("triumph-roll").value;

    if (success > 0 || advantage > 0 || triumph > 0) {
      init.slots.push({ type: 2, success: success, advantage: advantage, triumph: triumph, boost: 0, setback: 0, active: false, finished: false });
    }

    resetInit();
    init.renderHTML();
  }
  
  Tracker.prototype.addEnemy = function () {
    var success = document.getElementById("success-roll").value;
    var advantage = document.getElementById("advantage-roll").value;
    var triumph = document.getElementById("triumph-roll").value;

    if (success > 0 || advantage > 0 || triumph > 0) {
      init.slots.push({ type: 1, success: success, advantage: advantage, triumph: triumph, boost: 0, setback: 0, active: false, finished: false });
    }

    resetInit();
    init.renderHTML();
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
    this.activeIndex = 0;
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
    init.addPC();
    display.addChar();
  });
  
  //Adding an Ally slot.
  $(document).on("click", ".add-ally", function () {
    init.addAlly();
    display.addChar();
  });
  
  //Adding an Enemy slot.
  $(document).on("click", ".add-enemy", function () {
    init.addEnemy();
    display.addChar();
  });
  
  //Adding a vehicle.
  $(document).on("click", ".add-vehicle", function () {
    display.addVehicle();
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
    var setbackObject = $(".tracker-list li").index(parentSlot);
    
    init.slots[setbackObject].setback++;
    init.renderHTML();
  })
  
  $(document).on("click", ".remove", function() {
    var parentSlot = $(this).closest("li");
    var slotObject = $(".tracker-list li").index(parentSlot);
    
    init.slots.splice(slotObject, 1);
    init.slots.sort(compare);
    init.renderHTML();
  })
  
  /* ======================================== */
  /* ========== CHARACTER MONITOR =========== */
  /* ======================================== */
  
  //Set the selected character for manipulation.
  // $(document).on("click", ".character", function () {
  //   $(".character").removeClass("selected-char");
  //   $(this).addClass("selected-char");
  // });
  
  //Adding a character to the monitor.
  Monitor.prototype.addChar = function () {
    var name = document.getElementById("char-name").value;
    var wounds = document.getElementById("wound-thr").value;
    var strain = document.getElementById("strain-thr").value;

    if (name != 0 && wounds > 0) {
      display.chars.push({ type: 0, name: name, woundCurrent: 0, woundThr: wounds, strainCurrent: 0, strainThr: strain, boost: 0, setback: 0 });
    }
    
    resetChar();
    display.renderHTML();
  }
  
  //Adding a vehicle/ship to the monitor.
  Monitor.prototype.addVehicle = function () {
    var name = document.getElementById("vehicle-name").value;
    var wounds = document.getElementById("hull-thr").value;
    var strain = document.getElementById("sys-strain-thr").value;
    var silhouette = document.getElementById('silhouette').value;
    var topSpeed = document.getElementById('top-speed').value;
    var handling = document.getElementById("handling").value;
    var defFore = document.getElementById("def-fore").value;
    var defAft = document.getElementById("def-aft").value;
    var defPort = document.getElementById('def-port').value;
    var defStarboard = document.getElementById('def-starboard').value;

    if (name != 0 && wounds > 0 && strain > 0 && silhouette > 0 && topSpeed > 0) {
      display.chars.push({ type: 1, name: name, woundCurrent: 0, woundThr: wounds, strainCurrent: 0, strainThr: strain, silhouette: silhouette, topSpeed: topSpeed, currentSpeed: 0, handling: handling, defFore: defFore, defAft: defAft, defPort: defPort, defStarboard: defStarboard });
    }
    
    resetVehicle();
    display.renderHTML();
  }
 
  Monitor.prototype.renderHTML = function () {
    $("#monitor-container").empty();
    for (var i = 0; i < display.chars.length; i++) {
      var el = display.chars[i];
      if (el.type === 0) {
        var htmlString = '<div class="character">';
        htmlString += '<div><span class="icon icon-cross remove-char"></span></div>';
        htmlString += '<h3>' + el.name + '</h3>'
        htmlString += '<div class="stat-small-wide"><div class="tag-small';
        if (el.woundCurrent >= el.woundThr) {
          htmlString += ' tagRed';
        }
        htmlString += '">Wounds / Threshold</div>';
        htmlString += '<div class="value-small">';
        htmlString += '<div class="char-wound-dmg"><span class="icon icon-plus"></span></div> ';
        htmlString += el.woundCurrent;
        htmlString += ' / ';
        htmlString += el.woundThr;
        htmlString += ' <div class="char-wound-heal"><span class="icon icon-minus"></span></div>';
        htmlString += '</div></div> ';
        if (el.strainThr > 0) {
          htmlString += '<div class="stat-small-wide">';
          htmlString += '<div class="tag-small';
          if (el.strainCurrent >= el.strainThr) {
            htmlString += ' tagRed';
          }
          htmlString += '">Strain / Threshold</div>';
          htmlString += '<div class="value-small">';
          htmlString += '<div class="char-strain-dmg"><span class="icon icon-plus"></span></div> ';
          htmlString += el.strainCurrent;
          htmlString += ' / ';
          htmlString += el.strainThr;
          htmlString += ' <div class="char-strain-heal"><span class="icon icon-minus"></span></div>';
          htmlString += '</div></div>';
        }
        htmlString += '<div class="char-field boost-count-char">'+ el.boost +'<span class="eote bo2"></span></div>';
        htmlString += '<div class="char-field remove-dice remove-boost"><span class="icon icon-cross"></span></div>';
        htmlString += '<div class="char-field setback-count-char">'+ el.setback +'<span class="eote se2 contrast"></span></div>';
        htmlString += '<div class="char-field remove-dice remove-setback"><span class="icon icon-cross"></span></div>';
      }
      if (el.type === 1) {
        var htmlString = '<div class="character">';
        htmlString += '<div><span class="icon icon-cross remove-char"></span></div>';
        htmlString += '<h3>' + el.name + '</h3>'
        htmlString += '<div class="stat-small-wide"><div class="tag-small';
        if (el.woundCurrent >= el.woundThr) {
          htmlString += ' tagRed';
        }
        htmlString += '">Hull / Threshold</div>';
        htmlString += '<div class="value-small">';
        htmlString += '<div class="char-wound-dmg"><span class="icon icon-plus"></span></div> ';
        htmlString += el.woundCurrent;
        htmlString += ' / ';
        htmlString += el.woundThr;
        htmlString += ' <div class="char-wound-heal"><span class="icon icon-minus"></span></div>';
        htmlString += '</div></div> ';
        if (el.strainThr > 0) {
          htmlString += '<div class="stat-small-wide">';
          htmlString += '<div class="tag-small';
          if (el.strainCurrent >= el.strainThr) {
            htmlString += ' tagRed';
          }
          htmlString += '">Sys Strain / Threshold</div>';
          htmlString += '<div class="value-small">';
          htmlString += '<div class="char-strain-dmg"><span class="icon icon-plus"></span></div> ';
          htmlString += el.strainCurrent;
          htmlString += ' / ';
          htmlString += el.strainThr;
          htmlString += ' <div class="char-strain-heal"><span class="icon icon-minus"></span></div>';
          htmlString += '</div></div>';
        }
         htmlString += ' <div class="stat-small-wide"><div class="tag-small';
        if (el.currentSpeed === 0) {
          htmlString += ' tagRed';
        } else if (el.currentSpeed >= el.topSpeed) {
          htmlString += ' tagGreen';
        } else {
          htmlString += ' tagBlue';
        }
        htmlString += '">Speed / Top Speed</div>';
        htmlString += '<div class="value-small">';
        htmlString += '<div class="vehicle-speed-up"><span class="icon icon-plus"></span></div> ';
        htmlString += el.currentSpeed;
        htmlString += ' / ';
        htmlString += el.topSpeed;
        htmlString += ' <div class="vehicle-speed-down"><span class="icon icon-minus"></span></div>';
        htmlString += '</div></div> ';
        htmlString += '<div class="stat-small"><div class="tag-small"><span>Silhouette</span></div>';
        htmlString += '<div class="value-small"><span>';
        htmlString += el.silhouette;
        htmlString += '</span></div></div><br>';
        htmlString += '<div class="stat-small"><div class="tag-small"><span>Handling</span></div>';
        htmlString += '<div class="value-small"><span>';
        htmlString += el.handling;
        htmlString += '</span></div></div>';
        htmlString += ' <div class="stat-small"><div class="tag-small"><span>Def Fore</span></div>';
        htmlString += '<div class="value-small"><span>';
        if (el.defFore > 0) {
          htmlString += el.defFore;
        } else {
          htmlString += 0
        }
        htmlString += '</span></div></div>';
        htmlString += ' <div class="stat-small"><div class="tag-small"><span>Def Aft</span></div>';
        htmlString += '<div class="value-small"><span>';
        if (el.defAft > 0) {
          htmlString += el.defAft;
        } else {
          htmlString += 0
        }
        htmlString += '</span></div></div>';
        if (el.silhouette >= 5) {
          htmlString += ' <div class="stat-small"><div class="tag-small"><span>Def Port</span></div>';
          htmlString += '<div class="value-small"><span>';
          if (el.defPort > 0) {
            htmlString += el.defPort;
          } else {
            htmlString += 0
          }
          htmlString += '</span></div></div>';
          htmlString += ' <div class="stat-small"><div class="tag-small"><span>Def Starboard</span></div>';
          htmlString += '<div class="value-small"><span>';
          if (el.defStarboard > 0) {
            htmlString += el.defStarboard;
          } else {
            htmlString += 0
          }
          htmlString += '</span></div></div>';
        }
      }

      $("#monitor-container").append(htmlString);
    }
  }
  
  Monitor.prototype.clear = function () {
    display.chars.length = 0;
    display.renderHTML();
  }
  
  $(document).on("click", ".char-wound-dmg", function () {
    var parentSlot = $(this).closest(".character");
    var woundObject = $("#monitor-container div.character").index(parentSlot);
    
    display.chars[woundObject].woundCurrent++;
    display.renderHTML();
  });
  
  $(document).on("click", ".char-wound-heal", function () {
    var parentSlot = $(this).closest(".character");
    var woundObject = $("#monitor-container div.character").index(parentSlot);
    
    display.chars[woundObject].woundCurrent--;
    if (display.chars[woundObject].woundCurrent < 0) {
      display.chars[woundObject].woundCurrent = 0;
    }
    display.renderHTML();
  });
  
  $(document).on("click", ".char-strain-dmg", function () {
    var parentSlot = $(this).closest(".character");
    var woundObject = $("#monitor-container div.character").index(parentSlot);
    
    display.chars[woundObject].strainCurrent++;
    if (display.chars[woundObject].strainCurrent > display.chars[woundObject].strainThr) {
      display.chars[woundObject].strainCurrent = display.chars[woundObject].strainThr;
    }
    display.renderHTML();
  });
  
  $(document).on("click", ".char-strain-heal", function () {
    var parentSlot = $(this).closest(".character");
    var woundObject = $("#monitor-container div.character").index(parentSlot);
    
    display.chars[woundObject].strainCurrent--;
    if (display.chars[woundObject].strainCurrent < 0) {
      display.chars[woundObject].strainCurrent = 0;
    }
    display.renderHTML();
  });
  
  $(document).on("click", ".boost-count-char", function () {
    var parentSlot = $(this).closest(".character");
    var woundObject = $("#monitor-container div.character").index(parentSlot);
    
    display.chars[woundObject].boost++;
    display.renderHTML();
  });
  
  $(document).on("click", ".remove-boost", function () {
    var parentSlot = $(this).closest(".character");
    var woundObject = $("#monitor-container div.character").index(parentSlot);
    
    display.chars[woundObject].boost = 0;
    display.renderHTML();
  });
  
  $(document).on("click", ".setback-count-char", function () {
    var parentSlot = $(this).closest(".character");
    var woundObject = $("#monitor-container div.character").index(parentSlot);
    
    display.chars[woundObject].setback++;
    display.renderHTML();
  });
  
  $(document).on("click", ".remove-setback", function () {
    var parentSlot = $(this).closest(".character");
    var woundObject = $("#monitor-container div.character").index(parentSlot);
    
    display.chars[woundObject].setback = 0;
    display.renderHTML();
  });
  
  $(document).on("click", ".vehicle-speed-up", function () {
    var parentSlot = $(this).closest(".character");
    var speedObject = $("#monitor-container div.character").index(parentSlot);
    
    display.chars[speedObject].currentSpeed++;
    if (display.chars[speedObject].currentSpeed > display.chars[speedObject].topSpeed) {
      display.chars[speedObject].currentSpeed = display.chars[speedObject].topSpeed;
    }
    display.renderHTML();
  });
  
  $(document).on("click", ".vehicle-speed-down", function () {
    var parentSlot = $(this).closest(".character");
    var speedObject = $("#monitor-container div.character").index(parentSlot);
    
    display.chars[speedObject].currentSpeed--;
    if (display.chars[speedObject].currentSpeed < 0) {
      display.chars[speedObject].currentSpeed = 0;
    }
    display.renderHTML();
  });
  
  $(document).on("click", ".remove-char", function () {
    var parentSlot = $(this).closest(".character");
    var woundObject = $("#monitor-container div.character").index(parentSlot);
    
    display.chars.splice(woundObject, 1);
    display.renderHTML();
  });
  
  $("#char-clear").click(function() {
    display.clear();
  });
  
});