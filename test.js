const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter a long URL: ', async (longUrl) => {
  try {
    const response = await fetch('http://localhost:5000/api/url/shorten', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ longUrl })
    });

    const data = await response.json();
    console.log('Short URL:', data.shortUrl);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    rl.close();
  }
});
