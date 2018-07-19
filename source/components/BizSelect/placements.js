const autoAdjustOverflow = {
  adjustX: 1,
  adjustY: 1,
};

export const placements = {
  bottomLeft: {
    points: ['tl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, 7],
  },
  bottomRight: {
    points: ['tr', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, 7],
  },
  bottomCenter: {
    points: ['tc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, 7],
  },
  topCenter: {
    points: ['bc', 'bc'],
    overflow: autoAdjustOverflow,
    offset: [0, -39],
  },
  topLeft: {
    points: ['bl', 'bl'],
    overflow: autoAdjustOverflow,
    offset: [0, -39],
  },
  topRight: {
    points: ['br', 'br'],
    overflow: autoAdjustOverflow,
    offset: [0, -39],
  }
};

export default placements;
