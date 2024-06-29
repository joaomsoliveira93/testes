export { default } from "next-auth/middleware"

export const config ={
    matcher: ["/profile","/profiles","/ui/:path*","/forms/:path*"]
}