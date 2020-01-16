/* ======================================== */
/* ============= DECLARATIONS ============= */
/* ======================================== */

// Destiny Point tracker
function Tracker() {
	this.light = 0;
	this.dark = 0;
}

// Creating new Tracker
var destiny = new Tracker();

/* ======================================== */
/* =============== FUNCTIONS ============== */
/* ======================================== */


// Fetching light and dark values for Tracker
Tracker.prototype.trackDestiny = function() {
	light = document.getElementById("lightSide").value;
	dark = document.getElementById("darkSide").value;
	console.log(light, dark);
	this.resetForm();
	this.updateUI();
}

// End and reset current destiny Tracker
Tracker.prototype.resetDestiny = function() {
	light = 0;
	dark = 0;
	console.log(light, dark);
}

// Spend Dark Side point
Tracker.prototype.spendDark = function() {
	light++;
	dark--;
	this.updateUI();
	console.log(light, dark);

	// Need to validate a value can't drop below 0!
}

// Spend Light Side point
Tracker.prototype.spendLight = function() {
	light--;
	dark++;
	this.updateUI();
	console.log(light, dark);

	// Need to validate a value can't drop below 0!
}

// Reset Tracker form inputs
Tracker.prototype.resetForm = function() {
	$('#lightSide').val("");
	$('#darkSide').val("");
}

// Update Destiny display values
Tracker.prototype.updateUI = function() {
	lightString = '<h2>' + light + '</h2>';
	darkString = '<h2>' + dark + '</h2>';
	
	$('.lightSide').empty();
	$('.darkSide').empty();
	$('.lightSide').append(lightString);
	$('.darkSide').append(darkString);
}


/* ======================================== */
/* =========== BIND TO INTERFACE ========== */
/* ======================================== */

// ON-CLICK run Tracker
$('#begin-desTrack').click(function () {
	destiny.trackDestiny();
})

// ON-CLICK end and reset Tracker
$('#end-desTrack').click(function () {
	destiny.resetDestiny();
})

// ON-CLICK spend Dark Side point
$('#spend-dark').click(function () {
	destiny.spendDark();
})

// ON-CLICK spend Light Side point
$('#spend-light').click(function () {
	destiny.spendLight();
})