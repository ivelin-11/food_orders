export default function Button({ children, textOnly, className, ...props }) {
  let cssClassses = textOnly ? "text-button" : "button";
  cssClassses += " " + className;

  return (
    <button className={cssClassses} {...props}>
      {children}
    </button>
  );
}
