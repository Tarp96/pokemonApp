import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { firstLetterUpperCase } from "../../utils/helperFunctions";

export const ProfilePage = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchUsername = async () => {
      const user = auth.currentUser;

      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setUsername(data.username);
        } else {
          console.warn("No profile found for this user.");
        }
      } catch (err) {
        console.error("Error fetching username:", err);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="trainerInfoContainer">
      <div className="trainerInfoHeader">
        <img
          src="https://boxchatter.wordpress.com/wp-content/uploads/2013/06/pkmn-trainer-red.jpg"
          alt="Trainer Avatar"
          className="trainerAvatar"
        />
        <div className="trainerDetails">
          <h2 className="trainerName">
            {firstLetterUpperCase(username) || "Trainer"}
          </h2>
          <p className="trainerSubtitle">
            The very best, like no one ever was.
          </p>
        </div>
      </div>

      <div className="trainerStatsGrid">
        <div className="trainerStatCard">
          <h4>Pokémon Caught</h4>
          <p>84</p>
        </div>
        <div className="trainerStatCard">
          <h4>Team Size</h4>
          <p>6</p>
        </div>
        <div className="trainerStatCard">
          <h4>Coin Balance</h4>
          <p>230</p>
        </div>
        <div className="trainerStatCard">
          <h4>Coins Spent</h4>
          <p>120</p>
        </div>
      </div>
    </div>
  );
};
