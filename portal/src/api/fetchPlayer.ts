import axios from 'axios';

export async function fetchPlayer() {
  const response = await fetch('http://localhost:5000/players');
  console.log(response);
  const res = await axios.get('http://localhost:5000/players');
  console.log(res);
}
