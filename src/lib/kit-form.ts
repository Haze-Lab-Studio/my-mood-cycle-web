export const KIT_FORM_ID = "9467706";
export const KIT_FORM_UID = "12d974956c";
export const KIT_FORM_ACTION = `https://app.kit.com/forms/${KIT_FORM_ID}/subscriptions`;
export const KIT_CKJS_SRC = "https://f.convertkit.com/ckjs/ck.5.js";

export const KIT_FORM_OPTIONS = JSON.stringify({
  settings: {
    after_subscribe: {
      action: "message",
      success_message:
        "🌸 You're almost there!\n\nCheck your inbox and confirm your subscription to unlock your free Emotional Cycle Guide and join the My Mood Cycle waitlist.",
      redirect_url: "",
    },
    analytics: {
      google: null,
      fathom: null,
      facebook: null,
      segment: null,
      pinterest: null,
      sparkloop: null,
      googletagmanager: null,
    },
    modal: {
      trigger: "timer",
      scroll_percentage: null,
      timer: 5,
      devices: "all",
      show_once_every: 15,
    },
    powered_by: {
      show: true,
      url: "https://kit.com/features/forms?utm_campaign=poweredby&utm_content=form&utm_medium=referral&utm_source=dynamic",
    },
    recaptcha: { enabled: false },
    return_visitor: { action: "show", custom_content: "" },
    slide_in: {
      display_in: "bottom_right",
      trigger: "timer",
      scroll_percentage: null,
      timer: 5,
      devices: "all",
      show_once_every: 15,
    },
    sticky_bar: {
      display_in: "top",
      trigger: "timer",
      scroll_percentage: null,
      timer: 5,
      devices: "all",
      show_once_every: 15,
    },
  },
  version: "5",
});
