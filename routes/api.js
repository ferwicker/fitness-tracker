let db = require("../models");

module.exports = (app) => {

app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        },
        {
            $sort: { day: -1 }
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
        },
        {
            $sort: { day: -1 } //added this to sort
        }
    ])
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err)
        })
});

app.post("/api/workouts", (data, res) => { 
    db.Workout.create(data) // changed req.body to data
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  app.put("/api/workouts/:id", (req, res) => {
    
    db.Workout.findOneAndUpdate({_id: req.params.id}, {$push: {exercises: req.body}}, {new: true})

      .then(dbWorkout => {
        res.json(dbWorkout);
        //console.log(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

};