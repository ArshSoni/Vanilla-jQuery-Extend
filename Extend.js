
	function Extend(recipientObj) {
		recipientObj = recipientObj || {};

		/* Turn arguments into a real array object minus the first argument (recipientObj) */
		var donorObjects = [].slice.call(arguments, 1),
			donateKeysToRecipient = donateObjectKeys.bind(null, recipientObj);

		/* Loop over all arguments */
		donorObjects.forEach(donateKeysToRecipient);

		return recipientObj;
	}


	function isExtendableObject(obj) {
		var jQuery = (window.$ || window.jQuery);

		if (
			!obj ||
			Array.isArray(obj) ||
			typeof obj !== 'object' ||
			obj instanceof (window.HTMLElement || window.Node) ||
			(jQuery && obj instanceof jQuery) ||
			(obj instanceof window.NodeList)
		) {
			return false;
		}
		return true;
	}

	/* PRIVATE METHODS --------------------------------- */

	/**
	 * function that copies over keys from one object to the recipient object 
	 */
	function donateKeyValue(recipientObj, donorObj, key) {
		var donorKeyValue = donorObj[key];

		/* Truthy Check is needed because 'null' is an object */
		if (isExtendableObject(donorKeyValue)) {
			recipientObj[key] = Extend(recipientObj[key], donorKeyValue);
		} else {
			recipientObj[key] = donorKeyValue;
		}

		return recipientObj;
	}

	/**
	 * function that copies over object KEYS from an object to the recipient object
	 */
	function donateObjectKeys(recipientObj, donorObj) {
		var donateKeyValueToRecipient = donateKeyValue.bind(null, recipientObj, donorObj),
			donorKeys;

		if (donorObj) {
			donorKeys = Object.keys(donorObj);
			donorKeys.forEach(donateKeyValueToRecipient);

		}
		return recipientObj;
	}
  