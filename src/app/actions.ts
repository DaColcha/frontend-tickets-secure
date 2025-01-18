'use server'

import { cookies } from "next/headers"

export async function deleteCookie() {
  (cookies()).delete('auth_token'),
  (cookies()).delete('user_role')
}