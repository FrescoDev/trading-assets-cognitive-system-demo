module.exports = (input, weights) => weights[0] / (weights[1] + Math.exp(-weights[2] * input));
