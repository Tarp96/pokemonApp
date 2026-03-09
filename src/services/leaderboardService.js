import { db } from "../firebaseConfig";
import {
  doc,
  setDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
