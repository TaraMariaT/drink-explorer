import { useEffect, useState } from "react";

function Saved() {
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("savedDrinks");
    if (data) setDrinks(JSON.parse(data));
  }, []);

  const removeDrink = (id) => {
    const updated = drinks.filter((d) => d.id !== id);
    setDrinks(updated);
    localStorage.setItem("savedDrinks", JSON.stringify(updated));
  };

  return (
    <div>
      <h1>Saved Drinks</h1>

      <div className="card">
        <p>Total: {drinks.length}</p>
        <p>Liked: {drinks.filter((d) => d.liked).length}</p>
        <p>Disliked: {drinks.filter((d) => !d.liked).length}</p>
      </div>

      <div className="saved-grid">
        {drinks.map((d) => (
          <div className="card" key={d.id}>
            <h3>{d.name}</h3>
            <p>{d.liked ? "👍 Liked" : "👎 Disliked"}</p>

            <button onClick={() => removeDrink(d.id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Saved;