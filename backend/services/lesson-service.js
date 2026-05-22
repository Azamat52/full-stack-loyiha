const lessonModel = require("../models/lesson-model")

class LessonService {
    async get() {
        const allLessons = await lessonModel.find()
        return allLessons
    }
    async create(lesson) {
        const createdLesson = await lessonModel.create(lesson)
        return createdLesson
    }
    async delete(id) {
        const deletedLesson = await lessonModel.findByIdAndDelete(id)
        return deletedLesson
    }
    async edit(id, lesson) {
        if (!id) {
            throw new Error("Id not found")
        }
        const editedLesson = await lessonModel.findByIdAndUpdate(id, lesson, { new: true })
        return editedLesson
    }
    async getById(id) {
        if (!id) {
            throw new Error("Id not found getting by id")
        }
        const takedLessonById = await lessonModel.findById(id)
        return takedLessonById
    }
}

module.exports = new LessonService()