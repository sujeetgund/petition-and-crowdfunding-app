import { auth } from "@/auth";

const protectedRoutes = [
  "/dashboard",
  "/petition/create",
  "fundraising/create",
];
const authROutes = ["/sign-in", "/sign-up"];

export default auth((req) => {
  const pathname = req.nextUrl.pathname;

  const isProtectedRoute = protectedRoutes.includes(pathname);
  const isAuthRoute = authROutes.includes(pathname);

  if (isAuthRoute && req.auth) {
    return Response.redirect(new URL("/dashboard", req.nextUrl.origin));
  }

  if (isProtectedRoute && !req.auth) {
    return Response.redirect(new URL("/sign-in", req.nextUrl.origin));
  }
});
