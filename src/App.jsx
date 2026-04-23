import { useEffect, useState } from "react";
import { fetchRandomDrink } from "./api";

function App() {
  const [drink, setDrink] = useState(null);
  const [saved, setSaved] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("savedDrinks");
    if (data) setSaved(JSON.parse(data));
  }, []);

  useEffect(() => {
    localStorage.setItem("savedDrinks", JSON.stringify(saved));
  }, [saved]);

  const loadDrink = async () => {
    const d = await fetchRandomDrink();
    setDrink(d);
  };

  const addToList = (liked) => {
    if (!drink) return;

    const entry = {
      id: drink.idDrink,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      liked
    };

    setSaved([...saved, entry]);
  };

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Arial" }}>
      <h1>🍸 Drink Explorer</h1>

      <button onClick={loadDrink}>Get random drink</button>

      {drink && (
        <div style={{ marginTop: 20 }}>
          <h2>{drink.strDrink}</h2>
          <img src={drink.strDrinkThumb} width="200" />

          <p>{drink.strInstructions}</p>

          <button onClick={() => addToList(true)}>👍 Like</button>
          <button onClick={() => addToList(false)}>👎 Dislike</button>
        </div>
      )}

      <hr />

      <h3>Saved drinks</h3>
      <ul>
        {saved.map(d => (
          <li key={d.id}>
            {d.name} {d.liked ? "👍" : "👎"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;