function showRecipe(meal) {
    const recipes = {
        poha: "Poha Recipe: Flattened rice with onions, tomatoes, and peas.",
        oats: "Oats Porridge Recipe: Oats with cinnamon and nuts.",
        sambar: "Sambar Recipe: Lentil soup with vegetables and spices.",
        roti: "Roti Recipe: Whole wheat flatbread with vegetable curry.",
        tea: "Green Tea Recipe: Green tea with roasted chickpeas."
    };

    document.querySelectorAll(".recipe-content").forEach(content => {
        if (content.id !== meal + "-recipe") {
            content.style.display = "none";
        }
    });

    const mealContainer = document.getElementById(meal + "-recipe");
    if (mealContainer) {
        if (mealContainer.style.display === "block") {
            mealContainer.style.display = "none";
        } else {
            mealContainer.innerText = recipes[meal] || "Recipe not available";
            mealContainer.style.display = "block";
        }
    }
}

// Smooth reveal on scroll
document.addEventListener("scroll", function () {
    document.querySelectorAll(".meal-container").forEach(section => {
        if (section.getBoundingClientRect().top < window.innerHeight - 100) {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        }
    });
});
