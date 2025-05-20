import type { Metadata } from "next"
import UserProfile from "@/components/profile/user-profile"

export const metadata: Metadata = {
  title: "My Profile - Travel Tours",
  description: "Manage your profile and account settings",
}

export default function ProfilePage() {
  return (
    <main className="container px-4 py-12">
      <h1 className="mb-6 text-3xl font-bold">My Profile</h1>
      <UserProfile />
    </main>
  )
}
