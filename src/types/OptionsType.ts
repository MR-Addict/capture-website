export default interface OptionsType {
  type: "png" | "jpeg" | "webp";
  width: number;
  height: number;
  timeout: number;
  delay: number;
  fullPage: boolean;
  disableAnimations: boolean;
}
