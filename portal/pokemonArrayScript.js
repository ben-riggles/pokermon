import fs from 'fs';

const allPokemonArray = [];
try {
  const content = fs.readFileSync('src/assets/pokemon.csv', 'utf8');
  const allData = content.split('\n');
  for (const data of allData) {
    allPokemonArray.push(data.split(','));
  }
} catch (err) {
  console.error('Error reading the file:', err);
}

const names = [];
for (const pokemon of allPokemonArray) {
  if (pokemon[1]) {
    names.push(pokemon[1].toLowerCase());
  }
}

const namesString =
  'export const pokemonNames = ' + JSON.stringify(names) + ';';

fs.writeFile('src/misc_data/pokemonNames.ts', namesString, (err) => {
  if (err) throw err;
  console.log('Pokemon name array has been written!');
});
