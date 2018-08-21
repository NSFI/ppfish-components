import fs from 'fs';

export const parseDir = (dir, collector) => {
  fs.readdirSync(dir).forEach(function (file) {
    collector.push(file);
  });
};
