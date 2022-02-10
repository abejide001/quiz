const { body } = require('express-validator');

const signupValidationRules = () => {
  return [
    body('email')
      .trim()
      .not()
      .isEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('email must be valid'),
    body('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('password is required')
      .isLength({ min: 4, max: 20 })
      .withMessage('password must be between 4 and 20 characters'),
  ];
};

const signinValidationRules = () => {
  return [
    body('email')
      .trim()
      .not()
      .isEmpty()
      .withMessage('email is required')
      .isEmail()
      .withMessage('email must be valid'),
    body('password')
      .trim()
      .not()
      .isEmpty()
      .withMessage('password is required')
      .isLength({ min: 4, max: 20 })
      .withMessage('password must be between 4 and 20 characters'),
  ];
};

module.exports = {
  signupValidationRules,
  signinValidationRules,
};

// const productValidationRules = () => {
//   return [
//     check("product_name")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("Product name is required"),

//     check("description")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("Description is required")
//       .isLength({ min: 4, max: 20 })
//       .withMessage("Description must be between 4 and 20 characters"),

//     check("stock_quantity")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("Stock quantity is required")
//       .isLength({ min: 1 })
//       .withMessage("Stock quantity must be greater than one")
//       .isNumeric()
//       .withMessage("Stock quantity must be a number"),

//     check("price")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("Price is required")
//       .isLength({ min: 1 })
//       .withMessage("Price must be greater than one")
//       .isNumeric()
//       .withMessage("Price must be a number"),

//     check("barcode")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("Barcode is required")
//       .isLength({ min: 3 })
//       .withMessage("Barcode must be greater than one")
//       .isNumeric()
//       .withMessage("Barcode must be a number"),

//     check("category_id")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("Category id is required")
//       .custom((value, { req }) => {
//         if (!mongoose.Types.ObjectId.isValid(req.body.category_id)) {
//           throw new Error("Invalid category id");
//         }
//         return true;
//       }),
//     check("logo").custom((value, { req }) => {
//       if (!req.file) throw new Error("Logo is required");
//       return true;
//     }),
//   ];
// };

// const categoryValidationRules = () => {
//   return [
//     check("name")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("Category name is required"),

//     check("description")
//       .trim()
//       .not()
//       .isEmpty()
//       .withMessage("Description is required")
//       .isLength({ min: 1, max: 100 })
//       .withMessage("Description must be between 4 and 20 characters"),
//   ]
// }
// module.exports = {
//     productValidationRules,
//     categoryValidationRules
// }
