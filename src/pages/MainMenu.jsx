import cateringData from "../data/CateringData";
import CateringCard from "../components/CateringCard";

function MainMenu() {
  return (
    <main className="main-menu">
      <h1>Catering Services</h1>

      <div className="catering-grid">
        {cateringData.map((catering) => (
          <CateringCard
            key={catering.id}
            catering={catering}
          />
        ))}
      </div>
    </main>
  );
}

export default MainMenu;