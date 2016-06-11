import Promise from 'bluebird';
import { csv } from 'dsv';
import fs from 'fs';
import path from 'path';

Promise.promisifyAll(fs);

export function getBabyNames(name, gender) {
  const file = path.join(__dirname, '../data/names1880-2012.csv');
  return fs.readFileAsync(file, 'utf8')
    .then(names => {
      names = csv.parse(names);

      return names.filter(n => n.name === name && n.gender === gender);
    });
}
