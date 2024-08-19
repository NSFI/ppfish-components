const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
  alwaysByViewport: true,
};

const placements = {
  topCenter: {
    points: ['bc', 'tc'],
    overflow: autoAdjustOverflow,
    offset: [0, -8],
  },
};

export default placements;
