import { logout } from "../../utils/session.server";

export async function action({ request }) {
  return logout(request);
}

export async function loader({request}) {
  return logout(request);
}
