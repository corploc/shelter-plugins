import { Show } from "solid-js";

declare const shelter: any;

type EncryptedMessageState = "decrypting" | "decrypted" | "error";

export default (props: {
  state: EncryptedMessageState;
  content: string;
}) => {
  const styles = `
    .encrypted-message-frame {
      border-left: 2px solid var(--green-360);
      padding: 8px;
      background-color: var(--background-secondary-alt);
      border-radius: 4px;
      margin-top: 4px;
      white-space: pre-wrap;
    }
    .encrypted-message-placeholder {
      color: var(--text-muted);
    }
    .encrypted-message-error {
      color: var(--text-warning);
    }
  `;
  shelter.ui.injectCss(styles);

  return (
    <div class="encrypted-message-frame">
      <Show when={props.state === 'decrypted'}>
        <p>{props.content}</p>
      </Show>
      <Show when={props.state === 'decrypting'}>
        <p class="encrypted-message-placeholder">Decrypting message...</p>
      </Show>
      <Show when={props.state === 'error'}>
        <p class="encrypted-message-error">
          <strong>🔒 Encrypted Message:</strong> {props.content}
        </p>
      </Show>
    </div>
  );
};