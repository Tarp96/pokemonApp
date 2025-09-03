import { Outlet, useOutletContext } from "react-router-dom";
import { PageNavigationBar } from "../../components/PageNavigationbar";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../../firebaseConfig";
import { firstLetterUpperCase } from "../../utils/helperFunctions";

export const ProfilePageOverview = () => {
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

      <Outlet context={{ username }} />
    </div>
  );
};
