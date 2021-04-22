var isNumeric = function (value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
};
export default isNumeric;
