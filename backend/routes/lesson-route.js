const express = require("express");
const lessonConroller = require("../controllers/lesson-conroller");

const router = express.Router()

router.get("/get", lessonConroller.getAllLessons)
router.post("/create", lessonConroller.createLesson)
router.delete("/delete/:id", lessonConroller.deleteLesson)
router.put("/edit/:id", lessonConroller.editLesson)
router.get("/get-by-id/:id", lessonConroller.getLessonById)


module.exports = router