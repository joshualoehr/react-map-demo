// http://mathworld.wolfram.com/Box-MullerTransformation.html
export const randNorm = (mu = 0, sigma = 1) => {
    const [x1, x2] = [Math.random(), Math.random()];
    const z1 = Math.sqrt(-2.0 * Math.log(x1)) * Math.cos(2.0 * Math.PI * x2);
    const z2 = Math.sqrt(-2.0 * Math.log(x1)) * Math.sin(2.0 * Math.PI * x2);
    return [z1, z2].map(z => z * sigma + mu);
};

export const rotate = (arr, n = 1) => arr.slice(n).concat(arr.slice(0, n));

// adapted from https://github.com/substack/point-in-polygon/blob/master/index.js
export const polygonContainsPoint = (point, vs) => {
    vs = vs.map(({lat, lng}) => [lat, lng]);
    const x = point[0], y = point[1];
    
    let inside = false;
    for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        const xi = vs[i][0], yi = vs[i][1];
        const xj = vs[j][0], yj = vs[j][1];
        
        const intersect = ((yi > y) !== (yj > y))
                        && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
}