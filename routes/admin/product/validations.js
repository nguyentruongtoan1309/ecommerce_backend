const yup = require('yup');
const ObjectId = require('mongodb').ObjectId;

module.exports = {
    getProductsSchema: yup.object({
        query: yup.object({
            category: yup.string().test('Validate ObjectID', '{PATH} is not valid ObjectID', (value) => {
                if (!value) return true;
                return ObjectId.isValid(value);
            }),
            sup: yup.string().test('Validate ObjectID', '{PATH} is not valid ObjectID', (value) => {
                if (!value) return true;
                return ObjectId.isValid(value);
            }),
            productName: yup.string(),
            priceStart: yup.number().min(0),
            priceEnd: yup.number(),
            skip: yup.number(),
            limit: yup.number(),
        }),
    }),

    getProductSchema: yup.object({
        params: yup.object({
            id: yup.string().test('validationID', 'ID sai định dạng', (value) => {
                return ObjectId.isValid(value);
            }),
        }),
    }),

    createProductSchema: yup.object({
        body: yup.object({
            name: yup.string().required().max(50, 'Tên sản phẩm không được vượt quá 50 ký tự'),
            description: yup.string().max(500, 'Mô tả sản phẩm không được vượt quá 500 ký tự'),
            price: yup.number().required().min(0),
            categoryId: yup.string().required().test('Validate ObjectID', `{PATH} is not valid ObjectID`, (value) => {
                if (!value) return true;
                return ObjectId.isValid(value);
            }),
            supplierId: yup.string().required().test('Validate ObjectID', `{PATH} is not valid ObjectID`, (value) => {
                if (!value) return true;
                return ObjectId.isValid(value);
            }),
        }),
    }),
};