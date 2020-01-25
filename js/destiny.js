/* ======================================== */
/* ============= DECLARATIONS ============= */
/* ======================================== */

// Destiny Point tracker
function tracker() {
	this.light = 0;
	this.dark = 0;
}

// Creating new Tracker
var destiny = new tracker();

/* ======================================== */
/* =============== FUNCTIONS ============== */
/* ======================================== */


// Fetching light and dark values for Tracker
tracker.prototype.trackDestiny = function() {
	light = document.getElementById("lightSide").value;
	dark = document.getElementById("darkSide").value;
	console.log(light, dark);
	this.resetForm();
	this.updateUI();
}

// End and reset current destiny Tracker
tracker.prototype.resetDestiny = function() {
	light = 0;
	dark = 0;
	console.log(light, dark);
}

// Spend Dark Side point
tracker.prototype.spendDark = function() {
	light++;
	dark--;
	this.updateUI();
	console.log(light, dark);

	// Need to validate a value can't drop below 0!
}

// Spend Light Side point
tracker.prototype.spendLight = function() {
	light--;
	dark++;
	this.updateUI();
	console.log(light, dark);

	// Need to validate a value can't drop below 0!
}

// Reset Tracker form inputs
tracker.prototype.resetForm = function() {
	$('#lightSide').val("");
	$('#darkSide').val("");

	this.updateUI();
}

// Update Destiny display values
tracker.prototype.updateUI = function() {
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
	destiny.updateUI();
})

// ON-CLICK spend Dark Side point
$('.darkSide').click(function () {
	destiny.spendDark();
})

// ON-CLICK spend Light Side point
$('.lightSide').click(function () {
	destiny.spendLight();
})