export type none = null | undefined

export type FireAuthError = Error & { code: FireAuthKeyMessage }
export type FireAuthMessages = [FireAuthKeyMessage, string][]
export type FireAuthKeyMessage =
  | `auth/app-deleted`
  | `auth/expired-action-code`
  | `auth/invalid-action-code`
  | `auth/user-disabled`
  | `auth/user-not-found`
  | `auth/weak-password`
  | `auth/email-already-in-use`
  | `auth/invalid-email`
  | `auth/operation-not-allowed`
  | `auth/account-exists-with-different-credential`
  | `auth/auth-domain-config-required`
  | `auth/credential-already-in-use`
  | `auth/operation-not-supported-in-this-environment`
  | `auth/timeout`
  | `auth/missing-android-pkg-name`
  | `auth/missing-continue-uri`
  | `auth/missing-ios-bundle-id`
  | `auth/invalid-continue-uri`
  | `auth/unauthorized-continue-uri`
  | `auth/invalid-dynamic-link-domain`
  | `auth/argument-error`
  | `auth/invalid-persistence-type`
  | `auth/unsupported-persistence-type`
  | `auth/invalid-credential`
  | `auth/wrong-password`
  | `auth/invalid-verification-code`
  | `auth/invalid-verification-id`
  | `auth/custom-token-mismatch`
  | `auth/invalid-custom-token`
  | `auth/captcha-check-failed`
  | `auth/invalid-phone-number`
  | `auth/missing-phone-number`
  | `auth/quota-exceeded`
  | `auth/cancelled-popup-request`
  | `auth/popup-blocked`
  | `auth/popup-closed-by-user`
  | `auth/unauthorized-domain`
  | `auth/invalid-user-token`
  | `auth/user-token-expired`
  | `auth/null-user`
  | `auth/app-not-authorized`
  | `auth/invalid-api-key`
  | `auth/network-request-failed`
  | `auth/requires-recent-login`
  | `auth/too-many-requests`
  | `auth/web-storage-unsupported`
  | `auth/invalid-claims`
  | `auth/claims-too-large`
  | `auth/id-token-expired`
  | `auth/id-token-revoked`
  | `auth/invalid-argument`
  | `auth/invalid-creation-time`
  | `auth/invalid-disabled-field`
  | `auth/invalid-display-name`
  | `auth/invalid-email-verified`
  | `auth/invalid-hash-algorithm`
  | `auth/invalid-hash-block-size`
  | `auth/invalid-hash-derived-key-length`
  | `auth/invalid-hash-key`
  | `auth/invalid-hash-memory-cost`
  | `auth/invalid-hash-parallelization`
  | `auth/invalid-hash-rounds`
  | `auth/invalid-hash-salt-separator`
  | `auth/invalid-id-token`
  | `auth/invalid-last-sign-in-time`
  | `auth/invalid-page-token`
  | `auth/invalid-password`
  | `auth/invalid-password-hash`
  | `auth/invalid-password-salt`
  | `auth/invalid-photo-url`
  | `auth/invalid-provider-id`
  | `auth/invalid-session-cookie-duration`
  | `auth/invalid-uid`
  | `auth/invalid-user-import`
  | `auth/invalid-provider-data`
  | `auth/maximum-user-count-exceeded`
  | `auth/missing-hash-algorithm`
  | `auth/missing-uid`
  | `auth/reserved-claims`
  | `auth/session-cookie-revoked`
  | `auth/uid-alread-exists`
  | `auth/email-already-exists`
  | `auth/phone-number-already-exists`
  | `auth/project-not-found`
  | `auth/insufficient-permission`
  | `auth/internal-error`
