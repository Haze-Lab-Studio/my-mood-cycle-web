import { useId } from "react";

import { KIT_FORM_ACTION, KIT_FORM_ID, KIT_FORM_OPTIONS, KIT_FORM_UID } from "@/lib/kit-form";

const formMinWidth = { "min-width": "400 500 600 700 800" } as const;

const kitFieldRadius = "9999px";

const kitInputStyle = {
  color: "var(--color-foreground)",
  borderColor: "rgb(224, 112, 144)",
  borderRadius: kitFieldRadius,
  fontWeight: 400,
} as const;

const kitSubmitStyle = {
  color: "rgb(255, 255, 255)",
  backgroundColor: "#D9618F",
  borderRadius: kitFieldRadius,
  fontWeight: 400,
} as const;

type Props = {
  emailLabel?: string;
  emailPlaceholder?: string;
  submitLabel?: string;
};

export function KitSubscribeForm({
  emailLabel = "Enter your email",
  emailPlaceholder = "Enter your email",
  submitLabel = "Get the free guide",
}: Props) {
  const emailId = useId();

  return (
    <form
      action={KIT_FORM_ACTION}
      className="seva-form formkit-form"
      method="post"
      data-sv-form={KIT_FORM_ID}
      data-uid={KIT_FORM_UID}
      data-format="inline"
      data-version="5"
      data-options={KIT_FORM_OPTIONS}
      {...formMinWidth}
    >
      <div data-style="clean">
        <ul
          className="formkit-alert formkit-alert-error"
          data-element="errors"
          data-group="alert"
        />
        <div data-element="fields" data-stacked="false" className="seva-fields formkit-fields">
          <div className="formkit-field">
            <label htmlFor={emailId} className="sr-only">
              {emailLabel}
            </label>
            <input
              id={emailId}
              className="formkit-input"
              name="email_address"
              placeholder={emailPlaceholder}
              required
              type="email"
              style={kitInputStyle}
            />
          </div>
          <button
            type="submit"
            data-element="submit"
            className="formkit-submit formkit-submit"
            style={kitSubmitStyle}
          >
            <div className="formkit-spinner">
              <div />
              <div />
              <div />
            </div>
            <span>{submitLabel}</span>
          </button>
        </div>
        <div className="formkit-powered-by-convertkit-container">
          <a
            href="https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic"
            data-element="powered-by"
            className="formkit-powered-by-convertkit"
            data-variant="dark"
            target="_blank"
            rel="nofollow noopener"
          >
            Built with Kit
          </a>
        </div>
      </div>
    </form>
  );
}
