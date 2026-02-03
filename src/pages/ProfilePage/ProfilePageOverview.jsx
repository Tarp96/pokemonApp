import { Outlet } from "react-router-dom";
import { PageNavigationBar } from "../../components/PageNavigationbar";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { firstLetterUpperCase } from "../../utils/helperFunctions";
import { listenToCoins } from "../../services/coinService";

export const ProfilePageOverview = () => {
  const [username, setUsername] = useState("");
  const [coinBalance, setCoinBalance] = useState();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const fetchUsername = async () => {
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsername(docSnap.data().username);
        }
      } catch (err) {
        console.error("Error fetching username:", err);
      }
    };

    fetchUsername();

    const unsubscribe = listenToCoins(user.uid, setCoinBalance);

    return () => unsubscribe();
  }, []);

  return (
    <div className="profilePageContainer">
      <section className="profilePageTitleSection">
        <h1 className="profileMainTitle">
          {firstLetterUpperCase(username) || "Trainer"}
        </h1>
        <p className="profileSubtitle">Welcome back, Trainer!</p>
      </section>

      <div>
        <PageNavigationBar
          links={[
            { path: "", label: "Trainer Info" },
            { path: "favorites", label: "Favorites" },
          ]}
        />
      </div>

      <Outlet context={{ username, coinBalance }} />
    </div>
  );
};
