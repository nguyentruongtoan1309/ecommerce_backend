const fs = require('fs');

const writeFileSync = (fileName, data) => {
    fs.writeFileSync(fileName, JSON.stringify(data), function (err) {
        if (err) {
            console.log('««««« err »»»»»', err);

            throw err
        };
        console.log('Saved!');
    });
}

const generationID = () => Math.floor(Date.now());

const validateSchema = (schema) => async (req, res, next) => {
    try {
        await schema.validate({
            body: req.body,
            query: req.query,
            params: req.params,
        }, { abortEarly: false });

        return next();
    } catch (err) {
        return res.status(400).json({
            errors: err?.errors,
            type: err.name,
            message: 'Xác thực dữ liệu thất bại',
        });
    }
};

function getQueryDateTime(from, to, type = 'IN') {
    fromDate = new Date(from);

    const tmpToDate = new Date(to);
    toDate = new Date(tmpToDate.setDate(tmpToDate.getDate() + 1));

    let query = {};

    if (type === 'IN') {
        const compareFromDate = { $gte: ['$createdDate', fromDate] };
        const compareToDate = { $lt: ['$createdDate', toDate] };

        query = {
            $expr: { $and: [compareFromDate, compareToDate] },
        };
    } else {
        const compareFromDate = { $lt: ['$createdDate', fromDate] };
        const compareToDate = { $gt: ['$createdDate', toDate] };

        query = {
            $expr: { $or: [compareFromDate, compareToDate] },
        };
    }

    return query;
}

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index += 1) {
        await callback(array[index], index, array);
    }
}

module.exports = {
    generationID,
    writeFileSync,
    validateSchema,
    asyncForEach,
    getQueryDateTime,
}