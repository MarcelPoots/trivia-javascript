const triviaApiUrl = "https://opentdb.com/api.php?amount=1";

// the Open Trivia DB API HTML-encodes text (e.g. "&amp;"), so decode before displaying
function decodeHtml(html) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = html;
    return textarea.value;
}

async function fetchTrivia() {
    try {
        //change category based on selected value. We need to send the integer category ID to the API
        const categorySelect = document.getElementById("category-select");
        const selectedCategory = categorySelect ? categorySelect.value : "";

        let apiUrl = triviaApiUrl;
        if (selectedCategory) {
            apiUrl += `&category=${selectedCategory}`;
        }
        let response = await fetch(apiUrl);
        let data = await response.json();
        console.log(data);

        document.getElementById("trivia-question").textContent = decodeHtml(data.results[0].question);

        // in div trivia-answer add  radio buttons for the answers, Give each radio button a unique id and value
        let answers = [...data.results[0].incorrect_answers, data.results[0].correct_answer];
        // Shuffle the answers array so the correct answer isn't always last
        answers.sort(() => Math.random() - 0.5);    

        const triviaAnswerDiv = document.getElementById("trivia-answer");
        triviaAnswerDiv.innerHTML = "";
        answers.forEach((answer, index) => {
            const optionDiv = document.createElement("div");
            optionDiv.className = "trivia-option";

            const radioButton = document.createElement("input");
            radioButton.type = "radio";
            radioButton.id = `answer-${index}`;
            radioButton.name = "trivia-answer";
            radioButton.value = answer;
            const label = document.createElement("label");
            label.htmlFor = `answer-${index}`;
            label.textContent = decodeHtml(answer);

            optionDiv.appendChild(radioButton);
            optionDiv.appendChild(label);
            triviaAnswerDiv.appendChild(optionDiv);
        });

        //On check results button click, validate the selected answer
        document.getElementById("validate-trivia").onclick = function() {
            const selectedOption = document.querySelector('input[name="trivia-answer"]:checked');
            if (selectedOption) {
                const isCorrect = selectedOption.value === data.results[0].correct_answer;
                document.getElementById("trivia-result").textContent = isCorrect ? "Correct!" : "Incorrect! The correct answer is " + decodeHtml(data.results[0].correct_answer)    ;
                //if the answer is correct, change the background color of the trivia-result div to green, if incorrect change it to red
                //document.getElementById("trivia-result").style.backgroundColor = isCorrect ? "green" : "red";

                //if the answer is incorrect, make the correct answer have green background color and the incorrect answer have red background color
                if (!isCorrect) {
                    const correctAnswer = data.results[0].correct_answer;
                    const correctOption = Array.from(document.querySelectorAll('input[name="trivia-answer"]')).find(option => option.value === correctAnswer);
                    if (correctOption) {
                        correctOption.parentElement.style.backgroundColor = "green";
                    }
                    selectedOption.parentElement.style.backgroundColor = "red";
                }

            } else {
                document.getElementById("trivia-result").textContent = "Please select an answer.";
            }
        };

        //On fetch-trivia click, fetch a new trivia question
        document.getElementById("fetch-trivia").onclick = function() {
            document.getElementById("trivia-result").textContent = "";
            document.getElementById("trivia-question").textContent = "Question being fecthed..";
            document.getElementById("trivia-answer").innerHTML = "Answer will be shown here...";    
            fetchTrivia();
        };

    } catch (error) {
        console.error("Error fetching trivia:", error);
    }
}
function fillCategory() {
    // create dropdown in category based on opentdb api categories  
    const categoryDiv = document.getElementById("category");
    const select = document.createElement("select");
    select.id = "category-select";
    categoryDiv.appendChild(select);

    fetch("https://opentdb.com/api_category.php")
        .then(response => response.json())
        .then(data => {
            data.trivia_categories.forEach(category => {
                const option = document.createElement("option");
                option.value = category.id;
                option.textContent = category.name;
                select.appendChild(option);
            });
        })
        .catch(error => console.error("Error fetching categories:", error));

}

fillCategory();

fetchTrivia();
