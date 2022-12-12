import {signInWithPopup, GithubAuthProvider, GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./app"
import { getDatabase, ref, set, child, get, remove, type DatabaseReference } from 'firebase/database'
import uniqid from 'uniqid'

//this is an api used by the vue components to create, fetch, and manage user data

//initialize auth
const auth = getAuth(app)

async function googleSignIn(router:Object) {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    //@ts-ignore
    router.push({ path: '/home' });
  }).catch((error) => {
    console.log("Google sign in error")
  });
}

async function signInWithGitHub(router:Object) {
  const provider = new GithubAuthProvider();
  signInWithPopup(auth, provider)
  .then((result) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    //@ts-ignore
    router.push({ path: '/home' });
  }).catch((error) => {
    console.log("Error signing in with github.")
  });
}

//returns user object if creation was sucessful, returns false if failed and prints error 

async function addUser(email:string, password:string) {
  let returnVal:any
  await createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    returnVal = userCredential;
  })
  .catch((error) => {
    returnVal = error.code
  });
  return returnVal
}

//same as addUser

async function login(email:string, password:string) {
  let returnVal:any
  await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
      returnVal = userCredential.user;
  })
  .catch((error) => {
    returnVal = error.code;
  });
  return returnVal
}

async function addPost(user:string | null, title:string, content:string) {
  console.log(user)
  if (user === null) {
    return 1
  }
  console.log("adding post")
  let timestamp = Date.now() as number
  let id = uniqid()
  const db = getDatabase(app)
  await set(ref(db, "posts/" + id), {
      title: title, 
      content: content,
      user: user,
      timestamp: timestamp,
    },
  )
  return id
}

async function getAllPosts() {
  let posts:object[] = []
  await get(child(ref(getDatabase(app)), "posts")).then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot)
      snapshot.forEach((post) => {
        posts.push(post.val())
      })
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });
  console.log(posts)
  return posts.sort((d1:any, d2:any) => (d1.timestamp < d2.timestamp) ? 1 : (d1.timestamp > d2.timestamp) ? -1 : 0);
}

export {
  addUser,
  login,
  googleSignIn,
  signInWithGitHub,
  addPost,
  getAllPosts,

}
