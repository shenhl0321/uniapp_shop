function toPrice(val) {
	if (!val) {
		val = 0;
	}

	return val.toFixed(2);
};

function parsePrice(val) {
	if (!val) {
		val = 0;
	}

	return val.toFixed(2).split(".");
}
/**
 * 判断字符串数组是否包含某字符串
 */
function array_contain(array, obj) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] == obj) //如果要求数据类型也一致，这里可使用恒等号===
			return true;
	}

	return false;
}
/**
 * 当前规格值是否可以选择  
 * 
 * 参数说明：
 * @param allProperties  ['颜色:金色;内存:64GB','颜色:金色;内存:256GB']
 * @param selectedPropObj {'颜色':'金色','内存':'64GB'}
 * @param propKeys ['颜色','内存']
 * @param key 颜色
 * @param item 金色
 * 
 * @return 0 可选但跟其他值不匹配  1 可选 
 */
function props_contain(allProperties, selectedPropObj, key, item, propKeys) {
	var properties = "";
	selectedPropObj[key] = item;

	for (var j = 0; j < propKeys.length; j++) {
		properties += propKeys[j] + ":" + selectedPropObj[propKeys[j]] + ";";
	}

	properties = properties.substring(0, properties.length - 1);

	for (var i = 0; i < allProperties.length; i++) {
		if (properties == allProperties[i]) {
			return 1;
		}
	}

	return 0;
}

function parseDiscount(discountRule) {
	if (discountRule == 0) {
		return '满额减';
	} else if (discountRule == 1) {
		return '满件减';
	} else if (discountRule == 2) {
		return '满额折';
	} else if (discountRule == 3) {
		return '满件折';
	} else {
		return '';
	}
}

function parseDiscountMsg(discountRule, needAmount, discount) {
	if (discountRule == 0) {
		return '购满' + needAmount + '元减' + discount + '元';
	} else if (discountRule == 1) {
		return '购满' + needAmount + '件减' + discount + '元';
	} else if (discountRule == 2) {
		return '购满' + needAmount + '元打' + discount + '折';
	} else if (discountRule == 3) {
		return '购满' + needAmount + '件打' + discount + '折';
	} else {
		return '';
	}
}

module.exports = {
	toPrice: toPrice,
	parsePrice: parsePrice,
	array_contain: array_contain,
	props_contain: props_contain,
	parseDiscount: parseDiscount,
	parseDiscountMsg: parseDiscountMsg
};