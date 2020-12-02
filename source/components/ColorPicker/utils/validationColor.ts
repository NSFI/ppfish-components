export default function validationColor(
  props: object,
  propName: string,
  componentName: string
) {
  if (props[propName] && !/^#[0-9a-fA-F]{3,6}$/.test(props[propName])) {
    return new Error(`${componentName}.props.${propName} Validation failed!`);
  }
}
