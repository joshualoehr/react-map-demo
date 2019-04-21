// http://mathworld.wolfram.com/Box-MullerTransformation.html
export const randNorm = (mu = 0, sigma = 1) => {
    const [x1, x2] = [Math.random(), Math.random()];
    const z1 = Math.sqrt(-2.0 * Math.log(x1)) * Math.cos(2.0 * Math.PI * x2);
    const z2 = Math.sqrt(-2.0 * Math.log(x1)) * Math.sin(2.0 * Math.PI * x2);
    return [z1, z2].map(z => z * sigma + mu);
};