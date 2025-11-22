import { createSignal } from "solid-js";
import { Icon } from "shelter/components";

// A simple lock icon component. In a real scenario, you might use a proper SVG icon.
const LockIcon = (props: { locked: boolean }) => (
  <Icon
    name={props.locked ? "Lock" : "Unlock"}
    class={props.locked ? "locked-icon" : "unlocked-icon"}
  />
);

export default () => {
  const [isSecure, setIsSecure] = createSignal(false);

  const toggleSecureMode = () => {
    setIsSecure(!isSecure());
  };

  // Inject some basic styles for the locked/unlocked states
  // This would typically be done in a separate SCSS file
  const styles = `
    .secure-chat-bar-button {
      cursor: pointer;
      margin-right: 8px;
      color: var(--interactive-normal);
    }
    .secure-chat-bar-button .locked-icon {
      color: var(--green-360); /* Green when locked */
    }
    .secure-chat-bar-button .unlocked-icon {
      color: var(--interactive-normal); /* Default color when unlocked */
    }
    .secure-chat-bar-button:hover {
      color: var(--interactive-hover);
    }
  `;
  shelter.ui.injectCss(styles);


  return (
    <div class="secure-chat-bar-button" onClick={toggleSecureMode} title="Toggle Secure Mode">
      <LockIcon locked={isSecure()} />
    </div>
  );
};
