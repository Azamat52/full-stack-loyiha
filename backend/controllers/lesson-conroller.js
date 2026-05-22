const lessonService = require("../services/lesson-service")

class lessonController {
    async getAllLessons(req, res) {
        try {
            const allLessons = await lessonService.get()
            res.status(201).json({ lessons: allLessons })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async createLesson(req, res) {
        try {
            const newLesson = await lessonService.create(req.body)
            res.status(201).json({ lessons: newLesson })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async deleteLesson(req, res) {
        try {
            const deletedLesson = await lessonService.delete(req.params.id)
            res.status(200).json({ lessons: deletedLesson })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async editLesson(req, res) {
        try {
            const editedLesson = await lessonService.edit(req.params.id, req.body)
            res.status(200).json({ lessons: editedLesson })
        } catch (error) {
            res.status(500).json(error)
        }
    }
    async getLessonById(req, res) {
        try {
            const takedLessonById = await lessonService.getById(req.params.id)
            res.status(200).json({ lessons: takedLessonById })
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = new lessonController()