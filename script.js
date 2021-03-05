const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//  showing loader
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function complete() {
  if (!loader.hidden) {
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

//  get quote from api
async function getQuote() {
  loading();
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();

    if (data.quoteAuthor === "") {
      authorText.innerText = "Anonymous";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    console.log(data);
    // Reduce font size for long quotes
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }

    quoteText.innerText = data.quoteText;
    //  stop loader and show quote
    complete();
  } catch (error) {
    console.log("Whoops no Quote", error);
  }
}

// Tweet Quote
function TweetQuote() {
  const quote = quoteText.innerText;
  const author = quoteText.innerText;
  const twitterUrl =
    "https://twitter.com/intent/tweet?text=${quote} ~${author}";
  window.open(twitterUrl, "_blank");
  //  blank for opening in new tab
}

//  Event Listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterBtn.addEventListener("click", TweetQuote);

getQuote();
// loading();
