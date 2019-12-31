import {
  map,
  split,
  trim,
  curry,
  any,
  min,
  max,
  filter,
  reduce,
  minBy,
  compose,
  takeWhile
} from "ramda";

export const parseInput = input => {
  const lines = split("\n", input);
  const result = [];
  for (let y = 0; y < lines.length; y++) {
    const line = trim(lines[y]);
    for (let x = 0; x < line.length; x++) {
      const element = line.charAt(x);
      if (element === "#") {
        result.push({ x, y });
      }
    }
  }
  return result;
};

export const findStation = asteroids =>
  asteroids.reduce(
    (station, currentAsteroid) => {
      const otherAsteroids = asteroids.filter(a => a !== currentAsteroid);
      let currentAsteroidSees = 0;
      for (let i = 0; i < otherAsteroids.length; i++) {
        const visibilityCheckAsteroid = otherAsteroids[i];
        const possibleBlockers = otherAsteroids.filter(a => a !== visibilityCheckAsteroid);
        const isBetweenCurrentAndCheck = isBetween(currentAsteroid, visibilityCheckAsteroid);
        const anyRemainingIsBlocking = any(isBetweenCurrentAndCheck, possibleBlockers);
        if (!anyRemainingIsBlocking) {
          currentAsteroidSees++;
        }
      }
      if (currentAsteroidSees > station.sees) {
        station = {
          x: currentAsteroid.x,
          y: currentAsteroid.y,
          sees: currentAsteroidSees
        };
      }
      return station;
    },
    { x: 0, y: 0, sees: 0 }
  );

export const isBetween = curry((a1, a2, checking) => {
  const isXBetween = checking.x > min(a1.x, a2.x) && checking.x < max(a1.x, a2.x);
  const isYBetween = checking.y > min(a1.y, a2.y) && checking.y < max(a1.y, a2.y);
  if (a1.x === a2.x) {
    // horizontal
    return checking.x === a1.x && isYBetween;
  } else {
    const m = (a2.y - a1.y) / (a2.x - a1.x);
    const isOnLine = checking.y - a1.y === m * (checking.x - a1.x);
    if (m === 0) {
      // vertical
      return isOnLine && isXBetween;
    }
    return isOnLine && isXBetween && isYBetween;
  }
});

export const getAngle = curry((base, check) => {
  const deltaCheck = {
    x: check.x - base.x,
    y: check.y - base.y
  };
  const angle = Math.atan2(deltaCheck.y, deltaCheck.x);
  const angleDeg = (angle * 180) / Math.PI;
  return angleDeg < 0 ? 360 + angleDeg : angleDeg;
});

export const getAbsRadialDistance = curry((base, check) => {
  const deltaCheck = {
    x: check.x - base.x,
    y: check.y - base.y
  };
  const powerToSecond = num => Math.pow(num, 2);
  const distance = Math.sqrt(powerToSecond(deltaCheck.x) + powerToSecond(deltaCheck.y));
  return Math.abs(distance);
});

export const getNthVaporizedAsteroid = (limit, base, cannonDeg, asteroids) => {
  let filteredAsteroids = filter(a => a.x !== base.x || a.y !== base.y, asteroids);
  let currentCannonDeg = cannonDeg;
  let vaporizedCounter = 0;
  while (filteredAsteroids.length > 0) {
    const vaporizedAsteroid = findVaporizedAsteroid(base, currentCannonDeg, filteredAsteroids);
    vaporizedCounter++;
    if (limit === vaporizedCounter) {
      return vaporizedAsteroid;
    }
    filteredAsteroids = filter(
      a => !(a.x === vaporizedAsteroid.x && a.y === vaporizedAsteroid.y),
      filteredAsteroids
    );
    currentCannonDeg = getNextCannonDeg(currentCannonDeg, vaporizedAsteroid.delta);
  }
};

const getNextCannonDeg = (cannonDeg, delta) => {
  const sum = cannonDeg + delta;
  return sum > 360 ? sum - 360 : sum;
};

export const findVaporizedAsteroid = (base, cannonDeg, asteroids) => {
  const getAngleFromBase = getAngle(base);
  const getDistanceFromBase = getAbsRadialDistance(base);
  const betweenCannonAnd360 = angle => angle >= cannonDeg && angle < 360;
  const add360 = angle => angle + 360;
  const cannonDelta = angle =>
    betweenCannonAnd360(angle) ? angle - cannonDeg : add360(angle) - cannonDeg;
  const getDelta = compose(cannonDelta, getAngleFromBase);
  const asteroidsWithDeltaFromCannon = map(
    a => ({
      x: a.x,
      y: a.y,
      delta: getDelta(a)
    }),
    asteroids
  );
  const noNullDeltaAsteroids = filter(a => a.delta !== 0, asteroidsWithDeltaFromCannon);
  const smallestDelta = reduce(
    minBy(a => a.delta),
    { delta: Infinity },
    noNullDeltaAsteroids
  ).delta;
  const smallestDeltaAsteroids = filter(a => a.delta === smallestDelta, noNullDeltaAsteroids);
  return reduce(minBy(getDistanceFromBase), { x: Infinity, y: Infinity }, smallestDeltaAsteroids);
};
