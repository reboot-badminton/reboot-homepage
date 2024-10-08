import AuthLayout from "@/components/authentication/AuthLayout";
import Authentication from "@/components/authentication/Authentication";

export default function Verification() {
  return (
    <AuthLayout title="이메일 인증">
      <Authentication emailVerificationText="이메일로 로그인" />
    </AuthLayout>
  );
}
