const quoteContainter = document.getElementById('quote-containter');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

function showLoadingSpinner(){
    loader.hidden = false;
    quoteContainter.hidden = true;
}

// Hide Loading
function removeLoaderSpinner(){
    loader.hidden = true;
    quoteContainter.hidden = false;
}

// Show New Quote
function newQuote(){
    
    // Pick a random quote from api quotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    //Check quote length to change styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    removeLoaderSpinner();

    //Check if Author is Blank and replace with -Unknown
    if(quote.author === null){
        authorText.textContent = "-Unknown";
    }else{
        authorText.textContent = quote.author;
    }
    
}

// Get Quotes From API
async function getQuotes(){
    showLoadingSpinner();
    //const proxyUrl = 'https://afternoon-stream-38843.herokuapp.com/';
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error){
        //Get Local Quotes if api fetch fails
        console.log('Error getting API Quotes, switching to local quotes', error)
        apiQuotes = localQuotes;
        newQuote();
    }
}

//Tweet Quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();
