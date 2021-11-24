#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![translate])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

use tauri::api::http::{ HttpRequestBuilder, ResponseType, ClientBuilder, Body, ResponseData };

#[tauri::command]
async fn translate(body: Body) -> Result<ResponseData, String> {
    let client = ClientBuilder::new()
        .max_redirections(3)
        .build()
        .unwrap();
    let request_builder = HttpRequestBuilder::new("POST", "https://goggletrans.blookers.repl.co/api/translate")
    .body(body);

    let request = request_builder.response_type(ResponseType::Json);
    if let Ok(response) = client.send(request).await {
        if let Ok(result) = response.read().await {
            return Ok(result);
        }
    }
    return Err("".into());
}