export const ProfilePage = () => {
  return (
    <div className="profilePageContainer">
      <section className="profileInfoSection">
        <img
          src="https://boxchatter.wordpress.com/wp-content/uploads/2013/06/pkmn-trainer-red.jpg"
          alt="Trainer"
          className="profilePageImage"
        />
        <div className="profileInfoText">
          <h3>Trainer Name</h3>
          <p>Welcome back, Trainer!</p>
        </div>
      </section>

      <section className="profileSection">
        <h3 className="profileSectionTitle">Favorite Pokémon</h3>
      </section>

      <section className="profileSection">
        <h3 className="profileSectionTitle">Your Team</h3>
      </section>

      <section className="profileSection">
        <h3 className="profileSectionTitle">Saved Pokémon</h3>
      </section>
    </div>
  );
};
