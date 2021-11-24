mod google_translate {
    struct TranslateOptions {
        from: String,
        to: String,
        raw: mut Boolean,
        client: mut String,
        tld: mut String
    }
    struct TranslateResult {
        text: String
    }

    pub fn translate(text: String, options: TranslateOptions) -> TranslateResult {

    }
}