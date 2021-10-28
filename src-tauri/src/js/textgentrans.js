import $ from "../uiblox/jquery.module.js";
import ky from "./ky.min.js";

const {...Tauri } = window.__TAURI__ || {};
let currentInput, currentOutput;
$(window).on("load", async() => {
    ky.get("https://goggletrans.blookers.repl.co/api");
    const transOutput = $(".trans-output");
    const transButton = $("#translateButton");
    const transInput = $("#translationInput");
    const transCount = $(".translateCount");
    const amountInd = $("#amountInd");
    transButton.on("click", async() => {
        transButton.prop("disabled", true);
        transInput.prop("disabled", true);
        transOutput.html("Generating...");

        try {
            let input = transInput.val();
            let { result } = await ky.post("https://goggletrans.blookers.repl.co/api/deepai/textgen", {
                json: {
                    input,
                    language: 'en',
                    translateTimes: parseInt(transCount.val()),
                    outputLanguage: 'auto'
                },
                timeout: false
            }).json();
            currentInput = input;
            currentOutput = result;
            transOutput.html(result);
        } catch (err) {
            transOutput.html(`Translation Failed!<br>${err}`);
        }

        transButton.prop("disabled", false);
        transInput.prop("disabled", false);
    });
    transInput.on('input change', async({ target }) => {
        transButton.prop("disabled", !$(target).val().length);
    });
    transCount.on('input change', async({ target }) => {
        amountInd.html(`Amount: ${$(target).val()}`);
    });

    if (window.__TAURI__) {

    } else {

    }
});