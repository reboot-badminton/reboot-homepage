import Dialog from '@/app/components/Dialog'

export default function Loading() {
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">등록된 신청서 관리</h1>
      <Dialog text='Loading' useDotAnimation={true}/>
    </div>
  )
}
