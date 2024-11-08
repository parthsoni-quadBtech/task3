use ic_cdk::caller;
use ic_cdk::query;

#[query]
fn greet() -> String {
    let caller = ic_cdk::caller();
    format!("Hello, {}!", caller)
}
