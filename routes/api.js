let db = require("../models");

module.exports = (app) => {

app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        })
});

app.get(`/api/workouts/range`, (req, res) => {
    db.Workout.find({})
        .limit(7)
        //.updateMany({}, {totalDuration: { $sum: "$exercises.duration" }})
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        })
});

app.get("/exercise", (req, res) => {
    db.Exercise.find({})
      .then(dbExercise => {
        res.json(dbExercise);
      })
      .catch(err => {
        res.json(err);
      });
  });
};