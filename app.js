const http = require('http');
const { add, subtract, multiply, divide } = require('./calculator');

const operations = {
  add,
  plus: add,
  subtract,
  minus: subtract,
  multiply,
  multiplier: multiply,
  divide,
  division: divide,
};

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname !== '/calculate') {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Use /calculate endpoint.' }));
    return;
  }

  const op = (url.searchParams.get('op') || '').toLowerCase();
  const a = url.searchParams.get('a');
  const b = url.searchParams.get('b');

  try {
    if (!operations[op]) {
      throw new Error('Unsupported operation. Use add, subtract, multiply, or divide.');
    }

    const result = operations[op](a, b);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ operation: op, a: Number(a), b: Number(b), result }));
  } catch (error) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: error.message }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Calculator app running at http://localhost:${PORT}`);
  console.log('Example: /calculate?op=add&a=1&b=2');
});
