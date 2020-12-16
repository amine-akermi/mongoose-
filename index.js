const express = require("express");
const mongoose = require("mongoose");
const dotenv = require(`dotenv`).config();
console.log(dotenv.parsed);

const app = express();
app.use(express.json());
mongoose.set("useUnifiedTopology", true);

mongoose.connect("mongodb://localhost/dbuser", { useNewUrlParser: true });

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
  email: String,
  profession: String,
});
const Person = mongoose.model("Person", userSchema);
const Person1 = new Person({
  name: "Sarra",
  age: 20,
  favoriteFoods: ["Noodles"],
  profession: "teacher",
});


var createAndSavePerson = (done) => {
  let Person1 = new Person({
    name: "Sarra",
    age: "20",
    favoriteFoods: ["Noodles"],
    profession: "teacher",
  });
};
Person1.save((error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log("done");
  }
});

let arrayOfPeople = [
  {
    name: "Firas",
    age: 40,
    favoriteFoods: ["Pizzas", "chicken burger"],
    profession: "Engineer",
  },
  {
    name: "Maryem",
    age: 15,
    favoriteFoods: ["Nuggets", "Pasta", "burrito"],
    profession: "Student",
  },
  {
    name: "malek",
    age: 30,
    favoriteFoods: ["Salad"],
    profession: "Doctor",
  },
];


Person.find({ name: "Sarra" }, (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});

Person.findOne({ favoriteFoods: [`Pizzas`] }, (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});

var findPersonById = function (personId, done) {
  Person.findById(personId, (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  });
};

Person.findOne({ name: "Sarra" }, (error, result) => {
  if (error) {
    console.log(error);
  } else {
    result.age = 20;
    result.favoriteFoods.push("hamburger");
    result.save((error, updatedRecord) => {
      console.log(updatedRecord);
    });
  }
});
Person.findOneAndUpdate(
  { name: "sarra" },
  { name: "Firas" },
  { new: true },
  (error, data) => {
    if (error) {
      console.log(error);
    } else {
      console.log(data);
    }
  }
);

Person.findByIdAndRemove(`5fbbf6dde209f028fc539beb`, (error, deletedRecord) => {
  if (error) {
    console.log(error);
  } else {
    console.log(deletedRecord);
  }
});

Person.remove({ age: { $gte: 20 } }, (error, data) => {
  if (error) {
    console.log(error);
  } else {
    console.log(data);
  }
});

Person.find({ favoriteFoods: { $all: [`burrito`] } })
  .sort({ age: "asc" })
  .limit(4)
  .select("name age")
  .exec((error, data) => {
    if (!error) {
      console.log(data);
    }
  });
var createManyPeople = function (arrayOfPeople, done) {
  Person.create(arrayOfPeople, (error, createdPeople) => {
    if (error) {
      console.log(error);
    } else {
      done(null, createdPeople);
    }
  });
};

const port = process.env.PORT;

app.listen(port, (err) => {
  err
    ? console.log(err)
    : console.log(`the server is running on port${port}...`);
});
