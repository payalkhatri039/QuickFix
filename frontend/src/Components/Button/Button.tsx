import React from "react";

/**
 *
 * @returns Button functional component
 */

interface IButton {
  onClick: () => void;
  text: string;
  styles?: object;
}

export default function Button(props: IButton) {
  const { onClick, text, styles = {} } = props;
  return (
    <div className="btn" onClick={onClick}>
      <p>{text}</p>
    </div>
  );
}
