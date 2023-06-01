export async function fetchPlayer() {
  const response = await fetch('http://127.0.0.1:5000/players/1/details');
  console.log(response);
}
