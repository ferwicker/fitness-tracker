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
    db.Workout.aggregate([
        {
            $addFields: {
            totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
            console.log(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        })
});

app.post("/api/workouts", (data, res) => {
    console.log(data);
    db.Workout.create(data)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    const id = req.params.id;
    db.Workout.findOneAndUpdate({id}, {$push: {exercises: req.body}}, {new: true})

      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

};