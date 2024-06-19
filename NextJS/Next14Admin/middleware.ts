export { default } from "next-auth/middleware"

export const config ={
    matcher: ["/calendar","/tables","/settings","/profile","/chart","/ui/:path*","/forms/:path*"]
}