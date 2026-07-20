import type { ReactNode } from "react";

import { WaveLoader } from "@/components/WaveLoader";

type Props = {
  centered?: boolean;
  submitLabel?: string;
  emailPlaceholder?: string;
  helperText?: ReactNode;
  helperTextClassName?: string;
};

const defaultHelperTextClassName =
  "mx-auto mt-6 max-w-xl text-[0.9rem] leading-relaxed text-brand-purple-light";

export function SubscribeForm({
  centered = false,
  submitLabel = "Get the free guide",
  emailPlaceholder = "Enter your email",
  helperText,
  helperTextClassName = defaultHelperTextClassName,
}: Props) {
  return (
    <div className={`w-full ${centered ? "mx-auto flex flex-col items-center" : ""}`}>
      <div
        id="mlb2-41803658"
        className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-41803658"
      >
        <div className="ml-form-align-center">
          <div className="ml-form-embedWrapper embedForm">
            <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
              <form
                className="ml-block-form"
                action="https://assets.mailerlite.com/jsonp/2381551/forms/188547461700126484/subscribe"
                data-code=""
                method="post"
                target="_blank"
              >
                <div className="ml-form-formContent">
                  <div className="ml-form-fieldRow ml-last-item">
                    <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                      <input
                        aria-label="email"
                        aria-required="true"
                        type="email"
                        className="form-control"
                        data-inputmask=""
                        name="fields[email]"
                        placeholder={emailPlaceholder}
                        autoComplete="email"
                      />
                    </div>
                  </div>
                </div>

                <input type="hidden" name="ml-submit" value="1" />

                <div className="ml-form-embedSubmit">
                  <button type="submit" className="primary">
                    {submitLabel}
                  </button>
                  <button disabled type="button" className="loading" style={{ display: "none" }}>
                    <WaveLoader size="sm" className="mx-auto text-white" label="Loading" />
                    <span className="sr-only">Loading...</span>
                  </button>
                </div>

                <input type="hidden" name="anticsrf" value="true" />
              </form>
            </div>

            <div className="ml-form-successBody row-success" style={{ display: "none" }}>
              <div className="ml-form-successContent">
                <h4>🌸 Almost there!</h4>
                <p>
                  We&apos;ve sent a confirmation email to your inbox.
                  <br />
                  <br />
                  Please confirm your subscription to unlock your free Emotional Cycle Guide and
                  join the My Mood Cycle waitlist.
                  <br />
                  <br />
                  Don&apos;t see it? Check your spam or promotions folder.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {helperText ? <p className={helperTextClassName}>{helperText}</p> : null}
    </div>
  );
}
