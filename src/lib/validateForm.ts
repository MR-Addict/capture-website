import Joi from "joi";

const formSchema = Joi.object().keys({
  url: Joi.string().uri().required(),
  type: Joi.string().valid("png", "jpeg", "webp").optional(),
  width: Joi.number().min(320).max(3840).optional(),
  height: Joi.number().min(240).max(2160).optional(),
  delay: Joi.number().min(0).max(10).optional(),
  timeout: Joi.number().min(10).max(60).optional(),
  fullPage: Joi.boolean().optional(),
  disableAnimations: Joi.boolean().optional(),
});

export default function validateForm(form: { [key: string]: any }) {
  const { error } = formSchema.validate(form);
  return error;
}
