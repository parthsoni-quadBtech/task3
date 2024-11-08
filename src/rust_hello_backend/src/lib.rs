use ic_cdk::api;
use ic_cdk::{query, update};
use serde::{Deserialize, Serialize };
use candid:: CandidType;

#[derive(Serialize, Deserialize, Clone, CandidType)]
struct UserData {
    principal: String,
}

#[query]
fn greet() -> String {
    "Welcome to the Rust-based IC service!".to_string()
}

#[update]
fn user_info() -> UserData {
    let caller = api::caller();
    UserData {
        principal: caller.to_text(),
    }
}
