// struct Health(i32);
// struct Name(&'static str);

struct Player {
    Name: &'static str,
    Health: i32
}

fn main() {
    let value = 123;
    let a = String::from("Test");
    
    println!("Hello, world! {}", value);
}