export async function fetchRandomDrink() {
  const res = await fetch(
    "https://www.thecocktaildb.com/api/json/v1/1/random.php"
  );
  const data = await res.json();
  return data.drinks[0];
}