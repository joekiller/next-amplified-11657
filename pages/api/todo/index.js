import * as amplify from "aws-amplify";
import awsExports from "../../../aws-exports";
import {
  createTodo
} from "../../../graphql/mutations";
amplify.Amplify.configure({ ...awsExports, ssr: true });

export default async function handler(req, res) {
  const {
    body: {id, name, description},
  } = req;
  const { API } = amplify.withSSRContext({ req })
  const result = await API.graphql({authMode: "API_KEY", query: createTodo, variables: {input: {id, name, description}}});
  return res.status(200).json({success: result.data.createTodo.id === id});
}
