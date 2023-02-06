import { OptionsType } from "@/types";

export default function getOptions(form: { [key: string]: any }) {
  const options = {
    type: "png",
    width: 1280,
    height: 800,
    delay: 0,
    timeout: 30,
    fullPage: false,
    disableAnimations: false,
  } as OptionsType;

  if (form.type) options.type = form.type;
  if (form.width) options.width = JSON.parse(form.width);
  if (form.height) options.height = JSON.parse(form.height);
  if (form.delay) options.delay = JSON.parse(form.delay);
  if (form.timeout) options.timeout = JSON.parse(form.timeout);
  if (form.fullPage) options.fullPage = JSON.parse(form.fullPage);
  if (form.disableAnimations) options.disableAnimations = JSON.parse(form.disableAnimations);

  return options;
}
