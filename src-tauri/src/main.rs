#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            fs_read_text_file,
            fs_create_dir_all,
            fs_file_exists,
            fs_write_file,
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
    .unwrap()
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
    .unwrap()
    .body(body);

    let request = request_builder.response_type(ResponseType::Json);
    if let Ok(response) = client.send(request).await {
        if let Ok(result) = response.read().await {
            return Ok(result);
        }
    }
    return Err("".into());
}

#[tauri::command]
fn fs_read_text_file(path: String) -> Result<String, String> {
    let result = std::fs::read_to_string(path);
    if result.is_ok() {
        return Ok(result.unwrap());
    }
    return Err(result.unwrap_err().to_string());
}

#[tauri::command]
fn fs_create_dir_all(path: String) {
    std::fs::create_dir_all(path).ok();
}

#[tauri::command]
fn fs_file_exists(path: String) -> bool {
    return std::path::Path::new(&*path).exists();
}

#[tauri::command]
fn fs_write_file(path: String, contents: String) -> Result<(), String> {
    std::fs::create_dir_all(std::path::Path::new(&path).parent().unwrap()).unwrap();
    let result = std::fs::write(path, contents);
    if result.is_ok() {
        return Ok(result.unwrap());
    }
    return Err(result.unwrap_err().to_string());
}