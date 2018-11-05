export const isFunction = obj => typeof obj === "function";
export const isObject = obj => typeof obj === "object";

export const IsStringNullOrEmpty = (str) => (!str || !str.toString().trim());
export const IsNotNullAndHasAny = (f) => f != null && f.length > 0;

// export const DeepClone = (obj) => FastClone.cloneArray([obj])[0];
// export const DeepCloneArray = (obj) => FastClone.cloneArray(obj);

// export const CopyValuesFromObject = function (fromObject, toObject) {
// 	for (var k in toObject) {
// 		if (fromObject[k] != null)
// 			toObject[k] = fromObject[k];
// 	}
// 	return toObject;
// }
// export const CopyAllProperties = (fromObject, toObject) => {
// 	var toObj = toObject || {};
// 	for (var k in fromObject) toObj[k] = fromObject[k];
// 	return toObj;
// }
// export const CopyJustProperties = function (fromObject, toObject) {
// 	var toObj = toObject || {};
// 	for (var k in fromObject)
// 		if (!isFunction(fromObject[k]))
// 			toObj[k] = fromObject[k];
// 	return toObj;
// }
// export const DeleteJustProperties = function (fromObject) {
// 	for (var k in fromObject)
// 		if (typeof fromObject[k] !== "function")
// 			delete fromObject[k];
// 	return fromObject;
// }
// export const CopyJustFunctions = function (fromObject, toObject) {
// 	var toObj = toObject || {};
// 	for (var k in fromObject)
// 		if (typeof fromObject[k] === "function")
// 			toObj[k] = fromObject[k];
// 	return toObj;
// }
// export const PropertiesToArray = function (fromObject) {
// 	var arr = [];
// 	for (var k in fromObject) arr.push(fromObject[k]);
// 	return arr;
// }
// export const PropertiesToObjects = function (fromObject) {
// 	var arr = [];
// 	for (var k in fromObject) arr.push({ name: k, value: fromObject[k] });
// 	return arr;
// }
// export const ToArray = function (fromObject) {
// 	return fromObject.length === 0 ? [] : RangeTo(0, fromObject.length - 1).map(function (f) { return fromObject[f]; });
// };
// export const RangeTo = function (intFrom, intTo) {
// 	var step = intFrom <= intTo ? 1 : -1;
// 	var ret = [];
// 	do {
// 		ret.push(intFrom);
// 		if (intFrom === intTo)
// 			break;
// 		intFrom += step;
// 	} while (true);
// 	return ret;
// }

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

// var FastClone = {
//     /**
//      * This is a factory method that creates clone constructor function
//      * for a specified object
//      *
//      * @param {Object} source - source object that need to be cloned next
//      * @param {Boolean} isDeep - flag that represents should be clone deep or not (default: true)
//      * @returns {Function}
//      */
//     factory: function (source, isDeep) {
//         if (typeof source != 'object' || Array.isArray(source)) {
//             throw new Error('Source is not an object');
//         }
//         var deep = isDeep === undefined ? true : isDeep;

//         return new Function('src', FastClone._getKeyMap(source, deep));
//     },

//     /**
//      * This method is for array cloning
//      *
//      * @param {Array} source - source array to clone
//      * @param {Boolean} isDeep - flag that represents should be clone deep or not (default: true)
//      * @returns {Array}
//      */
//     cloneArray: function (source, isDeep) {
//         if (!Array.isArray(source)) {
//             throw new Error('Source should be an array');
//         }
//         var deep = isDeep === undefined ? true : isDeep;

//         var clonedArray = [];
//         if (source.length) {
//             var Clone = FastClone.factory(source[0], deep);
//             for (var i = 0; i < source.length; i++) {
//                 clonedArray.push(new Clone(source[i]));
//             }
//         }
//         return clonedArray;
//     },

//     /**
//      * This method create map of object fields
//      * for eval in clone function
//      *
//      * @param {Object|Array} source - source object that need to be cloned next
//      * @param {Boolean} deep - flag that represents should be clone deep or not
//      * @param {String} baseKey - current sequence of object keys
//      * @param {Number} arrIndex - current sequence of array indexes
//      * @returns {string}
//      */
//     _getKeyMap: function (source, deep, baseKey, arrIndex) {
//         var base = baseKey || '';
//         var index = (arrIndex || 0) + 1;

//         var keysMap = base ? 'this' + base : '';

//         if (Array.isArray(source)) {
//             var iterVal = 'i' + index; // name of the current counter value
//             var iterPath = base + '[' + iterVal + ']'; // path of the current array value

//             if (typeof source[0] == 'object') {
//                 // This cycle will write code for copy array values
//                 keysMap += base ? ' = [];' : '';
//                 keysMap += 'for (var ' + iterVal + ' = 0; ' + iterVal + ' < src' + base + '.length; ' + iterVal + '++) {';
//                 keysMap += FastClone._getKeyMap(source[0], deep, iterPath, index);
//                 keysMap += '}';
//             } else {
//                 keysMap += ' = src' + base + '.slice();';
//             }
//         } else {
//             keysMap += base ? ' = {};' : '';

//             // Iterate over object keys
//             for (var key in source) {
//                 if (!source.hasOwnProperty(key)) {
//                     continue;
//                 }

//                 var value = source[key];
//                 var path = base + '.' + key; // current key path

//                 if (deep && typeof value == 'object' && value !== null) {
//                     keysMap += FastClone._getKeyMap(value, deep, path, index);
//                 } else {
//                     keysMap += 'this' + path + ' = src' + path + ';';
//                 }
//             }
//         }

//         return keysMap;
//     }
// };
