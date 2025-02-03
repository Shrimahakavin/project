document.getElementById("bmiForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let age = document.getElementById("age").value;
    let weight = parseFloat(document.getElementById("weight").value);
    let height = parseFloat(document.getElementById("height").value);

    if (age && weight && height) {
        height = height / 100; // Convert cm to meters
        let bmi = weight / (height * height);
        bmi = bmi.toFixed(2);

        let resultText = `<p style="text-align: center; font-size: 18px;">Your BMI is <b>${bmi}</b>. <br>`;
        let bmiCategory = "";

        if (bmi < 18.5) {
            bmiCategory = "underweight";
            resultText += `You are <b>Underweight</b>.</p>`;
        } else if (bmi < 24.9) {
            bmiCategory = "normalweight";
            resultText += `You have a <b>Normal Weight</b>.</p>`;
        } else if (bmi < 29.9) {
            bmiCategory = "overweight";
            resultText += `You are <b>Overweight</b>.</p>`;
        } else {
            bmiCategory = "obese";
            resultText += `You are <b>Obese</b>.</p>`;
        }

        document.getElementById("bmi-result").innerHTML = resultText;

        let checkDietBtn = document.getElementById("check-diet-btn");
        checkDietBtn.style.display = "block";
        checkDietBtn.style.margin = "20px auto";
        checkDietBtn.dataset.category = bmiCategory;

        document.getElementById("plan-selection-form").style.display = "block";
        document.getElementById("plan-selection-form").scrollIntoView({ behavior: "smooth" });
    } else {
        document.getElementById("bmi-result").innerHTML = `<p style="text-align: center; color: red;">Please enter all fields.</p>`;
    }
});

// Function to dynamically load overweight.html content into the main page
function loadOverweightPage() {
    fetch("overweight.html")
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to load the page.");
            }
            return response.text();
        })
        .then(data => {
            let container = document.createElement("div");
            container.innerHTML = data;
            document.body.appendChild(container);
        })
        .catch(error => console.error("Error loading overweight page:", error));
}

// Handle Plan Form Submission
document.getElementById("planForm").addEventListener("submit", function (event) {
    event.preventDefault();

    let selectedPlan = document.getElementById("plan-choice").value;
    let category = document.getElementById("check-diet-btn").dataset.category;

    if (selectedPlan === "diet") {
        document.getElementById("meal-selection").style.display = "block";
    } else if (selectedPlan === "exercise") {
        window.location.href = category + ".html#exercise-section";
    }
});

// Handle Meal Selection - Load overweight page only after selecting meal
document.getElementById("meal-choice").addEventListener("change", function () {
    let selectedMeal = document.getElementById("meal-choice").value;
    let category = document.getElementById("check-diet-btn").dataset.category;

    if (selectedMeal) {
        if (category === "overweight") {
            loadOverweightPage();
        }
        window.location.href = category + ".html#" + selectedMeal;
    }
});
