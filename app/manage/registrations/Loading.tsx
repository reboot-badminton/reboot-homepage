import Dialog from '@/app/components/Dialog';

export default function Loading() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">등록된 신청서 관리</h1>
      <div className="h-[50vh] flex items-center justify-center">
        로딩중 입니다...
      </div>
      <Dialog text="Loading" useDotAnimation={true} />
    </div>
  );
}
