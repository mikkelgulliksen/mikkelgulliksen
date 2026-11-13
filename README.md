# mikkelgulliksen

## Contact form

The contact form is handled by the Vercel Function at `/api/contact` and sends
messages through Resend. Configure these as project-scoped Vercel environment
variables for each environment where the form should work:

- `RESEND_API_KEY`: a Resend API key with permission to send email.
- `RESEND_FROM_EMAIL`: a sender address verified with Resend.

Keep the API key in Vercel's encrypted environment-variable store; do not commit
it or expose it to the frontend. The function always sends to
`mikkel@mikkelgulliksen.no`, with the visitor's address set as `Reply-To`.
This change does not modify DNS or the existing incoming mail configuration.

Run the contact handler tests with `cd frontend && npm run test:contact`.
