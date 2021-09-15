import fs from 'fs';
import path from 'path';
import * as csv from 'fast-csv';

// Helper: Input
export const loadData = ({ input = '' }) => {
  const data = [];
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.resolve(input))
      .pipe(csv.parse({ headers: true }))
      .on('error', (error) => reject(error))
      .on('data', (row) => data.push(row.name))
      .on('end', (rowCount) => {
        console.log(`Parsed ${rowCount} rows`);
        resolve(data);
      });
  });
};

// Helper: Output
export const outputResult = (data = [], { output = '' }) => new Promise((resolve, reject) => {
  csv.writeToPath(output, data, { headers: true })
    .on('error', (err) => reject(err))
    .on('finish', () => resolve());
  /* csvStream.pipe(process.stdout)
      .on('error', (error) => reject(error))
      .on('end', () => process.exit());
    data.forEach((row) => csvStream.write(row));
    csvStream.end(); */
  // resolve();
});
