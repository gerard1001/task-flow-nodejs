// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: "./uploads",
//   filename: (req, file, cb) => {
//     return cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// export const upload = multer({
//   storage,
//   limits: {
//     fileSize: 4 * 1024 * 1024,
//   },
// });

// export const errorHandler = (err, req, res, next) => {
//   if (err instanceof multer.MulterError) {
//     return res.status(500).json({
//       message: "Multer error",
//       error: err.message,
//     });
//   }
// };

import multer from "multer";

const storage = multer.diskStorage({
  // destination: "./uploads",
  filename: (req, file, cb) => {
    cb(
      null,
      `${new Date().toISOString().replace(/:/g, "-")}-${file.originalname}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/gif" ||
    file.mimetype === "image/webp"
  ) {
    cb(null, true);
  } else {
    cb({ message: "unsupported file format" }, false);
  }
};

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

export const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(500).json({
      message: "Multer error",
      error: err.message,
    });
  }
};
