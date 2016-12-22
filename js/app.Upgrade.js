(function() {

var Upgrade = function(upgrade) {
	var me = this;
	this.max_level = upgrade.levels || upgrade_max_level;
	this.upgrade = upgrade;
	this.level = 0;
	this.cost = 0;
	this.part = upgrade.part || null;
	this.erequires = upgrade.erequires || null;
	this.ecost = upgrade.ecost || 0;
	this.display_cost = '';

	this.addProperty('affordable', true);
};

Upgrade.prototype.setLevel = function(level) {
	this.level = level;
	// TODO move to ui
	this.$levels.html(level);

	if ( this.ecost ) {
		if ( this.upgrade.multiplier ) {
			this.ecost = this.upgrade.ecost * Math.pow(this.upgrade.multiplier, this.level);
		} else {
			this.ecost = this.upgrade.ecost;
		}

		if ( this.level >= this.max_level ) {
			this.display_cost = '--';
		} else {
			this.display_cost = fmt(this.ecost);
		}
	} else {
		this.cost = this.upgrade.cost * Math.pow(this.upgrade.multiplier, this.level);

		if ( this.level >= this.max_level ) {
			this.display_cost = '--';
		} else {
			this.display_cost = fmt(this.cost);
		}
	}

	this.upgrade.onclick(this);
};

Upgrade.prototype.addProperty = addProperty;

window.Upgrade = Upgrade;

})();