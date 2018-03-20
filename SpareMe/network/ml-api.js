const ADD = "add?";
const BASE_URL = "http://ec2-18-188-74-206.us-east-2.compute.amazonaws.com:5000/";
const DEFAULT_CATEGORY = "harmless";
const PREDICT = "predict?text=";


/**
 * Returns the String category for the passed-in tokens from the API.
 * Can be called with any number of arguments.
 */
export function getCategoryForWords() {
    let url = BASE_URL + PREDICT;

    for (let argument of arguments) {
        url += (argument + '%');
    }

    fetch(url).then(function(response) {
        return response._bodyText;
    });
}

export function getCategoryForHtmlElement(element) {
    let phrase = element.innerHTML;

    if (phrase) {
        let url = BASE_URL + PREDICT + phrase.split(' ').join('%');

        fetch(url).then(function(response) {
            return response._bodyText;
        });
    }


}
