export const isFunction = obj => typeof obj === "function";
export const isObject = obj => typeof obj === "object";

export const IsStringNullOrEmpty = (str) => (!str || !str.toString().trim());
export const IsNotNullAndHasAny = (f) => f != null && f.length > 0;

export const StringSorter = function(a, b) {
	var arrA = a.toString();
	var arrB = b.toString();
	for (var i = 0; i < arrA.length; i++) {
		var ch1 = arrA[i];
		var ch2 = arrB.length > i ? arrB[i] : '';
		var ch1Low = ch1.toLowerCase();
		var ch2Low = ch2.toLowerCase();
		if (ch1Low > ch2Low) return true;
		if (ch1Low < ch2Low) return false;
		if (ch1 > ch2) return true;
		if (ch1 < ch2) return false;
	}
	if (arrB.length > arrA.length)
		return false;
}
if (!('find' in Array.prototype)) {
	Array.prototype.find = function (find, that /*opt*/) {
		var v;
		for (var i = 0, n = this.length; i < n; i++)
			if (i in this && find.call(that, v = this[i], i, this))
				return v;
		return null;
	};
}
if (!Array.prototype.sortby) {
	Array.prototype.sortby = function (prop, sortfnc) {
		if (sortfnc == null)
			sortfnc = function (f, g) { return f > g; };
		var propfnc = (isFunction(prop) ? prop : function(f) { return f[prop]; });

		var retdata = this.map(function (f) { return f; });
		for (var i = 0; i < retdata.length - 1; i++)
			for (var j = i + 1; j < retdata.length; j++)
				if (sortfnc(propfnc(retdata[i]), propfnc(retdata[j]))) {
					var temp = retdata[i];
					retdata[i] = retdata[j];
					retdata[j] = temp;
				};
		return retdata;
	}
}