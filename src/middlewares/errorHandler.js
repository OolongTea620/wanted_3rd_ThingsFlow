/**
 * @param {*} asyncController
 * @returns: 없음
 */

function errorHandler(asyncController) {
  return async (req, res) => {
    try {
      await asyncController(req, res);
    } catch (err) {
      console.log(err);
      res.status(err.status ? err.status : 500).json({ message: err.message });
    }
  };
}

/**
 * module exports
 * @public
 */

module.exports = errorHandler;
