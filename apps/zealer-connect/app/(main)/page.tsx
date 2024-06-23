// import { SignInButton, UserButton } from "@clerk/nextjs";
import { Card } from "@ui/index";

export default function Home() {
  return (
    <main className="flex min-h-screen  p-24">
      <Card>
        This is a screen for Testing
        {/* <UserButton />
        <SignInButton mode="modal" /> */}
      </Card>
    </main>
  );
}
