$(document).ready(function () {
  
  /* ======================================== */
  /* ========== INITIATIVE TRACKER ========== */
  /* ======================================== */
  
  //Enables sorting for the initiative tracker.
  $(function () {
    $("#sortable").sortable();
    $("#sortable").disableSelection();
  });
  
  //Declare the actual Initiative tracker.
  function Tracker() {
    this.slots = [];
    this.activeIndex = 0;
    this.rounds = 1;
  }
  
  Tracker.prototype.add = function(slot) {
    this.slots.push(slot);
  }
  
  Tracker.prototype.nextTurn = function() {
    this.activeIndex++;
  }
  
  Tracker.prototype.nextRound = function() {
    this.activeIndex = 0;
  }
  
  var tracker = new Tracker();
  
  //Declare Slots for the initiative tracker.
  function Slot(type, success, advantage, triumph) {
    this.type = type;
    this.success = success;
    this.advantage = advantage;
    this.triumph = triumph;
    this.isActive = false;
  }
  
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
  }

});