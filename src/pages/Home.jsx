import { useState, useRef } from "react";
import { fetchRandomDrink, searchDrinks } from "../api";
import { getIngredients } from "./utils";

function Home() {
  const [drink, setDrink] = useState(null);
  const [saved, setSaved] = useState(
    JSON.parse(localStorage.getItem("savedDrinks") || "[]")
  );

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [message, setMessage] = useState("");

  const drinkRef = useRef(null);

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

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const drinks = await searchDrinks(search);

      setResults(drinks);
    } catch (e) {
      setError("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const addToList = (liked) => {
    if (!drink) return;

    const alreadySaved = saved.some((d) => d.id === drink.idDrink);

    if (alreadySaved) {
      setMessage("⚠️ This drink is already saved!");
      setTimeout(() => setMessage(""), 2000);
      return;
    }

    const entry = {
      id: drink.idDrink,
      name: drink.strDrink,
      image: drink.strDrinkThumb,
      liked
    };

    const updated = [...saved, entry];
    setSaved(updated);
    localStorage.setItem("savedDrinks", JSON.stringify(updated));

    setMessage(liked ? "✅ Saved as liked!" : "❌ Saved as disliked!");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <div>
      {/* HERO */}
      <div className="hero">
        <h1>🍸 Drink Explorer</h1>
        <p>Discover cocktails from a free public API</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="Search cocktail by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>

        <button className="primary-btn" onClick={loadDrink}>
          Get random drink
        </button>
      </div>

      {/* FEEDBACK */}
      {message && (
        <div className="card feedback">
          <p>{message}</p>
        </div>
      )}

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

      {/* SEARCH RESULTS */}
      {results.length > 0 && (
        <div className="results-grid">
          {results.map((d) => (
            <div
              key={d.idDrink}
              className="card result-card"
              onClick={() => {
                setDrink(d);

                setTimeout(() => {
                  drinkRef.current?.scrollIntoView({ behavior: "smooth" });
                }, 100);
              }}
            >
              <img src={d.strDrinkThumb} alt={d.strDrink} />
              <h3>{d.strDrink}</h3>
            </div>
          ))}
        </div>
      )}

      {/* DRINK CARD */}
      {drink && !loading && (
        <div ref={drinkRef} className="card drink-card">
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