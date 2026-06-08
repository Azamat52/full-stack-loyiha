const multer = require("multer");
const BaseError = require("../errors/base-error");

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/jpg",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        BaseError.BadRequest("Error with validation", [
          {
            path: "picture",
            msg: "Only JPG, PNG and WEBP images are allowed",
          },
        ])
      );
    }

    cb(null, true);
  },
});

module.exports = (req, res, next) => {
  upload.single("picture")(req, res, (err) => {
    if (!err) return next();

    if (err instanceof multer.MulterError) {
      return next(
        BaseError.BadRequest("Error with validation", [
          {
            path: "picture",
            msg:
              err.code === "LIMIT_FILE_SIZE"
                ? "Picture size must not exceed 5MB"
                : err.message,
          },
        ])
      );
    }

    return next(err);
  });
};