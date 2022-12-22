import Joi from "joi";
import { IEditAccount } from "../../models/account";

const validate = (data: IEditAccount, schema: Joi.ObjectSchema<any>) => {
    const options = { abortEarly: true };
    const { error } = schema.validate(data, options);

    if (!error) return null;
    const errors: any = {};
    for (let item of error.details) {
        errors[item.path[0]] = item.message;
    }

    return errors;
};

const validateProperty = (input: EventTarget & (HTMLInputElement | HTMLTextAreaElement), schema: Joi.ObjectSchema<any>) => {
    const obj = { [input.name]: input.value };
    const schemaOfProperty = Joi.object({ [input.name]: schema.extract(input.name) });
    const { error } = schemaOfProperty.validate(obj);
    return error ? error.details[0].message : null;
};

export { validate, validateProperty };
