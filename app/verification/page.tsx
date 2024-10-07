import Authentication from "@/components/authentication/Authentication";

export default function Verification() {
  return (
    <main className="flex flex-col items-center justify-center p-8">
      <div className="w-[420px] bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            이메일 인증
          </h1>
          <div className="space-y-4 md:space-y-6">
            <Authentication emailVerificationText='이메일로 로그인' />
          </div>
        </div>
      </div>
    </main>
  );
}