const { v4: id } = require("uuid")
const path = require("path")
const fs = require("fs")
const BaseError = require("../errors/base-error")

class FileService {
	async save(file) {
		try {
			const fileName = id() + ".jpg"
			const staticDir = path.join(__dirname, "..", "static")
			const filePath = path.join(staticDir, fileName)

			if (!fs.existsSync(staticDir)) {
				fs.mkdirSync(staticDir, {recursive: true})
			}
			file.mv(filePath)
			return fileName
		} catch (error) {
			throw BaseError.BadRequest("Error saving files");
		}
	}
}

module.exports = new FileService()