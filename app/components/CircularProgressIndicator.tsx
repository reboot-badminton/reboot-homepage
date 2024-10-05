interface Props {
  text?: string;
}

export default function CircularProgressIndicator({ text }: Props) {
  return (
    <div className="text-center">
      <div className="animate-spin" style={{
        width: '30px',
        height: '30px',
        border: '4px solid rgb(96, 165, 250)',
        borderRadius: '50%',
        borderTopColor: '#0001',
        display: 'inline-block',
      }}></div>
      {text && <div className="mt-2">{text}</div>}
    </div>
  );
}
