
exports.testAPI = async (req, res, next) => {
    res.status(200).send({ status: 200, msg: 'OK', data: { info: 'NoSQLKUDW API', version: 'v1' } });
}