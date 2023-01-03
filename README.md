This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

The project is created to recreate https://github.com/aws-amplify/amplify-cli/issues/11657
to demonstrate the fix in https://github.com/aws-amplify/amplify-cli/pull/11658
## Recreation Steps
Use windows

  1. `npx create-next-app next-amplified-11657`
  2. `amplify init`
     1. Ensure project points to `.` instead of `src/`.
  3. `amplify add api` and use Todo schema
     1. file path was set to `graphql\**\*.js` for graphql.
  4. `npm install aws-amplify @aws-amplify/ui-react uuid`
  5. update todo `index.js` to take posts
  6. use `npm run genSpamPosts` to generate data
  7. run `amplify push` to get the mock to play well
  8. run `amplify mock`
  9. run `npm run dev`
  10. in another terminal run `npm run spamPosts` to trigger error with generated data

PS

If you kill the mock you'll have to find the residual java process and kill it too (annoying and unreported for windows).
