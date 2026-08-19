const fs = require('fs');

const files = fs.readdirSync('./src/pages').filter(f => f.endsWith('.tsx'));
files.forEach(f => {
  const content = fs.readFileSync('./src/pages/' + f, 'utf-8');
  if (content.includes('div')) {
    console.log(f);
  }
});
