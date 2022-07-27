const babyFood = require("../../assets/images/categroy/babyFood.jpg");
const fish = require("../../assets/images/categroy/meat_fish.jpg");
const fruit = require("../../assets/images/categroy/fruit.jpg");
const beverages = require("../../assets/images/categroy/beverages.jpg");
const bakery = require("../../assets/images/categroy/bakery.jpg");
const personalCare = require("../../assets/images/categroy/personalCare.jpg");

export const CategoryData = [
  {
    title: "Fish & Meat",
    photo: fish,
    slug: "fish_&_meat",
    color: "#809a6f20",
    borderColor: "#809A6F",
  },
  {
    title: "Fresh Fruits & Vegetable",
    photo: fruit,
    slug: "fruits_&_vegetables",
    color: "#51325220",
    borderColor: "#513252",
  },
  {
    title: "Bakery & Snacks",
    photo: bakery,
    slug: "bakery_&_snacks",
    color: "#dfbb9d20",
    borderColor: "#DFBB9D",
  },
  {
    title: "Beverages",
    photo: beverages,
    slug: "beverages",
    color: "#836AF620",
    borderColor: "#836AF6",
  },

  {
    title: "Baby Food",
    photo: babyFood,
    slug: "baby_food",
    color: "#ffc4dd20",
    borderColor: "#ffc4dd",
  },
  {
    title: "Personal Care",
    photo: personalCare,
    slug: "personal_Care",
    color: "#00ffab20",
    borderColor: "#00ffab",
  },
];
