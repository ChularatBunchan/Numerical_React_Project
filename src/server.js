import axios from 'axios';

async function getData() {
    try {
      const response = await axios.get('https://numer.chularatbunchan.repl.co/numer');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }
console.log(getData())
  