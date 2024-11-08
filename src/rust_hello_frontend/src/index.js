import {createActor, rust_hello_backend} from "../../declarations/rust_hello_backend"
import {AuthClient} from "@dfinity/auth-client"
import { HttpAgent } from "@dfinity/agent";
// import {II} from "../../../webpack.config";

require("dotenv").config();

// const canister_id = process.env.;
let actor = rust_hello_backend;
const can_id = "bd3sg-teaaa-aaaaa-qaaba-cai";
console.log("Backend Canister ID:", can_id);
const greetButton = document.getElementById("greet");
greetButton.onclick = async (e) => {
    e.preventDefault();

    greetButton.setAttribute("disabled", true);

    // Interact with backend actor, calling the greet method
    const greeting = await actor.greet();

    greetButton.removeAttribute("disabled");

    document.getElementById("greeting").innerText = greeting;

    return false;
};

const userInfoButton = document.getElementById("userInfo");

userInfoButton.onclick = async (e) => {
  e.preventDefault();
  userInfoButton.setAttribute("disabled", true);

  // Interact with backend actor, calling the greet method
  const userInfo = await actor.user_info();
  userInfoButton.removeAttribute("disabled");

  document.getElementById(
    "greeting"
  ).innerText = `Current User Principal: ${userInfo.principal}`;

  return false;
};

const loginButton = document.getElementById("login");
loginButton.onclick = async (e) => {
    e.preventDefault();

    // create an auth client
    let authClient = await AuthClient.create();

    // start the login process and wait for it to finish
    await new Promise((resolve) => {
        authClient.login({
          identityProvider: process.env.II_URL,
          onSuccess: resolve,
        });
    });

    // At this point we're authenticated, and we can get the identity from the auth client:
    const identity = authClient.getIdentity();
    // Using the identity obtained from the auth client, we can create an agent to interact with the IC.
    const agent = new HttpAgent({identity});
    // Using the interface description of our webapp, we create an actor that we use to call the service methods.
    actor = createActor(can_id, {
      agent,
    });

    return false;
};                   