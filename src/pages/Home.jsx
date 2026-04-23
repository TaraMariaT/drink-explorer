import { useState } from "react";
import { fetchRandomDrink } from "../api";
import { getIngredients } from "./utils";

function Home() {
  const [drink, setDrink] = useState(null);
  const [saved, setSaved] = useState(
    JSON.parse(localStorage.getItem("savedDrinks") || "[]")
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadDrink = async () => {
    try {
      setLoading(true);
      setError(null);

      const d = await fetchRandomDrink();
      setDrink(d);
    } catch (e) {
      setError("Failed to load drink");
    } finally {
      setLoading(false);
    }
  };

  const addToList = (liked) => {
    if (!drink) return;

    const entry = {
      id: drink.idDrink,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      liked
    };

    const updated = [...saved, entry];
    setSaved(updated);
    localStorage.setItem("savedDrinks", JSON.stringify(updated));
  };

  return (
    <div>
      {/* HERO */}
      <div className="hero">
        <h1>🍸 Drink Explorer</h1>
        <p>Discover cocktails from a free public API</p>

        <button className="primary-btn" onClick={loadDrink}>
          Get random drink
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="card">
          <p style={{ color: "salmon" }}>{error}</p>
        </div>
      )}

      {/* LOADING */}
      {loading && (
        <div className="card">
          <p>Loading cocktail... 🍸</p>
        </div>
      )}

      {/* EMPTY STATE */}
      {!loading && !drink && !error && (
        <div className="card">
          <p>Click the button to discover a cocktail 🍸</p>
        </div>
      )}

      {/* DRINK CARD */}
      {drink && !loading && (
        <div className="card drink-card">
          <div className="drink-content">
            <img src={drink.strDrinkThumb} alt={drink.strDrink} />

            <div>
              <h2>{drink.strDrink}</h2>
              <p className="instructions">{drink.strInstructions}</p>

              <h3>Ingredients</h3>
              <ul className="ingredients">
                {getIngredients(drink).map((ing, i) => (
                  <li key={i}>{ing}</li>
                ))}
              </ul>

              <div className="actions">
                <button onClick={() => addToList(true)}>👍 Like</button>
                <button onClick={() => addToList(false)}>👎 Dislike</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;