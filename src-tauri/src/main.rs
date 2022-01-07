#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            web_request,
            translate
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

use std::collections::HashMap;
use tauri::api::http::{ HttpRequestBuilder, ResponseType, ClientBuilder, Body, ResponseData };

#[tauri::command]
async fn web_request(
  url: String,
  method: String,
  body: Body,
  query: HashMap<String, String>,
  headers: HashMap<String, String>,
  response_type: ResponseType,
) -> Result<ResponseData, String> {
    let method = &method;
    let client = ClientBuilder::new().max_redirections(3).build().unwrap();
    let mut request_builder = HttpRequestBuilder::new(method, url)
    .query(query)
    .headers(headers);

    if method.eq("POST") {
        request_builder = request_builder.body(body);
    }

    let request = request_builder.response_type(response_type);
    if let Ok(response) = client.send(request).await {
        if let Ok(result) = response.read().await {
            return Ok(result);
        }
        return Err("response read failed".into());
    }
    return Err("web request failed".into());
}

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