import {signInWithPopup, GithubAuthProvider, GoogleAuthProvider, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "./app"
import { getDatabase, ref, set, child, get, remove, type DatabaseReference } from 'firebase/database'

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

async function addPost(user:string, name:string) {
  
}

// async function createDoc(user:string, name:string, data:string) {
//   let timestamp = Date.now() as number
//   const db = getDatabase(app)
//   let id = uniqid()
//   await set(ref(db, "docs/" + user + "/" + id), {
//       name: name, 
//       data: data, 
//       slug: slugify(name) + "~" + id,
//       id: id,
//       timestamp: timestamp,
//     },
//   )
//   return id
// }


async function getAllPosts() {

}

export {
  addUser,
  login,
  googleSignIn,
  signInWithGitHub,
  addPost,
  getAllPosts,

}
